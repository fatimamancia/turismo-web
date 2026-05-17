// 1. Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// 2. Hamburger
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// 3. Animación escalonada de tarjetas
const cards = document.querySelectorAll('.card');
const cardObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const idx = Array.from(cards).indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('visible'), (idx % 3) * 130);
      cardObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
cards.forEach(c => cardObs.observe(c));

// 4. Contador animado
const counters = document.querySelectorAll('.stat-num[data-target]');
const cntObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const start = performance.now();
      const duration = 1500;
      (function update(now) {
        const t = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(ease * target);
        if (t < 1) requestAnimationFrame(update);
        else el.textContent = target;
      })(start);
      cntObs.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => cntObs.observe(c));

// 5. Parallax suave en hero
const orbs = document.querySelectorAll('.hero-orb');
document.addEventListener('mousemove', (e) => {
  const xR = (e.clientX / window.innerWidth  - 0.5) * 2;
  const yR = (e.clientY / window.innerHeight - 0.5) * 2;
  orbs.forEach((orb, i) => {
    const f = (i + 1) * 18;
    orb.style.transform = `translate(${xR * f}px, ${yR * f}px)`;
  });
});

// 6. Scroll suave (fallback)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});
