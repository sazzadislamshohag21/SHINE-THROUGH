import test from 'node:test';
import assert from 'node:assert/strict';
import { PRODUCTS } from '../app.js';
import { orderMessage, orderEmailURL } from '../store-contact.js';

test('order enquiries include selected quantities, item totals and unconfirmed delivery', () => {
  const text = orderMessage([{ id: 'halo-wood-floor-lamp', quantity: 3 }, { id: 'orbit-table-lamp', quantity: 2 }], PRODUCTS);
  assert.match(text, /Halo Wood Floor Lamp/);
  assert.match(text, /Quantity: 3 × ৳ 6,490 = ৳ 19,470/);
  assert.match(text, /Quantity: 2 × ৳ 2,950 = ৳ 5,900/);
  assert.match(text, /Items subtotal: ৳ 25,370/);
  assert.match(text, /Please confirm availability, delivery charges, the final total, and how to pay/);
  assert.equal(orderMessage([{ id: 'unknown', quantity: 3 }, { id: PRODUCTS[0].id, quantity: -1 }], PRODUCTS), '');
});

test('email drafts safely encode the exact order and require a real destination', () => {
  const message = 'Oak & linen\n2 × ৳ 6,490\nName: #Test?';
  const url = new URL(orderEmailURL(message, 'orders@example.com'));
  assert.equal(url.protocol, 'mailto:');
  assert.equal(url.pathname, 'orders@example.com');
  assert.equal(url.searchParams.get('body'), message);
  assert.equal(url.searchParams.get('subject'), 'Order enquiry — SHINE THROUGH');
  for (const email of ['', 'hello@shinethrough.example', 'bad\r\n@example.com']) assert.equal(orderEmailURL(message, email), null);
  assert.equal(orderEmailURL('', 'orders@example.com'), null);
});
