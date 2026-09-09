import { PRODUCTS, initStorefront } from './app.js';
import { DEFAULT_PRODUCT_ID, renderProductPage } from './product-content.js';

document.addEventListener('DOMContentLoaded', () => {
  const id = new URLSearchParams(location.search).get('id') ?? DEFAULT_PRODUCT_ID;
  const product = PRODUCTS.find(p => p.id === id);
  document.querySelector('#main').innerHTML = renderProductPage(product);
  document.title = `${product?.name || 'Piece not found'} — SHINE THROUGH`;
  if (product) document.querySelector('meta[name="description"]').content = product.description;
  const storefront = initStorefront({ customCatalog: true });
  if (!product) return;
  const quantity = document.querySelector('#product-quantity');
  const syncQuantity = () => {
    const value = Math.max(1, Math.min(99, Math.floor(Number(quantity.value) || 1)));
    quantity.value = value;
    document.querySelectorAll('[data-add-quantity]').forEach(button => button.dataset.addQuantity = value);
    document.querySelector('[data-quantity-step="-1"]').disabled = value === 1;
    document.querySelector('[data-quantity-step="1"]').disabled = value === 99;
  };
  quantity.addEventListener('input', syncQuantity);
  quantity.addEventListener('change', syncQuantity);
  document.querySelectorAll('[data-quantity-step]').forEach(button => button.addEventListener('click', () => {
    quantity.value = Number(quantity.value) + Number(button.dataset.quantityStep);
    syncQuantity();
  }));
  const gallery = document.querySelector('[data-gallery]');
  const thumbnails = [...document.querySelectorAll('[data-photo-view]')];
  thumbnails.forEach(button => button.addEventListener('click', () => {
    gallery.dataset.view = button.dataset.photoView;
    thumbnails.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    document.querySelector('[data-view-caption]').textContent = button.getAttribute('aria-label');
    document.querySelector('[data-photo-count]').textContent = `0${Number(button.dataset.photoView)+1} / 0${thumbnails.length}`;
  }));
  const dialog = document.querySelector('[data-image-dialog]');
  document.querySelector('[data-open-image]').addEventListener('click', () => { dialog.showModal(); document.body.classList.add('pd-image-open'); });
  document.querySelector('[data-close-image]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => document.body.classList.remove('pd-image-open'));
  const readSaved = () => {
    try { const data = JSON.parse(localStorage.getItem('shine-through-saved')); return new Set(Array.isArray(data) ? data.filter(id => PRODUCTS.some(p=>p.id===id)) : []); } catch { return new Set(); }
  };
  let saved = readSaved();
  const saveButton = document.querySelector('[data-save-piece]');
  const renderSaved = () => {
    saveButton.setAttribute('aria-pressed', String(saved.has(id)));
    saveButton.setAttribute('aria-label', `${saved.has(id) ? 'Unsave' : 'Save'} ${product.name}`);
  };
  saveButton.addEventListener('click', () => {
    saved.has(id) ? saved.delete(id) : saved.add(id);
    try { localStorage.setItem('shine-through-saved', JSON.stringify([...saved])); } catch { /* Saving stays available for this visit. */ }
    renderSaved();
    storefront.showToast(saved.has(id) ? 'Saved to your favourites' : 'Removed from your favourites');
  });
  window.addEventListener('storage', event => { if (event.key === 'shine-through-saved') { saved = readSaved(); renderSaved(); } });
  renderSaved();
  const sticky = document.querySelector('[data-sticky-purchase]');
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => { sticky.hidden = entry.isIntersecting || entry.boundingClientRect.bottom > 0; }, { threshold: 0 }).observe(document.querySelector('[data-purchase]'));
  }
});
