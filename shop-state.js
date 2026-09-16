import { CATEGORIES } from './app.js';

export const SHOP_DEFAULTS = { category: 'All lamps', query: '', min: null, max: null, edit: 'all', sort: 'featured' };
const categories = ['All lamps', ...CATEGORIES.map(({ name }) => name)];
const edits = ['all', 'new', 'sale', 'saved'];
const sorts = ['featured', 'price-ascending', 'price-descending', 'name'];

export function readShopState(search = '') {
  const params = new URLSearchParams(search);
  const price = key => {
    const value = params.get(key);
    const number = Number(value);
    return value?.trim() && Number.isFinite(number) && number >= 0 ? Math.min(number, 1000000) : null;
  };
  const state = {
    category: categories.includes(params.get('category')) ? params.get('category') : SHOP_DEFAULTS.category,
    query: (params.get('q') || '').slice(0, 200),
    min: price('min'),
    max: price('max'),
    edit: edits.includes(params.get('edit')) ? params.get('edit') : SHOP_DEFAULTS.edit,
    sort: sorts.includes(params.get('sort')) ? params.get('sort') : SHOP_DEFAULTS.sort,
  };
  if (state.min !== null && state.max !== null && state.min > state.max) [state.min, state.max] = [state.max, state.min];
  return state;
}

export function shopStateQuery(state) {
  const params = new URLSearchParams();
  if (state.category !== SHOP_DEFAULTS.category) params.set('category', state.category);
  if (state.query.trim()) params.set('q', state.query.trim());
  if (state.min !== null) params.set('min', state.min);
  if (state.max !== null) params.set('max', state.max);
  if (state.edit !== SHOP_DEFAULTS.edit) params.set('edit', state.edit);
  if (state.sort !== SHOP_DEFAULTS.sort) params.set('sort', state.sort);
  return params.toString();
}

export function getShopProducts(products, state = SHOP_DEFAULTS, saved = new Set()) {
  const terms = state.query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const result = products.filter(product => {
    if (state.category !== 'All lamps' && product.category !== state.category) return false;
    if (product.price === null && (state.min !== null || state.max !== null)) return false;
    if (state.min !== null && product.price < state.min) return false;
    if (state.max !== null && product.price > state.max) return false;
    if (state.edit === 'new' && product.badge !== 'New') return false;
    if (state.edit === 'sale' && !(product.compareAt > product.price)) return false;
    if (state.edit === 'saved' && !saved.has(product.id)) return false;
    const text = [product.name, product.category, product.tone, product.description, ...product.specs].join(' ').toLowerCase();
    return terms.every(term => text.includes(term));
  });
  if (state.sort === 'price-ascending') result.sort((a, b) => (a.price === null ? (b.price === null ? 0 : 1) : b.price === null ? -1 : a.price - b.price));
  if (state.sort === 'price-descending') result.sort((a, b) => (a.price === null ? (b.price === null ? 0 : 1) : b.price === null ? -1 : b.price - a.price));
  if (state.sort === 'name') result.sort((a, b) => a.name.localeCompare(b.name));
  return result;
}
