import { initAjaxSearch } from './search.js';
import { contactPanelHTML, orderMessage, orderEmailURL } from './store-contact.js';

export const PRODUCTS = [
  {
    id: 'mahogany-wooden-floor-lamp',
    name: 'Mahogany Wooden Floor Lamp',
    category: 'Floor lamps',
    price: 2850,
    badge: 'New',
    tone: 'Mahogany wood · Botanical shade',
    description: 'Rich mahogany, an open geometric frame, and a patterned drum shade bring a softer glow to your favourite corner.',
    specs: ['Mahogany wood stand and frame', 'Patterned shade with metal support frame', 'Bulb included', '5A cable and two-pin plug'],
    image: 'asseats/product-squares/mahogany-wooden-floor-lamp-1080.jpg',
    imageFit: 'contain',
    imageAlt: 'Mahogany wooden floor lamp with a white botanical-print shade, shown in a styled home setting',
  },
  {
    id: 'arc-line-floor-lamp',
    name: 'Arc Line Floor Lamp',
    category: 'Floor lamps',
    price: 7850,
    compareAt: 9200,
    badge: 'Best seller',
    tone: 'Matte black steel',
    description: 'A sculptural arc that brings warm, focused light to reading corners.',
    specs: ['Matte black steel', 'Warm LED compatible', 'Height: 160 cm'],
    image: 'asseats/product-squares/arc-line-floor-lamp-1080.jpg',
    imageAlt: 'Modern arc floor lamp beside a soft lounge chair',
  },
  {
    id: 'halo-wood-floor-lamp',
    name: 'Halo Wood Floor Lamp',
    category: 'Floor lamps',
    price: 6490,
    compareAt: 7200,
    badge: 'New',
    tone: 'Oak & linen',
    description: 'Soft linen diffusion and a warm oak base for slow evenings at home.',
    specs: ['Natural oak', 'Linen shade', 'Height: 148 cm'],
    image: 'asseats/product-squares/halo-wood-floor-lamp-1080.jpg',
    imageAlt: 'Linen shade floor lamp with a warm wooden base',
  },
  {
    id: 'corner-glow-smart-lamp',
    name: 'Corner Glow Smart Lamp',
    category: 'Floor lamps',
    price: 3890,
    compareAt: 4500,
    badge: 'Mood light',
    tone: 'RGB LED',
    description: 'A slim corner silhouette with app-controlled color for living rooms and gaming spaces.',
    specs: ['RGB LED', 'App + remote control', 'Height: 120 cm'],
    image: 'asseats/product-squares/corner-glow-smart-lamp-1080.jpg',
    imageAlt: 'Slim contemporary lamp glowing in a modern interior',
  },
  {
    id: 'readwell-gooseneck-lamp',
    name: 'Readwell Gooseneck Lamp',
    category: 'Floor lamps',
    price: 5290,
    badge: 'Reading light',
    tone: 'Warm white LED',
    description: 'A flexible reading light that keeps the glow exactly where you need it.',
    specs: ['Dimmable LED', 'Flexible neck', 'Touch control'],
    image: 'asseats/product-squares/readwell-gooseneck-lamp-1080.jpg',
    imageAlt: 'Adjustable reading floor lamp in a calm living room',
  },
  {
    id: 'fold-statement-lamp',
    name: 'Fold Statement Lamp',
    category: 'Floor lamps',
    price: 8970,
    compareAt: 10400,
    badge: 'Statement piece',
    tone: 'Powder-coated black',
    description: 'An architectural profile designed to anchor a quiet, considered room.',
    specs: ['Powder-coated steel', 'Adjustable shade', 'Height: 172 cm'],
    image: 'asseats/product-squares/fold-statement-lamp-1080.jpg',
    imageAlt: 'Statement floor lamp creating a pool of light beside a sofa',
  },
  {
    id: 'linen-column-floor-lamp',
    name: 'Linen Column Floor Lamp',
    category: 'Floor lamps',
    price: 7150,
    badge: 'Soft glow',
    tone: 'Stone linen',
    description: 'A tall, tonal shade for ambient light that feels easy from morning to night.',
    specs: ['Stone linen', 'Metal frame', 'Height: 155 cm'],
    image: 'asseats/product-squares/linen-column-floor-lamp-1080.jpg',
    imageAlt: 'Tall linen floor lamp in a neutral interior',
  },
  {
    id: 'orbit-table-lamp',
    name: 'Orbit Table Lamp',
    category: 'Table lamps',
    price: 2950,
    compareAt: 3400,
    badge: 'New',
    tone: 'Stone ceramic',
    description: 'A compact ceramic glow for bedside tables, consoles, and small shelves.',
    specs: ['Stone ceramic', 'Cotton shade', 'Height: 34 cm'],
    image: 'asseats/product-squares/orbit-table-lamp-1080.jpg',
    imageAlt: 'Small ceramic table lamp on a wooden side table',
  },
  {
    id: 'linea-pendant-light',
    name: 'Linea Pendant Light',
    category: 'Pendant lights',
    price: 4650,
    badge: 'Quiet icon',
    tone: 'Matte black',
    description: 'A simple pendant with a graphic profile for dining tables and kitchen islands.',
    specs: ['Matte black metal', 'Adjustable cord', 'Warm LED compatible'],
    image: 'asseats/product-squares/linea-pendant-light-1080.jpg',
    imageAlt: 'Minimal pendant light above a modern workspace',
  },
  {
    id: 'soft-curve-wall-light',
    name: 'Soft Curve Wall Light',
    category: 'Wall lights',
    price: 3150,
    badge: 'Easy install',
    tone: 'Brushed brass',
    description: 'A compact wall light that turns hallways and bedside corners into warm pauses.',
    specs: ['Brushed brass', 'Wall mount', 'Warm LED compatible'],
    image: 'asseats/product-squares/soft-curve-wall-light-1080.jpg',
    imageAlt: 'Wall light casting warm light across a neutral wall',
  },
  {
    id: 'cloud-ceiling-light',
    name: 'Cloud Ceiling Light',
    category: 'Ceiling lights',
    price: 5850,
    compareAt: 6500,
    badge: 'Best seller',
    tone: 'Opal glass',
    description: 'A softly rounded ceiling light that spreads an even, comfortable glow.',
    specs: ['Opal glass', 'Brushed steel', 'Dimmable'],
    image: 'asseats/product-squares/cloud-ceiling-light-1080.jpg',
    imageAlt: 'Soft ceiling light illuminating a calm bedroom',
  },
  {
    id: 'garden-glow-outdoor-light',
    name: 'Garden Glow Outdoor Light',
    category: 'Outdoor lighting',
    price: 2780,
    badge: 'Weather ready',
    tone: 'Graphite aluminium',
    description: 'A low, durable light for balconies, patios, and late dinners outside.',
    specs: ['Graphite aluminium', 'IP44 rated', 'Warm LED compatible'],
    image: 'asseats/product-squares/garden-glow-outdoor-light-1080.jpg',
    imageAlt: 'Outdoor light glowing on a modern patio at dusk',
  },
  {
    id: 'melt-glass-table-lamp',
    name: 'Melt Glass Table Lamp',
    category: 'Table lamps',
    price: 4250,
    badge: 'New',
    tone: 'Smoke glass',
    description: 'A translucent glass form that makes a desk, console, or bedside glow feel special.',
    specs: ['Smoke glass', 'Brushed metal base', 'Height: 38 cm'],
    image: 'asseats/product-squares/melt-glass-table-lamp-1080.jpg',
    imageAlt: 'Glass table lamp with a warm bulb on a sideboard',
  },
];

