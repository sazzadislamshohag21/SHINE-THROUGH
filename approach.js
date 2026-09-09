const steps = document.querySelectorAll('[data-ritual-step]');
const image = document.querySelector('[data-ritual-image]');
const caption = document.querySelector('[data-ritual-caption]');

for (const step of steps) {
  step.addEventListener('toggle', () => {
    if (!step.open) return;
    image.src = step.dataset.image;
    image.alt = step.dataset.imageAlt;
    caption.textContent = step.dataset.caption;
  });
}
