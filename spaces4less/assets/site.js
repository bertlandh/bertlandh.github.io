'use strict';
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
const serviceSelect = document.querySelector('#enquiry-service');
if (serviceSelect) {
  const presets = {'property-management': 0, 'maintenance': 1, 'painting-decorating': 2, 'moving-services': 3};
  const chosen = new URLSearchParams(location.search).get('service');
  if (Object.hasOwn(presets, chosen)) serviceSelect.selectedIndex = presets[chosen];
}
function closeMenu() {
  navigation?.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
}
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
navigation?.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.querySelector('#enquiry-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const message = `Hello Daniel, my name is ${data.get('name').trim()}.\n\nService: ${data.get('service')}\nArea / postcode: ${data.get('area').trim()}\n\n${data.get('message').trim()}`;
  const url = `https://wa.me/447474433802?text=${encodeURIComponent(message)}`;
  const status = document.querySelector('#enquiry-status');
  status.replaceChildren();
  const link = document.createElement('a');
  link.href = url;
  link.className = 'text-link';
  link.textContent = 'Open your WhatsApp draft';
  status.append(link);
  link.focus();
});
document.querySelector('.copy-contact')?.addEventListener('click', async () => {
  const status = document.querySelector('.copy-status');
  const text = 'Daniel Murray — Spaces4Less\nDirector / Agent\n+44 7474 433802\nSpaces4lessltd@gmail.com\nDmurray486@googlemail.com\nhttps://spaces4less.com/';
  try {
    await navigator.clipboard.writeText(text);
    status.textContent = 'Contact details copied.';
  } catch {
    status.textContent = 'Copy is unavailable here. Use Save Daniel’s contact to download his contact card.';
  }
});
