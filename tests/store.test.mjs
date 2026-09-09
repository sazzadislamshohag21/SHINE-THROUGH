import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PRODUCTS,
  addToCart,
  cartItemCount,
  cartTotal,
  filterProducts,
  formatBDT,
  searchProducts,
  updateCartQuantity,
} from '../app.js';

test('catalog includes floor lamps and supporting lamp categories', () => {
  const categories = new Set(PRODUCTS.map((product) => product.category));

  assert.ok(categories.has('Floor lamps'));
  assert.ok(categories.has('Table lamps'));
  assert.ok(categories.has('Pendant lights'));
  assert.ok(filterProducts(PRODUCTS, 'Floor lamps').length >= 4);
});

test('category filtering returns only products from the selected category', () => {
  const floorLamps = filterProducts(PRODUCTS, 'Floor lamps');

  assert.ok(floorLamps.length > 0);
  assert.ok(floorLamps.every((product) => product.category === 'Floor lamps'));
});

test('search matches product names and descriptions case-insensitively', () => {
  const results = searchProducts(PRODUCTS, 'reading');

  assert.ok(results.length > 0);
  assert.ok(results.every((product) => /reading/i.test(`${product.name} ${product.description}`)));
});

test('BDT formatter produces compact taka prices', () => {
  assert.equal(formatBDT(3850), '৳ 3,850');
  assert.equal(formatBDT(0), '৳ 0');
});

test('cart helpers add products, update quantity, and calculate totals', () => {
  const firstProduct = PRODUCTS[0];
  const secondProduct = PRODUCTS[1];
  let cart = [];

  cart = addToCart(cart, firstProduct.id);
  cart = addToCart(cart, firstProduct.id);
  cart = addToCart(cart, secondProduct.id);

  assert.equal(cartItemCount(cart), 3);
  assert.equal(cart.find((item) => item.id === firstProduct.id).quantity, 2);
  assert.equal(cartTotal(cart, PRODUCTS), firstProduct.price * 2 + secondProduct.price);

  cart = updateCartQuantity(cart, firstProduct.id, 1);
  assert.equal(cartItemCount(cart), 2);
  cart = updateCartQuantity(cart, secondProduct.id, 0);
  assert.equal(cart.length, 1);
});
