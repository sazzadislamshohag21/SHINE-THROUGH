(() => {
  const faqItems = [...document.querySelectorAll('.invest-faq details')];
  faqItems.forEach(item => item.addEventListener('toggle', () => {
    if (item.open) faqItems.forEach(other => {
      if (other !== item) other.open = false;
    });
  }));
  const amount = document.getElementById('invest-amount');
  const packages = [...document.querySelectorAll('input[name="package"]')];
  const durations = [...document.querySelectorAll('input[name="duration"]')];
  const money = value => `৳${value.toLocaleString('en-US')}`;
  const message = document.getElementById('invest-message');
  const copy = document.getElementById('copy-selection');
  function update() {
    const valid = amount.validity.valid && amount.value !== '';
    amount.setAttribute('aria-invalid', String(!valid));
    document.getElementById('amount-error').textContent = valid ? '' : 'Enter an amount from ৳5,000 to ৳500,000 in ৳1,000 steps.';
    copy.disabled = !valid;
    document.getElementById('copy-status').textContent = 'Copy your selection, then send it to our team on Facebook.';
    if (!valid) {
      document.getElementById('summary-amount').textContent = 'Check amount';
      document.getElementById('summary-package').textContent = '—';
      document.getElementById('summary-profit').textContent = '—';
      document.getElementById('summary-total').textContent = '—';
      document.getElementById('return-formula').textContent = 'Enter a valid amount to calculate your return.';
      message.textContent = 'Enter a valid investment amount to prepare your selection.';
      packages.forEach(radio => { radio.checked = false; });
      return;
    }
    const value = Number(amount.value);
    const selected = packages.find(radio => Number(radio.value) === value);
    packages.forEach(radio => { radio.checked = radio === selected; });
    const name = selected?.dataset.name || 'Custom';
    const duration = durations.find(radio => radio.checked).value;
    const multiplier = { 3: 1, 6: 2, 12: 12, 24: 24 }[duration];
    const profit = value * 0.25 * multiplier;
    const total = value + profit;
    document.getElementById('summary-amount').textContent = money(value);
    document.getElementById('summary-package').textContent = name;
    document.getElementById('summary-duration').textContent = `${duration} months`;
    document.getElementById('summary-profit').textContent = money(profit);
    document.getElementById('summary-total').textContent = money(total);
    document.getElementById('return-formula').textContent = `${money(value)} × 25% × ${multiplier} = ${money(profit)} profit over ${duration} months.`;
    message.textContent = `I’m interested in the ${name} package: ${money(value)} for a proposed ${duration} months. The calculated profit is ${money(profit)}, for a total return of ${money(total)} including my investment. Please share the full investment proposal and terms.`;
  }
  packages.forEach(radio => radio.addEventListener('change', () => { amount.value = radio.value; update(); }));
  durations.forEach(radio => radio.addEventListener('change', update));
  amount.addEventListener('input', update);
  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(message.textContent);
      document.getElementById('copy-status').textContent = 'Copied! Open Facebook and paste your selection into a message to our team.';
    } catch {
      const range = document.createRange();
      range.selectNodeContents(message);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      message.focus();
      document.getElementById('copy-status').textContent = 'Your selection is highlighted. Copy it manually, then send it to our team on Facebook.';
    }
  });
  update();
})();
