const scroller = document.querySelector('#textScroll');
const slides = [...document.querySelectorAll('.text-slide')];
const nextButton = document.querySelector('.scroll-down');

let currentIndex = 0;
let wheelLocked = false;

function goToSlide(index) {
  const safeIndex = Math.max(0, Math.min(index, slides.length - 1));
  currentIndex = safeIndex;
  scroller.scrollTo({
    top: slides[safeIndex].offsetTop,
    behavior: 'smooth'
  });
  setActive(safeIndex);
}

function setActive(index) {
  slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
}

function findCurrentSlide() {
  const center = scroller.scrollTop + scroller.clientHeight / 2;
  let closestIndex = 0;
  let closestDistance = Infinity;

  slides.forEach((slide, index) => {
    const slideCenter = slide.offsetTop + slide.offsetHeight / 2;
    const distance = Math.abs(center - slideCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  currentIndex = closestIndex;
  setActive(closestIndex);
}

nextButton?.addEventListener('click', () => goToSlide(currentIndex + 1));

scroller.addEventListener('scroll', () => {
  window.requestAnimationFrame(findCurrentSlide);
});

scroller.addEventListener('wheel', (event) => {
  event.preventDefault();

  if (wheelLocked) return;
  const direction = Math.sign(event.deltaY);
  if (!direction) return;

  goToSlide(currentIndex + direction);
  wheelLocked = true;
  window.setTimeout(() => {
    wheelLocked = false;
  }, 620);
}, { passive: false });

scroller.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' ') {
    event.preventDefault();
    goToSlide(currentIndex + 1);
  }

  if (event.key === 'ArrowUp' || event.key === 'PageUp') {
    event.preventDefault();
    goToSlide(currentIndex - 1);
  }
});

setActive(0);

const textScroll = document.getElementById("textScroll");
const glowLeft = document.querySelector(".glow-left");
const glowRight = document.querySelector(".glow-right");

function animateGlowsOnScroll() {
  if (!textScroll || !glowLeft || !glowRight) return;

  const maxScroll = textScroll.scrollHeight - textScroll.clientHeight;

  if (maxScroll <= 0) return;

  const progress = textScroll.scrollTop / maxScroll;

  /*
    progress = 0   — самый верх
    progress = 1   — самый низ
  */

  const leftMoveY = progress * 730;
  const rightMoveY = progress * -790;

  const leftScale = 0.72 + progress * 0.58;
  const rightScale = 1.25 - progress * 0.45;

  glowLeft.style.transform = `translateY(${leftMoveY}px) scale(${leftScale})`;
  glowRight.style.transform = `translateY(${rightMoveY}px) scale(${rightScale})`;
}

textScroll?.addEventListener("scroll", animateGlowsOnScroll);
window.addEventListener("resize", animateGlowsOnScroll);

animateGlowsOnScroll();



document.addEventListener('DOMContentLoaded', () => {
  const photo = document.querySelector('.model-photo');
  
  if (!photo) return;

 
  const speed = 0.0004; 
 
  const rangeX = 4;     
  const rangeY = 2;     

  function animateWave(timestamp) {

    const x = Math.sin(timestamp * speed) * rangeX;
    const y = Math.cos(timestamp * speed * 0.75) * rangeY;

    photo.style.transform = `translate3d(${x}px, ${y}px, 0)`;

    requestAnimationFrame(animateWave);
  }

  requestAnimationFrame(animateWave);
});