export const CATEGORIES = [
  { name: 'Floor lamps', note: 'The hero edit' },
  { name: 'Table lamps', note: 'Small, warm glow' },
  { name: 'Pendant lights', note: 'Room-defining forms' },
  { name: 'Wall lights', note: 'Soft accent light' },
  { name: 'Ceiling lights', note: 'Even illumination' },
  { name: 'Outdoor lighting', note: 'After-dark living' },
].map(category => ({ ...category, image: PRODUCTS.find(product => product.category === category.name).image }));

export function formatBDT(value) {
  if (value === null) return 'Price on request';
  return `৳ ${new Intl.NumberFormat('en-BD', { maximumFractionDigits: 0 }).format(Number(value) || 0)}`;
}

export function filterProducts(products, category = 'All lamps') {
  if (!category || category === 'All lamps') return products;
  return products.filter((product) => product.category === category);
}

export function searchProducts(products, query = '') {
  const term = query.trim().toLowerCase();
  if (!term) return products;
  return products.filter((product) => {
    const searchable = [product.name, product.category, product.description, product.tone, ...(product.specs || [])]
      .join(' ')
      .toLowerCase();
    return searchable.includes(term);
  });
}

export function addToCart(cart, productId, quantity = 1) {
  const amount = Math.max(1, Math.min(99, Math.floor(Number(quantity) || 1))); 
  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    return cart.map((item) => (item.id === productId ? { ...item, quantity: item.quantity + amount } : item));
  }
  return [...cart, { id: productId, quantity: amount }];
}

