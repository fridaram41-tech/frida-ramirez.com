/* ============================================================
   HOME SCREEN — cursor parallax
   ============================================================ */
const parallaxEls = document.querySelectorAll('#home-screen .hl');

const MAX_PX = 10;
let ptx = 0, pty = 0;
let pcx = 0, pcy = 0;

document.addEventListener('mousemove', e => {
  ptx = (e.clientX / window.innerWidth  - 0.5) * 2;
  pty = (e.clientY / window.innerHeight - 0.5) * 2;
});

(function pTick() {
  pcx += (ptx - pcx) * 0.07;
  pcy += (pty - pcy) * 0.07;

  parallaxEls.forEach(el => {
    const d = parseFloat(el.dataset.depth || 0);
    el.style.setProperty('--par-x', `${-pcx * d * MAX_PX}px`);
    el.style.setProperty('--par-y', `${-pcy * d * MAX_PX}px`);
  });

  requestAnimationFrame(pTick);
}());


/* ============================================================
   DARK MODE — click lamp to toggle
   ============================================================ */
document.getElementById('lamp-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});


/* ============================================================
   MUSIC PLAYER — click to play / stop at 35% volume
   ============================================================ */
const musicToggle = document.getElementById('music-toggle');
const bgMusic     = document.getElementById('bg-music');
bgMusic.volume    = 0.35;

// Start playing by default
bgMusic.play().then(() => {
  musicToggle.classList.add('playing');
}).catch(() => {
  // Browser blocked autoplay — stays off until clicked
});

musicToggle.addEventListener('click', () => {
  if (bgMusic.paused) {
    bgMusic.play();
    musicToggle.classList.add('playing');
  } else {
    bgMusic.pause();
    bgMusic.currentTime = 0;
    musicToggle.classList.remove('playing');
  }
});


/* ============================================================
   PEN HOLDER WOBBLE — plays once when cursor enters
   ============================================================ */
const penHolderEl = document.querySelector('.hl-penholder');
penHolderEl.addEventListener('mouseenter', () => {
  penHolderEl.classList.add('ph-animate');
});
document.querySelector('.ph-pencil').addEventListener('animationend', () => {
  penHolderEl.classList.remove('ph-animate');
});


/* ============================================================
   ABOUT POPUP — open via polaroid click, close via X / Escape / overlay
   ============================================================ */
const aboutWindow   = document.getElementById('about-window');
const aboutCloseBtn = document.getElementById('about-close');
let   aboutOverlay  = null;

function openAbout() {
  aboutOverlay = document.createElement('div');
  aboutOverlay.className = 'about-overlay';
  document.body.appendChild(aboutOverlay);
  aboutWindow.classList.remove('hidden');
  aboutOverlay.addEventListener('click', closeAbout);
}

function closeAbout() {
  aboutWindow.classList.add('hidden');
  if (aboutOverlay) { aboutOverlay.remove(); aboutOverlay = null; }
}

document.querySelector('[data-opens="about-window"]').addEventListener('click', openAbout);
aboutCloseBtn.addEventListener('click', closeAbout);


/* ============================================================
   CONTACT POPUP — same pattern as About
   ============================================================ */
const contactWindow   = document.getElementById('contact-window');
const contactCloseBtn = document.getElementById('contact-close');
let   contactOverlay  = null;

function openContact() {
  contactOverlay = document.createElement('div');
  contactOverlay.className = 'about-overlay';
  document.body.appendChild(contactOverlay);
  contactWindow.classList.remove('hidden');
  contactOverlay.addEventListener('click', closeContact);
}

function closeContact() {
  contactWindow.classList.add('hidden');
  if (contactOverlay) { contactOverlay.remove(); contactOverlay = null; }
}

document.querySelector('[data-opens="contact-window"]').addEventListener('click', openContact);
contactCloseBtn.addEventListener('click', closeContact);


/* ============================================================
   WORK POPUP — same pattern as About
   ============================================================ */
const workWindow   = document.getElementById('work-window');
const workCloseBtn = document.getElementById('work-close');
let   workOverlay  = null;

function openWork() {
  workOverlay = document.createElement('div');
  workOverlay.className = 'about-overlay';
  document.body.appendChild(workOverlay);
  workWindow.classList.remove('hidden');
  workOverlay.addEventListener('click', closeWork);
}

function closeWork() {
  workWindow.classList.add('hidden');
  if (workOverlay) { workOverlay.remove(); workOverlay = null; }
}

document.querySelector('.ph-cup').addEventListener('click', openWork);
workCloseBtn.addEventListener('click', closeWork);


/* ============================================================
   IMAGE LIGHTBOX — click gallery image to view full, scroll to read
   ============================================================ */
const lightbox      = document.getElementById('work-lightbox');
const lightboxImg   = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

document.querySelectorAll('.work-img-frame').forEach(frame => {
  frame.addEventListener('click', () => {
    const img = frame.querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.remove('hidden');
  });
});

function closeLightbox() { lightbox.classList.add('hidden'); }

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });


/* ============================================================
   GLOBAL ESCAPE — priority: lightbox > contact > work > about
   ============================================================ */
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (!lightbox.classList.contains('hidden'))       { closeLightbox();  return; }
  if (!contactWindow.classList.contains('hidden'))  { closeContact();   return; }
  if (!workWindow.classList.contains('hidden'))     { closeWork();      return; }
  if (!aboutWindow.classList.contains('hidden'))    { closeAbout();     return; }
});
