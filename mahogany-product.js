document.addEventListener('DOMContentLoaded', () => {
  const base = 'asseats/mahogany-floor-lamp/';
  const originals = 'asseats/Real Product images/WhatsApp Image 2026-09-13 at ';
  const views = [
    { key: 'front', title: 'Front view', file: '10.34.44.jpeg', shade: 'Mahogany · Botanical print', alt: 'Front view of the mahogany floor lamp with a small botanical-print shade' },
    { key: 'materials', title: 'Material close-up', file: '10.34.46.jpeg', shade: 'Mahogany · Wood grain', alt: 'Close-up of the grain and polished finish on the mahogany frame' },
    { key: 'top', title: 'Top view', file: '10.34.44 (2).jpeg', shade: 'Bulb · Metal shade frame', alt: 'Top view inside the shade showing the white bulb and metal frame' },
    { key: 'side', title: 'Side view', file: '10.34.43 (2).jpeg', shade: 'Mahogany · Botanical print', alt: 'Side view of the angular mahogany floor lamp with the small botanical shade' },
    { key: 'working', title: 'Working view', file: '10.34.47.jpeg', shade: 'Light on · Botanical print', alt: 'Illuminated mahogany floor lamp with the small botanical-print shade' },
  ];
  let current = 0;
  let original = false;
  const mainImage = document.querySelector('[data-lamp-image]');
  const zoom = document.querySelector('[data-image-zoom]');
  const lightbox = document.querySelector('[data-lamp-lightbox]');
  const originalButton = document.querySelector('[data-original-toggle]');
  const showView = (index, announce = true) => {
    current = (index + views.length) % views.length;
    const view = views[current];
    const src = original ? originals + view.file : view.key === 'front' ? 'asseats/product-squares/mahogany-wooden-floor-lamp-1080.jpg' : `asseats/product-squares/mahogany-${view.key}-1080.jpg`;
    mainImage.width = original ? 1086 : 1080;
    mainImage.height = original ? 1448 : 1080;
    mainImage.src = src;
    mainImage.srcset = '';
    mainImage.alt = `${view.alt}; ${original ? 'original product photograph' : (view.key === 'front' ? 'product photograph with an AI-styled room background' : 'studio-retouched product photograph')}`;
    zoom.href = src;
    zoom.setAttribute('aria-label', `Enlarge ${view.title.toLowerCase()}`);
    document.querySelector('[data-view-label]').textContent = `0${current + 1} / ${view.title}`;
    document.querySelector('.lamp-image-caption > span:last-child').textContent = original && view.key === 'working' ? 'Original · Alternate leaf print' : view.shade;
    document.querySelector('.lamp-image-badge').textContent = original ? 'Original photograph' : 'A closer look';
    document.querySelectorAll('[data-lamp-view]').forEach((link, index) => {
      if (index === current) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
    document.querySelector('[data-lightbox-image]').src = src;
    document.querySelector('[data-lightbox-image]').alt = mainImage.alt;
    document.querySelector('#lightbox-title').textContent = view.title;
    document.querySelector('[data-lightbox-counter]').textContent = `${current + 1} / ${views.length}`;
    if (announce) document.querySelector('[data-gallery-status]').textContent = `${view.title}. ${view.shade}. ${original ? 'Original photo.' : 'Studio image.'}`;
  };
  document.querySelectorAll('[data-lamp-view]').forEach(link => link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    showView(Number(link.dataset.lampView));
  }));
  originalButton.addEventListener('click', () => {
    original = !original;
    originalButton.setAttribute('aria-pressed', String(original));
    originalButton.textContent = original ? 'View studio images' : 'View originals';
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
  const productId = 'mahogany-wooden-floor-lamp';
  const getSaved = () => {
    try { const value = JSON.parse(localStorage.getItem('shine-through-saved') || '[]'); return Array.isArray(value) ? value.filter(id => typeof id === 'string') : []; } catch { return []; }
  };
  let saved = getSaved().includes(productId);
  const syncSaved = () => {
    saveButton.setAttribute('aria-pressed', String(saved));
    saveButton.setAttribute('aria-label', `${saved ? 'Unsave' : 'Save'} Mahogany Wooden Floor Lamp`);
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

  const video = document.querySelector('[data-product-video]');
  const descriptions = {
    working: 'The actual lamp glowing through the large leaf-print shade. A close view of the shade, wooden frame, and light on the wall.',
    bulb: 'Real product footage showing the bulb being fitted inside the metal shade frame. Disconnect the lamp from power before changing the bulb.',
    film: 'A short product advertisement featuring the botanical-print floor lamp in a room setting.',
  };
  const videoStatus = document.querySelector('[data-video-status]');
  document.querySelectorAll('[data-video-key]').forEach(link => link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    video.pause();
    video.src = link.href;
    video.poster = { working: 'asseats/product-squares/mahogany-working-1080.jpg', bulb: 'asseats/product-squares/mahogany-top-1080.jpg', film: 'asseats/product-squares/mahogany-wooden-floor-lamp-1080.jpg' }[link.dataset.videoKey];
    video.setAttribute('aria-label', link.querySelector('strong').textContent);
    document.querySelector('[data-video-description]').textContent = descriptions[link.dataset.videoKey];
    document.querySelector('[data-video-fallback]').href = link.href;
    document.querySelectorAll('[data-video-key]').forEach(item => {
      if (item === link) item.setAttribute('aria-current', 'true'); else item.removeAttribute('aria-current');
    });
    videoStatus.textContent = '';
    video.load();
    video.play().catch(() => { videoStatus.textContent = 'Press play on the video to begin.'; });
  }));
  video.addEventListener('error', () => { videoStatus.textContent = 'The video could not load. Use the link above to open it directly.'; });
  document.addEventListener('visibilitychange', () => { if (document.hidden) video.pause(); });
});
