(() => {
  'use strict';
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#navigation');
  const mobile = window.matchMedia('(max-width: 760px)');
  document.body.classList.add('mobile-nav-ready');
  function syncMenu() {
    const open = mobile.matches && toggle.getAttribute('aria-expanded') === 'true';
    toggle.hidden = !mobile.matches;
    nav.hidden = mobile.matches && !open;
    toggle.textContent = open ? 'Close menu' : 'Menu';
    document.body.style.setProperty('--mobile-toolbar-height', `${document.querySelector('.mobile-toolbar').getBoundingClientRect().height}px`);
    document.body.classList.toggle('mobile-menu-open', open);
    document.body.style.setProperty('--menu-panel-height', open ? `${nav.getBoundingClientRect().height}px` : '0px');
  }
  toggle.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', String(toggle.getAttribute('aria-expanded') !== 'true'));
    syncMenu();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobile.matches && !nav.hidden) {
      toggle.setAttribute('aria-expanded', 'false'); syncMenu(); toggle.focus();
    }
  });
  document.addEventListener('click', e => {
    if (mobile.matches && !nav.hidden && !nav.contains(e.target) && !toggle.contains(e.target)) {
      toggle.setAttribute('aria-expanded', 'false'); syncMenu();
    }
  });
  nav.addEventListener('click', e => {
    if (mobile.matches && e.target.closest('a')) {
      toggle.setAttribute('aria-expanded', 'false'); syncMenu();
    }
  });
  window.addEventListener('resize', syncMenu);
  mobile.addEventListener('change', syncMenu); syncMenu();
  const catalogue = document.querySelector('[data-catalogue]');
  if (catalogue) {
    const form = catalogue.querySelector('form');
    const search = form.elements.q;
    const category = form.elements.category;
    const availability = form.elements.availability;
    const params = new URLSearchParams(location.search);
    search.value = (params.get('q') || '').slice(0, 100);
    for (const input of [category, availability]) {
      const value = params.get(input.name);
      if ([...input.options].some(option => option.value === value)) input.value = value;
    }
    const items = [...catalogue.querySelectorAll('[data-listing]')];
    function filter(updateUrl = true) {
      let count = 0;
      const query = search.value.trim().toLocaleLowerCase();
      for (const item of items) {
        const visible = item.dataset.search.toLocaleLowerCase().includes(query)
          && (category.value === 'all' || category.value === item.dataset.category)
          && (availability.value === 'all' || availability.value === item.dataset.status);
        item.hidden = !visible;
        if (visible) count++;
      }
      catalogue.querySelector('[data-count]').textContent = `${count} ${count === 1 ? 'listing' : 'listings'}`;
      catalogue.querySelector('[data-empty]').hidden = count > 0;
      if (updateUrl) {
        const url = new URL(location.href);
        for (const input of [search, category, availability]) {
          if (input.value && input.value !== 'all') url.searchParams.set(input.name, input.value);
          else url.searchParams.delete(input.name);
        }
        history.replaceState(null, '', url);
      }
    }
    form.addEventListener('submit', e => { e.preventDefault(); filter(); });
    form.addEventListener('input', () => filter());
    form.addEventListener('change', () => filter());
    form.addEventListener('reset', () => {
      search.value = ''; category.value = 'all'; availability.value = 'all';
      requestAnimationFrame(() => { search.value = ''; category.value = 'all'; availability.value = 'all'; filter(); });
    });
    window.addEventListener('popstate', () => location.reload());
    filter(false);
  }
  // Integration hook only: no tracker, cookie or storage is created here.
  // A future consent-approved integration may listen for this event.
  document.querySelectorAll('[data-enquiry]').forEach(link => link.addEventListener('click', () => {
    document.dispatchEvent(new CustomEvent('prettipetz:enquiry-click', { detail: { page: location.pathname } }));
  }));
})();
