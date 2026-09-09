import test from 'node:test';
import assert from 'node:assert/strict';
import { PRODUCTS } from '../app.js';
import { getShopProducts, readShopState, shopStateQuery, SHOP_DEFAULTS } from '../shop-state.js';

test('shop combines category, budget, and sale filters with inclusive price bounds', () => {
  const state = { ...SHOP_DEFAULTS, category: 'Floor lamps', min: 3890, max: 6490, edit: 'sale' };
  assert.deepEqual(getShopProducts(PRODUCTS, state).map(p => p.id), ['halo-wood-floor-lamp', 'corner-glow-smart-lamp']);
  assert.equal(getShopProducts(PRODUCTS, { ...state, min: 0, max: 100 }).length, 0);
});

test('shop matches search words across different product attributes', () => {
  const results = getShopProducts(PRODUCTS, { ...SHOP_DEFAULTS, query: '  oak FLOOR  ' });
  assert.deepEqual(results.map(p => p.id), ['halo-wood-floor-lamp']);
});

test('saved and new edits intersect and sorting does not mutate featured order', () => {
  const original = PRODUCTS.map(p => p.id);
  const saved = new Set(['orbit-table-lamp', 'halo-wood-floor-lamp']);
  assert.deepEqual(getShopProducts(PRODUCTS, { ...SHOP_DEFAULTS, edit: 'saved', category: 'Table lamps' }, saved).map(p => p.id), ['orbit-table-lamp']);
  assert.ok(getShopProducts(PRODUCTS, { ...SHOP_DEFAULTS, edit: 'new' }).every(p => p.badge === 'New'));
  const sorted = getShopProducts(PRODUCTS, { ...SHOP_DEFAULTS, sort: 'price-ascending' });
  assert.equal(sorted[0].price, 2780);
  assert.equal(sorted.at(-1).price, 8970);
  assert.deepEqual(getShopProducts(PRODUCTS).map(p => p.id), original);
});

test('URLs round-trip filters and safely normalize malformed input', () => {
  const state = { category: 'Table lamps', query: 'wood & linen', min: 0, max: 7000, edit: 'new', sort: 'price-descending' };
  assert.deepEqual(readShopState(shopStateQuery(state)), state);
  assert.deepEqual(readShopState('?category=unknown&min=-2&max=NaN&edit=invalid&sort=bad'), SHOP_DEFAULTS);
  assert.deepEqual(readShopState('?min=&max='), SHOP_DEFAULTS);
  assert.equal(readShopState('?min=9000&max=2000').min, 2000);
  assert.equal(readShopState('?min=Infinity').min, null);
  assert.equal(shopStateQuery(SHOP_DEFAULTS), '');
});
