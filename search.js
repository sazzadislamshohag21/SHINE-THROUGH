// Shared header suggestions. File previews use bundled data because browsers
// prohibit fetching JSON from file:// URLs.
export function initAjaxSearch({ panel, input, products, formatPrice }) {
  const inner = panel.querySelector('.search-panel-inner');
  let feedback = panel.querySelector('[data-search-feedback]');
  if (!feedback) {
    feedback = document.createElement('p');
    feedback.className = 'search-feedback';
    inner.querySelector('.search-input-wrap').after(feedback);
  }
  feedback.id = 'search-suggestions-status';
  feedback.setAttribute('role', 'status');
  const results = document.createElement('div');
  results.id = 'search-suggestions';
  results.className = 'search-suggestions';
  results.setAttribute('aria-label', 'Matching products');
  results.setAttribute('role', 'region');
  feedback.after(results);
  input.setAttribute('aria-controls', results.id);
  input.setAttribute('aria-describedby', feedback.id);
  input.autocomplete = 'off';
  let catalog;
  let timer;
  let revision = 0;
  let composing = false;
  const loadCatalog = () => {
    if (!catalog) {
      catalog = location.protocol === 'file:' ? Promise.resolve(products) :
        fetch(new URL('search-catalog.json', document.baseURI))
          .then(response => {
            if (!response.ok) throw new Error('Catalog unavailable');
            return response.json();
          })
          .then(data => {
            if (!Array.isArray(data) || data.some(item => !item || typeof item.id !== 'string' || typeof item.name !== 'string' || (item.price !== null && !Number.isFinite(item.price)))) throw new Error('Invalid catalog');
            return data;
          })
          .catch(error => { catalog = undefined; throw error; });
    }
    return catalog;
  };
  const refresh = () => {
    clearTimeout(timer);
    const current = ++revision;
    const query = input.value.trim().slice(0, 200);
    results.replaceChildren();
    results.setAttribute('aria-busy', 'false');
    if (!query) {
      feedback.textContent = 'Search by lamp name, material, or a favourite detail.';
      return;
    }
    feedback.textContent = 'Finding your light…';
    results.setAttribute('aria-busy', 'true');
    timer = setTimeout(async () => {
      try {
        const data = await loadCatalog();
        if (current !== revision) return;
        const terms = query.toLowerCase().split(/\s+/);
        const matches = data.filter(product => {
          const text = [product.name, product.category, product.tone, product.description, ...(product.specs || [])].join(' ').toLowerCase();
          return terms.every(term => text.includes(term));
        });
        feedback.textContent = matches.length ? `${matches.length} ${matches.length === 1 ? 'piece' : 'pieces'} matching “${query}”${matches.length > 6 ? ' · Showing the first 6' : ''}` : `No pieces found for “${query}”. Try “floor”, “wood”, or “linen”.`;
        const list = document.createElement('ul');
        list.className = 'search-suggestion-list';
        for (const product of matches.slice(0, 6)) {
          const item = document.createElement('li');
          const link = document.createElement('a');
          link.className = 'search-suggestion';
          link.href = `shop.html?${new URLSearchParams({ q: product.name })}#shop`;
          link.dataset.searchProduct = product.id;
          const img = document.createElement('img');
          img.src = products.find(item => item.id === product.id)?.image || '';
          img.alt = '';
          img.width = 64;
          img.height = 76;
          const copy = document.createElement('span');
          const name = document.createElement('strong');
          name.textContent = product.name;
          const category = document.createElement('small');
          category.textContent = product.category;
          copy.append(name, category);
          const price = document.createElement('span');
          price.className = 'search-suggestion-price';
          price.textContent = formatPrice(product.price);
          link.append(img, copy, price);
          item.append(link);
          list.append(item);
        }
        results.append(list);
      } catch {
        if (current !== revision) return;
        feedback.textContent = 'Search is temporarily unavailable. Please try again.';
        const retry = document.createElement('button');
        retry.type = 'button';
        retry.className = 'text-link search-retry';
        retry.textContent = 'Retry search';
        retry.addEventListener('click', () => { input.focus(); refresh(); });
        results.append(retry);
      } finally {
        if (current === revision) results.setAttribute('aria-busy', 'false');
      }
    }, 200);
  };
  input.addEventListener('input', () => { if (!composing) refresh(); });
  input.addEventListener('compositionstart', () => { composing = true; clearTimeout(timer); revision++; });
  input.addEventListener('compositionend', () => { composing = false; refresh(); });
  input.addEventListener('keydown', event => {
    if (event.key === 'ArrowDown' && results.querySelector('a')) {
      event.preventDefault();
      results.querySelector('a').focus();
    }
  });
  results.addEventListener('keydown', event => {
    const links = [...results.querySelectorAll('a')];
    const index = links.indexOf(document.activeElement);
    if (index < 0 || !['ArrowDown', 'ArrowUp'].includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'ArrowUp' && index === 0) input.focus();
    else links[Math.max(0, Math.min(links.length - 1, index + (event.key === 'ArrowDown' ? 1 : -1)))].focus();
  });
  refresh();
  return { refresh, cancel() { clearTimeout(timer); revision++; results.setAttribute('aria-busy', 'false'); } };
}
