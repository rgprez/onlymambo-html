window.addEventListener("load", () => {
  const preload = document.getElementById("preload");
  const root = document.documentElement;

  // Step 1: set a base energy (room is alive)
  root.style.setProperty("--energy", 0.25);

  setTimeout(() => {
    preload.classList.add("out");

    // Step 2: gently settle energy down
    setTimeout(() => {
      root.style.setProperty("--energy", 0.12);
    }, 800);

  }, 1400);
  
});

setTimeout(() => {
  const hero = document.getElementById("hero");
  if (hero) hero.classList.add("gl-ready");
}, 5000);

/* ── Crosshair cursor ── */
const cur = document.getElementById('cur');
const dot = document.getElementById('cur-dot');
let mx=0, my=0, cx=0, cy=0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';
});


(function loop() {
  cx += (mx-cx)*.09; cy += (my-cy)*.09;
  dot.style.left = cx + 'px';
  dot.style.top  = cy + 'px';
  requestAnimationFrame(loop);
})();

/* Crosshair grows on interactive elements */
document.querySelectorAll('a,button,.exp-item,.p-type,.play-wrap').forEach(el => {
  el.addEventListener('mouseenter', () => { cur.style.transform = 'translate(-50%,-50%) scale(1.8)'; });
  el.addEventListener('mouseleave', () => { cur.style.transform = 'translate(-50%,-50%) scale(1)'; });
});

/* ── Nav scroll ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 60));

/* ── Scroll reveal ── */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
  });
}, { threshold: .08, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.r').forEach(el => obs.observe(el));

/* ── Video ── */
function handlePlay() { alert('Concept film coming soon — visual direction in production.'); }

/* ── Form ── */
function handleSubmit() {
  const name  = document.getElementById('fn').value.trim();
  const email = document.getElementById('fe').value.trim();
  const type  = document.getElementById('fi').value;
  const phone = document.getElementById('fp').value.trim();
  if (!name || !email) { document.getElementById(!name ? 'fn' : 'fe').focus(); return; }
  document.getElementById('theForm').style.display = 'none';
  document.getElementById('formOk').style.display  = 'block';
  const msg = encodeURIComponent(
    `Hi — I just applied for access to Only Mambo.\n\nName: ${name}\nEmail: ${email}\nInterest: ${type||'Not specified'}${phone ? '\nPhone: '+phone : ''}`
  );
  const wa = '18096XXXXXX'; // ← replace with your WhatsApp number
  setTimeout(() => window.open(`https://wa.me/${wa}?text=${msg}`, '_blank'), 2000);
}