// Set the store's real email here; never send orders to a placeholder address.
export const STORE_CONTACT = {
  email: '',
  facebook: 'https://www.facebook.com/shinethrough26/',
};
export const ORDER_CHANNELS = STORE_CONTACT.email ? 'email or Facebook' : 'Facebook';

const money = value => `৳ ${new Intl.NumberFormat('en-BD', { maximumFractionDigits: 0 }).format(value)}`;

export function orderMessage(cart, products) {
  const items = cart.flatMap(item => {
    const product = products.find(p => p.id === item.id);
    const quantity = Math.floor(Number(item.quantity));
    return product && Number.isFinite(quantity) && quantity > 0 ? [{ ...product, quantity }] : [];
  });
  if (!items.length) return '';
  return [
    'Hello SHINE THROUGH, I would like to enquire about this order:',
    '',
    ...items.map((p, index) => `${index + 1}. ${p.name}\n   ${p.tone}\n   Quantity: ${p.quantity} × ${money(p.price)} = ${money(p.price * p.quantity)}`),
    '',
    `Items subtotal: ${money(items.reduce((sum, p) => sum + p.price * p.quantity, 0))}`,
    'Please confirm availability, delivery charges, the final total, and how to pay.',
    '',
    'Name:',
    'Phone:',
    'Delivery area:',
  ].join('\n');
}

export function orderEmailURL(message, email = STORE_CONTACT.email) {
  if (!message || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || /\.example$/i.test(email)) return null;
  return `mailto:${email}?subject=${encodeURIComponent('Order enquiry — SHINE THROUGH')}&body=${encodeURIComponent(message)}`;
}

export function contactPanelHTML() {
  return `<section class="cart-contact" data-order-contact hidden aria-labelledby="order-contact-title">
    <button class="text-link order-back" type="button" data-order-back><span aria-hidden="true">←</span> Back to your bag</button>
    <p class="eyebrow">A little more personal</p><h3 id="order-contact-title">Let’s bring your<br /><em>light home.</em></h3>
    <p class="order-intro">Send your selection by ${ORDER_CHANNELS}. We’ll confirm availability, delivery charges, and payment details with you.</p>
    <div class="order-message-heading"><label for="order-message">Your order enquiry</label><button type="button" data-copy-order>Copy details <span aria-hidden="true">↗</span></button></div>
    <textarea id="order-message" data-order-message readonly rows="7" aria-describedby="order-message-help"></textarea>
    <p id="order-message-help" class="order-hint">Add your name, phone number, and delivery area when you send your message.</p>
    <div class="order-contact-actions"><a class="button button-dark button-full" data-order-email${STORE_CONTACT.email ? '' : ' hidden'}>Enquire by email <span aria-hidden="true">↗</span></a><a class="button button-outline button-full" href="${STORE_CONTACT.facebook}" target="_blank" rel="noopener noreferrer" data-order-facebook>Open Facebook <span aria-hidden="true">↗</span></a></div>
    <p class="order-hint">For Facebook, copy the details above, open our page, then paste them into a message.</p>
    <p class="order-status" data-order-status role="status" aria-live="polite"></p>
    <p class="order-confirmation-note">Your order is confirmed after our team replies. Your bag stays saved while you get in touch.</p>
  </section>`;
}
