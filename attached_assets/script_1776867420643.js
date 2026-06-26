/* ===== FELABRATION FLORIPA 2026 — SCRIPT ===== */

// ===== CANVAS PARTICLES (Hero) =====
const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: 0, y: 0 };

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2.5 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.5 + 0.1;
    const colors = ['#FFD700', '#E6392B', '#00F0FF', '#FF2D95', '#00A86B'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }
  update() {
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 120) {
      this.x -= dx * 0.01;
      this.y -= dy * 0.01;
      this.opacity = Math.min(1, this.opacity + 0.02);
    }
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

const isMobile = window.innerWidth < 768;
const particleCount = isMobile ? 40 : 120;
for (let i = 0; i < particleCount; i++) particles.push(new Particle());

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(255,215,0,${0.08 * (1 - dist / 100)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  if (!isMobile) drawConnections();
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ===== COUNTDOWN =====
function updateCountdown() {
  const target = new Date('2026-10-23T18:00:00-03:00').getTime();
  const now = Date.now();
  const diff = target - now;
  if (diff <= 0) return;
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  const el = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = String(v).padStart(2, '0'); };
  el('cd-days', d); el('cd-hours', h); el('cd-mins', m); el('cd-secs', s);
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ===== NAVBAR =====
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 60));

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth' });
  });
});

// ===== SCROLL REVEAL =====
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ===== LINEUP FILTERS =====
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const day = btn.dataset.day;
    document.querySelectorAll('.artist-card').forEach(card => {
      card.style.display = (day === 'all' || card.dataset.day === day) ? '' : 'none';
    });
  });
});

// ===== SCHEDULE TABS =====
document.querySelectorAll('.sched-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.sched-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    document.querySelectorAll('.sched-day').forEach(d => d.classList.remove('active'));
    document.getElementById(tab.dataset.target).classList.add('active');
  });
});

// ===== ARTIST MODAL =====
const modalOverlay = document.getElementById('artistModal');
const modalBody = document.getElementById('modalBody');
document.querySelectorAll('.artist-card').forEach(card => {
  card.addEventListener('click', () => {
    const name = card.querySelector('h3').textContent;
    const genre = card.querySelector('.genre').textContent;
    const img = card.querySelector('img').src;
    const bio = card.dataset.bio || 'Artista confirmado para o Felabration Floripa 2026.';
    modalBody.innerHTML = `
      <img src="${img}" style="width:100%;height:200px;object-fit:cover;border-radius:12px;margin-bottom:16px">
      <h3>${name}</h3>
      <span class="genre">${genre}</span>
      <p>${bio}</p>
    `;
    modalOverlay.classList.add('open');
  });
});
document.querySelector('.modal-close')?.addEventListener('click', () => modalOverlay.classList.remove('open'));
modalOverlay?.addEventListener('click', e => { if (e.target === modalOverlay) modalOverlay.classList.remove('open'); });

// ===== CONFETTI =====
function fireConfetti() {
  const colors = ['#FFD700', '#E6392B', '#00F0FF', '#FF2D95', '#00A86B', '#fff'];
  for (let i = 0; i < 80; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.left = Math.random() * 100 + 'vw';
    el.style.top = '-10px';
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.width = Math.random() * 8 + 4 + 'px';
    el.style.height = Math.random() * 8 + 4 + 'px';
    el.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(el);
    const dur = Math.random() * 2 + 1.5;
    el.animate([
      { top: '-10px', opacity: 1 },
      { top: '110vh', opacity: 0, transform: `rotate(${Math.random()*720}deg) translateX(${(Math.random()-0.5)*200}px)` }
    ], { duration: dur * 1000, easing: 'cubic-bezier(.25,.46,.45,.94)' });
    setTimeout(() => el.remove(), dur * 1000);
  }
}
document.querySelectorAll('.confetti-trigger').forEach(b => b.addEventListener('click', fireConfetti));

// ===== MINI PLAYER =====
const player = document.getElementById('miniPlayer');
const playBtn = document.getElementById('playBtn');
const tracks = [
  'Zombie — Fela Kuti', 'Water No Get Enemy — Fela Kuti',
  'Sorrow Tears and Blood — Fela Kuti', 'Lady — Fela Kuti',
  'Expensive Shit — Fela Kuti', 'Shuffering and Shmiling — Fela Kuti',
  'Afrobeat Floripa — DJ Shrine', 'Ilha Groove — Batuke Coletivo'
];
let currentTrack = 0;
let isPlaying = false;
const trackEl = document.getElementById('trackName');

function updateTrack() { if (trackEl) trackEl.textContent = tracks[currentTrack]; }
updateTrack();

playBtn?.addEventListener('click', () => {
  isPlaying = !isPlaying;
  player.classList.toggle('paused', !isPlaying);
  playBtn.textContent = isPlaying ? '⏸' : '▶';
});
document.getElementById('nextBtn')?.addEventListener('click', () => {
  currentTrack = (currentTrack + 1) % tracks.length;
  updateTrack();
});
document.getElementById('prevBtn')?.addEventListener('click', () => {
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  updateTrack();
});

// ===== 3D TILT ON CARDS =====
document.querySelectorAll('.artist-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-10px) scale(1.02) perspective(800px) rotateY(${x*8}deg) rotateX(${-y*8}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
