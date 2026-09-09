(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!('IntersectionObserver' in window)) return;
  const targets = [...document.querySelectorAll([
    '.invest-hero > div > *', '.invest-art', '.invest-heading > *',
    '.invest-package', '.invest-amount', '.invest-controls fieldset:last-child',
    '.invest-summary', '.invest-process h2', '.invest-steps article',
    '.invest-faq > div', '.invest-contact > :not(.invest-contact-star)',
    '.home-invest > div > *'
  ].join(','))];
  let observer;
  function configure() {
    observer?.disconnect();
    targets.forEach(target => target.classList.remove('motion-ready', 'motion-visible'));
    if (preference.matches) return;
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('motion-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    targets.forEach(target => {
      const siblings = [...target.parentElement.children];
      target.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(target) % 4, 3) * 70}ms`);
      target.classList.add('motion-ready');
      observer.observe(target);
    });
  }
  // Keyboard navigation reveals any focusable content immediately.
  document.addEventListener('focusin', event => {
    for (let node = event.target; node; node = node.parentElement) {
      if (node.classList?.contains('motion-ready')) node.classList.add('motion-visible');
    }
  });
  preference.addEventListener('change', configure);
  configure();
})();
