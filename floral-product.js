document.addEventListener('DOMContentLoaded', () => {
  const config = JSON.parse(document.querySelector('#floral-config').textContent);
  const views = config.views;
  let current = 0;
  let original = false;
  const mainImage = document.querySelector('[data-lamp-image]');
  const zoom = document.querySelector('[data-image-zoom]');
  const lightbox = document.querySelector('[data-lamp-lightbox]');
  const originalButton = document.querySelector('[data-original-toggle]');
  const showView = (index, announce = true) => {
    current = (index + views.length) % views.length;
    const view = views[current];
    const src = original ? config.original : view.image;
    const crop = original ? '' : view.crop;
    mainImage.width = mainImage.height = 1254;
    mainImage.src = src;
    mainImage.className = `floral-crop-${crop || 'none'}`;
    mainImage.alt = original ? config.name + ': supplied product photograph' : view.alt;
    zoom.href = src;
    zoom.setAttribute('aria-label', `Enlarge ${view.title.toLowerCase()}`);
    document.querySelector('[data-view-label]').textContent = `0${current + 1} / ${view.title}`;
    document.querySelector('.lamp-image-caption > span:last-child').textContent = original ? 'Supplied product photograph' : config.shade;
    document.querySelector('.lamp-image-badge').textContent = original ? 'Product photograph' : view.title;
    document.querySelectorAll('[data-lamp-view]').forEach((link, index) => {
      if (index === current) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
    document.querySelector('[data-lightbox-image]').src = src;
    document.querySelector('[data-lightbox-image]').className = `floral-crop-${crop || 'none'}`;
    document.querySelector('[data-lightbox-image]').alt = mainImage.alt;
    document.querySelector('#lightbox-title').textContent = view.title;
    document.querySelector('[data-lightbox-counter]').textContent = `${current + 1} / ${views.length}`;
    if (announce) document.querySelector('[data-gallery-status]').textContent = `${view.title}. ${config.shade}. ${original || view.crop || current === 0 ? 'Supplied product photograph.' : 'Digitally styled room image.'}`;
  };
  document.querySelectorAll('[data-lamp-view]').forEach(link => link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    showView(Number(link.dataset.lampView));
  }));
  originalButton.addEventListener('click', () => {
    original = !original;
    originalButton.setAttribute('aria-pressed', String(original));
    originalButton.textContent = original ? 'Back to gallery' : 'View original photo';
    showView(current);
  });
  zoom.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !lightbox.showModal) return;
    event.preventDefault();
    showView(current, false);
    lightbox.showModal();
    document.querySelector('[data-close-lightbox]').focus();
  });
  document.querySelector('[data-close-lightbox]').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('close', () => zoom.focus({ preventScroll: true }));
  lightbox.addEventListener('click', event => {
    if (event.target !== lightbox) return;
    const box = lightbox.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) lightbox.close();
  });
  lightbox.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    showView(current + (event.key === 'ArrowRight' ? 1 : -1));
  });
  document.querySelectorAll('[data-lightbox-step]').forEach(button => button.addEventListener('click', () => showView(current + Number(button.dataset.lightboxStep))));

  const quantity = document.querySelector('#lamp-quantity');
  const addButton = document.querySelector('.lamp-add');
  const syncQuantity = () => {
    const amount = Math.max(1, Math.min(99, Math.floor(Number(quantity.value) || 1)));
    quantity.value = amount;
    addButton.dataset.addQuantity = amount;
    document.querySelector('[data-lamp-quantity="-1"]').disabled = amount === 1;
    document.querySelector('[data-lamp-quantity="1"]').disabled = amount === 99;
  };
  quantity.addEventListener('change', syncQuantity);
  addButton.addEventListener('click', syncQuantity);
  document.querySelectorAll('[data-lamp-quantity]').forEach(button => button.addEventListener('click', () => {
    quantity.value = Number(quantity.value) + Number(button.dataset.lampQuantity);
    syncQuantity();
  }));
  const saveButton = document.querySelector('[data-lamp-save]');
  const productId = config.id;
  const getSaved = () => {
    try { const value = JSON.parse(localStorage.getItem('shine-through-saved') || '[]'); return Array.isArray(value) ? value.filter(id => typeof id === 'string') : []; } catch { return []; }
  };
  let saved = getSaved().includes(productId);
  const syncSaved = () => {
    saveButton.setAttribute('aria-pressed', String(saved));
    saveButton.setAttribute('aria-label', `${saved ? 'Unsave' : 'Save'} ${config.name}`);
  };
  saveButton.addEventListener('click', () => {
    saved = !saved;
    const list = new Set(getSaved());
    if (saved) list.add(productId); else list.delete(productId);
    try { localStorage.setItem('shine-through-saved', JSON.stringify([...list])); } catch { /* Saving still works for this visit. */ }
    syncSaved();
  });
  window.addEventListener('storage', event => { if (event.key === 'shine-through-saved') { saved = getSaved().includes(productId); syncSaved(); } });
  syncSaved();

  document.querySelectorAll('[data-story-view]').forEach(link => link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const view = views[Number(link.dataset.storyView)];
    const image = document.querySelector('[data-story-image]');
    image.src = view.image;
    image.alt = view.alt;
    image.className = `floral-crop-${view.crop || 'none'}`;
    document.querySelector('[data-story-description]').textContent = view.crop ? 'Detail from the supplied product photograph.' : 'Digitally styled room setting based on the supplied product photograph.';
    document.querySelectorAll('[data-story-view]').forEach(item => {
      if (item === link) item.setAttribute('aria-current', 'true');
      else item.removeAttribute('aria-current');
    });
  }));
  showView(0, false);
});
