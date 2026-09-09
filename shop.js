import { PRODUCTS, CATEGORIES, formatBDT, initStorefront } from './app.js';
import { SHOP_DEFAULTS, readShopState, shopStateQuery, getShopProducts } from './shop-state.js';

const heart = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.8c0 5.2-8.8 10-8.8 10s-8.8-4.8-8.8-10A4.8 4.8 0 0 1 12 6.1a4.8 4.8 0 0 1 8.8 2.7Z" /></svg>';
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const readStorage = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
};
const writeStorage = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Browsing still works without storage. */ }
};

function initShop() {
  const storefront = initStorefront({ customCatalog: true });
  let state = readShopState(location.search);
  const savedValue = readStorage('shine-through-saved', []);
  const saved = new Set(Array.isArray(savedValue) ? savedValue.filter(id => PRODUCTS.some(product => product.id === id)) : []);
  const grid = document.querySelector('[data-product-grid]');
  const search = document.querySelector('[data-shop-search]');
  const headerSearch = document.querySelector('[data-search-input]');
  const sort = document.querySelector('[data-shop-sort]');
  const title = document.querySelector('#catalog-title');
  const priceForm = document.querySelector('[data-price-form]');
  const minInput = priceForm.elements.min;
  const maxInput = priceForm.elements.max;
  const priceError = document.querySelector('[data-price-error]') || document.querySelector('#price-error');
  const filterDialog = document.querySelector('[data-filter-dialog]');
  const filterContent = document.querySelector('[data-filter-content]');
  const filterHome = document.querySelector('[data-filter-home]');
  const filterToggle = document.querySelector('[data-open-filters]');
  const productDialog = document.querySelector('[data-product-dialog]');
  const layout = document.querySelector('[data-shop-layout]');
  const mobile = window.matchMedia('(max-width: 1000px)');
  let view = readStorage('shine-through-grid', 'compact') === 'comfortable' ? 'comfortable' : 'compact';
  let lastProductTrigger;
  let lastProductId;

  document.querySelector('[data-shop-categories]').innerHTML = ['All lamps', ...CATEGORIES.map(category => category.name)].map(category => {
    const count = category === 'All lamps' ? PRODUCTS.length : PRODUCTS.filter(product => product.category === category).length;
    return `<button class="shop-category" type="button" data-shop-category="${category}" aria-pressed="false">${category === 'All lamps' ? 'All lighting' : category}<span>${count}</span></button>`;
  }).join('');

  const productCard = product => `
    <article class="shop-product" data-product-id="${product.id}">
      <div class="shop-product-visual">
        <button class="product-preview" type="button" data-quick-view="${product.id}" aria-label="View details for ${product.name}"><img src="${product.image}" alt="${product.imageAlt}" loading="lazy" width="540" height="650" /><span class="quick-view-label">Quick view <span aria-hidden="true">↗</span></span></button>
        <span class="shop-product-badge${product.badge === 'New' ? ' is-new' : ''}">${product.badge}</span>
        <button class="save-product" type="button" data-save-product="${product.id}" aria-label="${saved.has(product.id) ? 'Unsave' : 'Save'} ${product.name}" aria-pressed="${saved.has(product.id)}">${heart}</button>
      </div>
      <div class="shop-product-info"><p class="shop-product-category">${product.category}</p><h3 class="shop-product-name"><a class="product-title-button" href="product.html?id=${product.id}">${product.name}</a></h3><p class="shop-product-tone">${product.tone}</p><div class="shop-product-bottom"><div class="shop-product-price"><strong>${formatBDT(product.price)}</strong>${product.compareAt > product.price ? `<del>${formatBDT(product.compareAt)}</del>` : ''}</div><button class="shop-add" type="button" data-add-to-cart="${product.id}" aria-label="Add ${product.name} to bag"><span class="add-label">Add</span><span aria-hidden="true">+</span></button></div></div>
    </article>`;

  const filterChips = () => {
    const chips = [];
    if (state.category !== 'All lamps') chips.push(['category', state.category]);
    if (state.query.trim()) chips.push(['query', `Search: ${state.query.trim()}`]);
    if (state.min !== null || state.max !== null) chips.push(['price', state.min !== null && state.max !== null ? `${formatBDT(state.min)} – ${formatBDT(state.max)}` : state.max !== null ? `Up to ${formatBDT(state.max)}` : `From ${formatBDT(state.min)}`]);
    if (state.edit !== 'all') chips.push(['edit', { new: 'New arrivals', sale: 'On sale', saved: 'Saved pieces' }[state.edit]]);
    return chips;
  };

  const render = () => {
    const products = getShopProducts(PRODUCTS, state, saved);
    const chips = filterChips();
    grid.innerHTML = products.length ? products.map(productCard).join('') : `<div class="shop-empty"><span aria-hidden="true">✳</span><h3>${state.edit === 'saved' && saved.size === 0 ? 'Your favourites start here.' : 'A different glow is waiting.'}</h3><p>${state.edit === 'saved' && saved.size === 0 ? 'Tap the heart on any piece to keep your favourites together.' : 'No pieces match this combination. Remove a filter or try a broader search.'}</p><button type="button" class="button button-dark" data-clear-shop>${state.edit === 'saved' && saved.size === 0 ? 'Discover the lamps' : 'Clear filters & explore'} <span aria-hidden="true">↗</span></button></div>`;
    const countLabel = `${products.length} ${products.length === 1 ? 'piece' : 'pieces'}`;
    document.querySelector('[data-results-count]').textContent = countLabel;
    document.querySelector('[data-show-results]').innerHTML = `Show ${countLabel} <span aria-hidden="true">→</span>`;
    document.querySelector('[data-list-end]').textContent = products.length ? `You’ve seen all ${countLabel}. Your next favourite is here somewhere.` : '';
    title.textContent = state.edit === 'saved' ? 'Saved pieces' : state.category === 'All lamps' ? 'All lighting' : state.category;
    document.querySelectorAll('button[data-shop-category]').forEach(button => button.setAttribute('aria-pressed', String(state.category === button.dataset.shopCategory)));
    if (search.value !== state.query) search.value = state.query;
    if (headerSearch.value !== state.query) headerSearch.value = state.query;
    sort.value = state.sort;
    minInput.value = state.min ?? '';
    maxInput.value = state.max ?? '';
    document.querySelectorAll('[name="shop-edit"]').forEach(input => { input.checked = state.edit === input.value; });
    document.querySelectorAll('[data-price-preset]').forEach(button => button.setAttribute('aria-pressed', String(state.min === null && state.max === Number(button.dataset.pricePreset))));
    document.querySelectorAll('[data-edit-count]').forEach(element => { element.textContent = getShopProducts(PRODUCTS, { ...SHOP_DEFAULTS, category: state.category, edit: element.dataset.editCount }, saved).length; });
    const filterCount = document.querySelector('[data-filter-count]');
    filterCount.textContent = chips.length;
    filterCount.hidden = !chips.length;
    document.querySelector('[data-applied-filters]').innerHTML = chips.length ? chips.map(([key, label]) => `<button type="button" class="applied-filter" data-remove-filter="${key}" aria-label="Remove ${escapeHTML(label)} filter"><span class="filter-chip-label">${escapeHTML(label)}</span><span aria-hidden="true">×</span></button>`).join('') + '<button class="subtle-button" type="button" data-clear-shop>Clear all</button>' : '<p>Thoughtful pieces. Find one that feels like you.</p>';
    document.querySelector('[data-saved-count]').textContent = saved.size;
    document.querySelector('[data-saved-count]').hidden = !saved.size;
    document.querySelector('[data-show-saved]').setAttribute('aria-pressed', String(state.edit === 'saved'));
    syncView();
  };

  const syncView = () => {
    grid.classList.toggle('is-comfortable', view === 'comfortable');
    document.querySelectorAll('[data-grid-view]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.gridView === view)));
  };

  const update = (patch, { replace = false, history = true } = {}) => {
    state = { ...state, ...patch };
    priceError.hidden = true;
    maxInput.setCustomValidity('');
    if (history) {
      const url = new URL(location.href);
      url.search = shopStateQuery(state);
      if (url.href !== location.href) window.history[replace ? 'replaceState' : 'pushState'](null, '', url);
    }
    render();
  };

  const focusResults = (scroll = false) => {
    if (scroll) document.querySelector('#shop').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    title.focus({ preventScroll: true });
  };

  const syncFilterToggle = () => {
    filterToggle.setAttribute('aria-expanded', String(mobile.matches ? filterDialog.open : !layout.classList.contains('filters-hidden')));
  };
  filterToggle.addEventListener('click', () => {
    if (mobile.matches) {
      document.querySelector('[data-filter-dialog-body]').append(filterContent);
      filterDialog.showModal();
      filterDialog.querySelector('[data-close-filters]').focus();
    } else layout.classList.toggle('filters-hidden');
    syncFilterToggle();
  });
  document.querySelectorAll('[data-close-filters]').forEach(button => button.addEventListener('click', () => filterDialog.close()));
  filterDialog.addEventListener('close', () => {
    filterHome.append(filterContent);
    syncFilterToggle();
    filterToggle.focus({ preventScroll: true });
  });
  mobile.addEventListener('change', () => { if (filterDialog.open) filterDialog.close(); syncFilterToggle(); });

  const openProduct = (id, trigger) => {
    const product = PRODUCTS.find(item => item.id === id);
    if (!product) return;
    lastProductTrigger = trigger;
    lastProductId = id;
    document.querySelector('[data-product-details]').innerHTML = `<div class="quick-product-layout"><img class="quick-product-image" src="${product.image}" alt="${product.imageAlt}" /><div class="quick-product-copy"><p class="eyebrow">${product.category} / ${product.badge}</p><h2 id="quick-view-title">${product.name}</h2><div class="shop-product-price"><strong>${formatBDT(product.price)}</strong>${product.compareAt > product.price ? `<del>${formatBDT(product.compareAt)}</del>` : ''}</div><p>${product.description}</p><ul class="quick-product-specs">${product.specs.map(spec => `<li>${spec}</li>`).join('')}</ul><button class="button button-dark button-full" type="button" data-add-to-cart="${product.id}">Add to bag <span aria-hidden="true">+</span></button><a class="text-link" href="product.html?id=${product.id}">View full product details <span aria-hidden="true">↗</span></a><p class="quick-product-note">Prices in BDT · Delivery across Bangladesh</p></div></div>`;
    productDialog.showModal();
    productDialog.querySelector('[data-close-product]').focus();
  };
  document.querySelector('[data-close-product]').addEventListener('click', () => productDialog.close());
  productDialog.addEventListener('close', () => {
    // Do not move focus behind the bag when adding from quick view opened it.
    if (document.querySelector('[data-cart-drawer]').classList.contains('is-open')) return;
    if (lastProductTrigger?.isConnected) lastProductTrigger.focus({ preventScroll: true });
    else document.querySelector(`[data-quick-view="${lastProductId}"]`)?.focus({ preventScroll: true });
  });
  for (const dialog of [filterDialog, productDialog]) {
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const box = dialog.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
    });
  }

  priceForm.addEventListener('submit', event => {
    event.preventDefault();
    const min = minInput.value === '' ? null : Number(minInput.value);
    const max = maxInput.value === '' ? null : Number(maxInput.value);
    if (min !== null && max !== null && min > max) {
      priceError.textContent = 'The upper price must be at least the lower price.';
      priceError.hidden = false;
      maxInput.setCustomValidity(priceError.textContent);
      maxInput.reportValidity();
      return;
    }
    update({ min, max });
  });
  priceForm.addEventListener('input', () => { maxInput.setCustomValidity(''); priceError.hidden = true; });
  sort.addEventListener('change', () => update({ sort: sort.value }));
  for (const input of [search, headerSearch]) {
    input.addEventListener('input', () => update({ query: input.value }, { replace: true }));
    input.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        storefront.setSearchOpen(false);
        focusResults(true);
      }
    });
  }

  document.addEventListener('change', event => {
    if (event.target.matches('[name="shop-edit"]')) update({ edit: event.target.value });
  });
  document.addEventListener('click', event => {
    const suggestion = event.target.closest('[data-search-product]');
    if (suggestion && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
      event.preventDefault();
      storefront.setSearchOpen(false);
      openProduct(suggestion.dataset.searchProduct, document.querySelector('[data-search-toggle]'));
    }
    const category = event.target.closest('[data-shop-category]');
    if (category) {
      if (category.matches('a') && (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)) return;
      event.preventDefault();
      update({ category: category.dataset.shopCategory });
      if (category.matches('a')) focusResults(true);
    }
    const quickView = event.target.closest('[data-quick-view]');
    if (quickView) openProduct(quickView.dataset.quickView, quickView);
    const saveButton = event.target.closest('[data-save-product]');
    if (saveButton) {
      const id = saveButton.dataset.saveProduct;
      saved.has(id) ? saved.delete(id) : saved.add(id);
      writeStorage('shine-through-saved', [...saved]);
      render();
      const replacement = document.querySelector(`[data-save-product="${id}"]`);
      if (replacement) replacement.focus({ preventScroll: true });
      else focusResults();
      storefront.showToast(saved.has(id) ? 'Saved to your favourites' : 'Removed from your favourites');
    }
    if (event.target.closest('[data-show-saved]')) {
      update({ ...SHOP_DEFAULTS, edit: state.edit === 'saved' ? 'all' : 'saved' });
      focusResults(true);
    }
    if (event.target.closest('[data-clear-shop]')) {
      update({ ...SHOP_DEFAULTS, sort: state.sort });
      if (!filterDialog.open) focusResults();
    }
    const remove = event.target.closest('[data-remove-filter]');
    if (remove) {
      const key = remove.dataset.removeFilter;
      update(key === 'price' ? { min: null, max: null } : { [key]: SHOP_DEFAULTS[key] });
      focusResults();
    }
    const preset = event.target.closest('[data-price-preset]');
    if (preset) update({ min: null, max: Number(preset.dataset.pricePreset) });
    const viewButton = event.target.closest('[data-grid-view]');
    if (viewButton) { view = viewButton.dataset.gridView; writeStorage('shine-through-grid', view); syncView(); }
    if (productDialog.open && event.target.closest('[data-add-to-cart]')) {
      productDialog.close();
      lastProductTrigger?.focus({ preventScroll: true });
      storefront.setCartOpen(true);
    }
  });
  window.addEventListener('popstate', () => { state = readShopState(location.search); render(); });
  render();
  syncFilterToggle();
}

document.addEventListener('DOMContentLoaded', initShop);