export function updateCartQuantity(cart, productId, quantity) {
  const nextQuantity = Math.max(0, Number(quantity) || 0);
  if (nextQuantity === 0) return cart.filter((item) => item.id !== productId);
  return cart.map((item) => (item.id === productId ? { ...item, quantity: nextQuantity } : item));
}

export function cartItemCount(cart) {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

export function cartTotal(cart, products) {
  return cart.reduce((total, item) => {
    const product = products.find((candidate) => candidate.id === item.id);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);
}

const CART_STORAGE_KEY = 'shine-through-cart';

function getStoredCart() {
  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed.filter((item) => item && item.id && Number(item.quantity) > 0) : [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // The prototype continues to work when storage is unavailable.
  }
}

function icon(name) {
  const icons = {
    arrow: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10h13M11 5l5 5-5 5" /></svg>',
    bag: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>',
    heart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.8c0 5.2-8.8 10-8.8 10s-8.8-4.8-8.8-10A4.8 4.8 0 0 1 12 6.1a4.8 4.8 0 0 1 8.8 2.7Z" /></svg>',
    menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>',
    search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.5" /><path d="m16 16 5 5" /></svg>',
    user: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5" /><path d="M5.5 20a6.5 6.5 0 0 1 13 0" /></svg>',
  };
  return icons[name] || '';
}

function productCard(product) {
  const compareAt = product.compareAt
    ? `<span class="compare-price">${formatBDT(product.compareAt)}</span>`
    : '';
  return `
    <article class="product-card">
      <div class="product-image-wrap">
        <a href="${product.page || `product.html?id=${product.id}`}" aria-label="View ${product.name}"><img class="product-image${product.imageFit === 'contain' ? ' product-image-contained' : ''}" src="${product.image}" alt="${product.imageAlt}" loading="lazy" /></a>
        <span class="product-badge">${product.badge}</span>
        <button class="wishlist-button" type="button" aria-label="Save ${product.name}">${icon('heart')}</button>
        <button class="quick-add" type="button" data-add-to-cart="${product.id}">${product.price === null ? 'Enquire' : 'Add to bag'} ${icon('arrow')}</button>
      </div>
      <div class="product-info">
        <div>
          <p class="product-category">${product.category}</p>
          <h3><a href="${product.page || `product.html?id=${product.id}`}">${product.name}</a></h3>
        </div>
        <div class="product-prices">
          <strong>${formatBDT(product.price)}</strong>
          ${compareAt}
        </div>
      </div>
      <p class="product-description">${product.description}</p>
    </article>
  `;
}

export function initStorefront({ customCatalog = false } = {}) {
  const header = document.querySelector('.site-header');
  if (header && typeof ResizeObserver !== 'undefined') {
    const updateHeaderHeight = () => document.documentElement.style.setProperty('--header-height', `${header.getBoundingClientRect().height}px`);
    updateHeaderHeight();
    new ResizeObserver(updateHeaderHeight).observe(header);
  }
  const productGrid = document.querySelector('[data-product-grid]');
  const filterRow = document.querySelector('[data-filter-row]');
  const resultsCount = document.querySelector('[data-results-count]');
  const cartDrawer = document.querySelector('[data-cart-drawer]');
  const cartItems = document.querySelector('[data-cart-items]');
  const cartEmpty = document.querySelector('[data-cart-empty]');
  const cartSummary = document.querySelector('[data-cart-summary]');
  const cartSubtotal = document.querySelector('[data-cart-subtotal]');
  const cartCount = document.querySelector('[data-cart-count]');
  const toast = document.querySelector('[data-toast]');
  const searchPanel = document.querySelector('[data-search-panel]');
  const searchInput = document.querySelector('[data-search-input]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const cartToggle = document.querySelector('[data-cart-toggle]');
  const closeCartButton = document.querySelector('[data-close-cart]');
  const searchToggle = document.querySelector('[data-search-toggle]');
  const closeSearchButton = document.querySelector('[data-close-search]');
  cartSummary.insertAdjacentHTML('afterend', contactPanelHTML());
  const orderPanel = cartDrawer.querySelector('[data-order-contact]');
  const orderTextarea = cartDrawer.querySelector('[data-order-message]');
  const orderEmail = cartDrawer.querySelector('[data-order-email]');
  const orderStatus = cartDrawer.querySelector('[data-order-status]');
  const orderStart = cartDrawer.querySelector('[data-start-order]');
  let isOrderOpen = false;
  const productSort = document.querySelector('[data-product-sort]');
  const categoryTitle = document.querySelector('[data-category-title]');
  const isCollectionsPage = document.body.classList.contains('collections-page');
  const categoryNames = ['All lamps', ...CATEGORIES.map((category) => category.name)];
  const readCategoryFromURL = () => {
    const category = new URLSearchParams(window.location.search).get('category');
    return categoryNames.includes(category) ? category : 'Floor lamps';
  };
  let activeCategory = readCategoryFromURL();
  let cart = getStoredCart();
  let toastTimer;
  let lastFocusedElement;

  const showToast = (message) => {
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add('is-visible');
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2600);
  };

  const renderProducts = () => {
    if (customCatalog) return;
    const query = searchInput?.value || '';
    const visibleProducts = [...searchProducts(filterProducts(PRODUCTS, activeCategory), query)];
    if (productSort?.value === 'price-ascending') visibleProducts.sort((a, b) => a.price - b.price);
    if (productSort?.value === 'price-descending') visibleProducts.sort((a, b) => b.price - a.price);
    if (productSort?.value === 'name') visibleProducts.sort((a, b) => a.name.localeCompare(b.name));
    productGrid.innerHTML = visibleProducts.length
      ? visibleProducts.map(productCard).join('')
      : `<div class="empty-results"><p class="eyebrow">Nothing found</p><h3>Try a different search.</h3><button class="button button-outline" type="button" data-reset-search>Show all lamps</button></div>`;
    resultsCount.textContent = `${visibleProducts.length} ${visibleProducts.length === 1 ? 'piece' : 'pieces'}`;
  };

  const setActiveCategory = (category, { clearSearch = false, updateURL = true } = {}) => {
    if (!categoryNames.includes(category)) return;
    activeCategory = category;
    if (clearSearch) searchInput.value = '';
    filterRow.querySelectorAll('[data-category]').forEach((button) => {
      const isActive = button.dataset.category === activeCategory;
      button.classList.toggle('is-active', isActive);
      button.setAttribute(button.hasAttribute('aria-pressed') ? 'aria-pressed' : 'aria-selected', String(isActive));
    });
    if (categoryTitle) {
      const headings = {
        'All lamps': 'All lighting',
        'Floor lamps': 'The floor lamp',
        'Table lamps': 'The table lamp',
        'Pendant lights': 'The pendant light',
        'Wall lights': 'The wall light',
        'Ceiling lights': 'The ceiling light',
        'Outdoor lighting': 'The outdoor lighting',
      };
      categoryTitle.innerHTML = `${headings[activeCategory]} <em>edit.</em>`;
    }
    if (isCollectionsPage && updateURL) {
      const url = new URL(window.location.href);
      if (url.searchParams.get('category') !== activeCategory) {
        url.searchParams.set('category', activeCategory);
        window.history.pushState(null, '', url);
      }
    }
    renderProducts();
  };

  const renderCart = () => {
    const items = cart
      .map((item) => ({ ...PRODUCTS.find((product) => product.id === item.id), quantity: item.quantity }))
      .filter((item) => item.id);
    const count = cartItemCount(cart);
    const subtotal = cartTotal(cart, PRODUCTS);
    cartCount.textContent = count;
    cartCount.classList.toggle('is-hidden', count === 0);
    cartEmpty.classList.toggle('is-hidden', items.length > 0);
    cartSummary.classList.toggle('is-hidden', items.length === 0);
    cartItems.innerHTML = items.map((product) => `
      <article class="cart-item">
        <img src="${product.image}" alt="${product.imageAlt}" loading="lazy" />
        <div class="cart-item-body">
          <div class="cart-item-heading">
            <div>
              <p class="product-category">${product.category}</p>
              <h3>${product.name}</h3>
            </div>
            <button type="button" class="cart-remove" data-cart-remove="${product.id}" aria-label="Remove ${product.name}">${icon('close')}</button>
          </div>
          <div class="cart-item-footer">
            <div class="quantity-control" aria-label="Quantity for ${product.name}">
              <button type="button" data-cart-quantity="${product.id}" data-quantity-change="-1" aria-label="Decrease quantity">−</button>
              <span>${product.quantity}</span>
              <button type="button" data-cart-quantity="${product.id}" data-quantity-change="1" aria-label="Increase quantity">+</button>
            </div>
            <strong>${formatBDT(product.price * product.quantity)}</strong>
          </div>
        </div>
      </article>
    `).join('');
    if (items.length) {
      const categories = new Set(items.map(item => item.category));
      const recommendations = PRODUCTS
        .filter(product => !items.some(item => item.id === product.id))
        .sort((a, b) => Number(categories.has(a.category)) - Number(categories.has(b.category)) || a.price - b.price)
        .slice(0, 2);
      if (recommendations.length) cartItems.insertAdjacentHTML('beforeend', `
        <section class="cart-upsell" aria-labelledby="cart-upsell-title">
          <p class="eyebrow">A little more glow</p>
          <h3 id="cart-upsell-title">Better together.</h3>
          <p class="cart-upsell-intro">Layer your light with another piece.</p>
          <div class="cart-upsell-list">${recommendations.map(product => `
            <article class="cart-upsell-product">
              <img src="${product.image}" alt="${product.imageAlt}" loading="lazy" width="64" height="80" />
              <div><p>${product.category}</p><h4>${product.name}</h4><strong>${formatBDT(product.price)}</strong></div>
              <button type="button" data-add-to-cart="${product.id}" data-upsell-add aria-label="Add ${product.name} to bag">Add <span aria-hidden="true">+</span></button>
            </article>`).join('')}</div>
        </section>`);
    }
    cartSubtotal.textContent = formatBDT(subtotal);
    const message = orderMessage(cart, PRODUCTS);
    orderTextarea.value = message;
    const emailURL = orderEmailURL(message);
    orderEmail.hidden = !emailURL;
    if (emailURL) orderEmail.href = emailURL;
    else orderEmail.removeAttribute('href');
  };

  const setOrderOpen = (open) => {
    isOrderOpen = open;
    orderPanel.hidden = !open;
    cartDrawer.classList.toggle('is-contacting', open);
    cartItems.hidden = open;
    cartSummary.hidden = open;
    cartDrawer.querySelector('#cart-title').textContent = open ? 'Send your selection' : 'Shopping bag';
    if (open) {
      orderStatus.textContent = '';
      orderPanel.scrollTop = 0;
      orderPanel.querySelector('[data-order-back]').focus();
    } else orderStart?.focus();
  };

  const setCartOpen = (isOpen) => {
    if (cartDrawer.classList.contains('is-open') === isOpen) return;
    if (isOpen) lastFocusedElement = document.activeElement;
    if (!isOpen && isOrderOpen) setOrderOpen(false);
    cartDrawer.classList.toggle('is-open', isOpen);
    cartDrawer.setAttribute('aria-hidden', String(!isOpen));
    cartDrawer.inert = !isOpen;
    document.querySelectorAll('body > header, body > main, body > footer, body > .announcement-bar, body > .skip-link').forEach((element) => {
      element.inert = isOpen;
    });
    document.body.classList.toggle('drawer-open', isOpen);
    if (isOpen) closeCartButton.focus();
    else lastFocusedElement?.focus();
  };

  const setSearchOpen = (isOpen) => {
    const wasOpen = searchPanel.classList.contains('is-open');
    searchPanel.classList.toggle('is-open', isOpen);
    searchPanel.setAttribute('aria-hidden', String(!isOpen));
    searchPanel.inert = !isOpen;
    searchToggle.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) { searchInput.focus(); ajaxSearch.refresh(); }
    else { ajaxSearch.cancel(); if (wasOpen) searchToggle.focus(); }
  };

  const setMobileMenuOpen = (isOpen) => {
    mobileMenu.classList.toggle('is-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    document.body.classList.toggle('menu-open', isOpen);
  };

  const ajaxSearch = initAjaxSearch({ panel: searchPanel, input: searchInput, products: PRODUCTS, formatPrice: formatBDT });

  document.querySelector('[data-marquee-pause]')?.addEventListener('click', event => {
    const button = event.currentTarget;
    const paused = button.closest('.marquee').classList.toggle('is-paused');
    button.setAttribute('aria-pressed', String(paused));
    button.setAttribute('aria-label', paused ? 'Resume scrolling strip' : 'Pause scrolling strip');
    button.firstElementChild.textContent = paused ? '▶' : 'Ⅱ';
  });

  filterRow?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-category]');
    if (!button) return;
    setActiveCategory(button.dataset.category, { clearSearch: true });
  });

  document.addEventListener('click', (event) => {
    const closeCartLink = event.target.closest('[data-close-cart]');
    if (closeCartLink && closeCartLink !== closeCartButton) {
      setCartOpen(false);
    }

    const addButton = event.target.closest('[data-add-to-cart]');
    if (addButton) {
      const selectedProduct = PRODUCTS.find(p => p.id === addButton.dataset.addToCart);
      if (selectedProduct?.price === null) { location.href = selectedProduct.page; return; }
      cart = addToCart(cart, addButton.dataset.addToCart, addButton.dataset.addQuantity);
      saveCart(cart);
      renderCart();
      if (addButton.hasAttribute('data-upsell-add')) {
        (cartItems.querySelector('[data-upsell-add]') || closeCartButton).focus({ preventScroll: true });
      }
      showToast('Added to your bag');
      if (addButton.hasAttribute('data-open-bag')) setCartOpen(true);
      return;
    }

    const categoryButton = event.target.closest('[data-set-category]');
    if (categoryButton) {
      if (categoryButton.matches('a') && (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)) return;
      event.preventDefault();
      setActiveCategory(categoryButton.dataset.setCategory, { clearSearch: true });
      const shop = document.querySelector('#shop');
      shop.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      if (isCollectionsPage) {
        categoryTitle.tabIndex = -1;
        categoryTitle.focus({ preventScroll: true });
      }
    }

    const resetSearch = event.target.closest('[data-reset-search]');
    if (resetSearch) {
      setActiveCategory('All lamps', { clearSearch: true });
      if (categoryTitle) {
        categoryTitle.tabIndex = -1;
        categoryTitle.focus({ preventScroll: true });
      }
    }
  });

  cartItems.addEventListener('click', (event) => {
    const removeButton = event.target.closest('[data-cart-remove]');
    if (removeButton) {
      cart = updateCartQuantity(cart, removeButton.dataset.cartRemove, 0);
      saveCart(cart);
      renderCart();
      return;
    }

    const quantityButton = event.target.closest('[data-cart-quantity]');
    if (quantityButton) {
      const item = cart.find((entry) => entry.id === quantityButton.dataset.cartQuantity);
      if (!item) return;
      cart = updateCartQuantity(cart, item.id, item.quantity + Number(quantityButton.dataset.quantityChange));
      saveCart(cart);
      renderCart();
    }
  });

  cartToggle.addEventListener('click', () => setCartOpen(true));
  closeCartButton.addEventListener('click', () => setCartOpen(false));
  cartDrawer.querySelector('[data-cart-backdrop]').addEventListener('click', () => setCartOpen(false));
  searchToggle.addEventListener('click', () => setSearchOpen(!searchPanel.classList.contains('is-open')));
  closeSearchButton.addEventListener('click', () => setSearchOpen(false));
  if (!customCatalog) searchInput.addEventListener('input', () => setActiveCategory('All lamps'));
  productSort?.addEventListener('change', renderProducts);
  document.querySelector('[data-view-search-results]')?.addEventListener('click', (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    setSearchOpen(false);
    document.querySelector('#shop').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    categoryTitle.tabIndex = -1;
    categoryTitle.focus({ preventScroll: true });
  });
  menuToggle.addEventListener('click', () => setMobileMenuOpen(!mobileMenu.classList.contains('is-open')));

  mobileMenu.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMobileMenuOpen(false);
  });

  document.querySelector('[data-newsletter-form]')?.addEventListener('submit', (event) => {
    event.preventDefault();
    event.currentTarget.reset();
    showToast('You are on the list');
  });

  orderStart?.addEventListener('click', () => {
    if (!orderMessage(cart, PRODUCTS)) return;
    renderCart();
    setOrderOpen(true);
  });
  orderPanel.querySelector('[data-order-back]').addEventListener('click', () => setOrderOpen(false));
  orderPanel.querySelector('[data-copy-order]').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(orderTextarea.value);
      orderStatus.textContent = 'Details copied. Open Facebook and paste them into a message to our team.';
    } catch {
      orderTextarea.focus();
      orderTextarea.select();
      orderStatus.textContent = 'Select and copy the highlighted details, then paste them into your message.';
    }
  });
  orderEmail.addEventListener('click', () => {
    orderStatus.textContent = 'Your email app will open a draft. Review it and send it to our team. You can also copy the details above.';
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setCartOpen(false);
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
    if (event.key === 'Tab' && cartDrawer.classList.contains('is-open')) {
      const focusable = [...cartDrawer.querySelectorAll('button, a[href], input, select, textarea, [tabindex="0"]')]
        .filter((element) => !element.disabled && element.getClientRects().length > 0);
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
  });

  if (!customCatalog) window.addEventListener('popstate', () => setActiveCategory(readCategoryFromURL(), { clearSearch: true, updateURL: false }));
  document.querySelectorAll('[data-collection-count]').forEach((element) => {
    const count = filterProducts(PRODUCTS, element.dataset.collectionCount).length;
    element.textContent = `${count} ${count === 1 ? 'piece' : 'pieces'}`;
  });
  cartDrawer.inert = true;
  searchPanel.inert = true;
  if (!customCatalog) setActiveCategory(activeCategory, { updateURL: false });
  renderCart();
  return { showToast, setSearchOpen, setCartOpen };
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    if (!document.body.matches('.shop-page, .product-page')) {
      initStorefront({ customCatalog: !document.querySelector('[data-product-grid]') });
    }
  });
}
