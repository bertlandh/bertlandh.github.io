(function () {
  "use strict";

  var toggle = document.querySelector("[data-nav-toggle]");
  var navigation = document.querySelector("[data-site-nav]");
  var toggleLabel = toggle ? toggle.querySelector("[data-nav-toggle-label]") : null;
  var submenuToggles = navigation ? navigation.querySelectorAll("[data-submenu-toggle]") : [];
  var scrollOrigin = window.scrollY;
  var scrollTicking = false;

  if (!toggle || !navigation) return;

  function setToolbarHidden(hidden) {
    var mobile = window.matchMedia("(max-width: 900px)").matches;
    var menuOpen = navigation.classList.contains("is-open");
    toggle.classList.toggle("is-hidden-by-scroll", mobile && hidden && !menuOpen);
  }

  function setNavigation(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.classList.toggle("is-active", open);
    navigation.classList.toggle("is-open", open);
    if (toggleLabel) toggleLabel.textContent = open ? "Close" : "Menu";
    if (open) setToolbarHidden(false);
    if (!open) {
      submenuToggles.forEach(function (submenuToggle) {
        submenuToggle.setAttribute("aria-expanded", "false");
        submenuToggle.closest(".site-nav__item--dropdown").classList.remove("is-submenu-open");
      });
    }
  }

  submenuToggles.forEach(function (submenuToggle) {
    submenuToggle.addEventListener("click", function () {
      var item = submenuToggle.closest(".site-nav__item--dropdown");
      var open = submenuToggle.getAttribute("aria-expanded") !== "true";
      submenuToggle.setAttribute("aria-expanded", String(open));
      item.classList.toggle("is-submenu-open", open);
    });
  });

  toggle.addEventListener("click", function () {
    setNavigation(toggle.getAttribute("aria-expanded") !== "true");
  });

  navigation.addEventListener("click", function (event) {
    if (event.target.closest("a") && window.matchMedia("(max-width: 900px)").matches) setNavigation(false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      setNavigation(false);
      toggle.focus();
    }
  });

  window.addEventListener("resize", function () {
    if (!window.matchMedia("(max-width: 900px)").matches) setNavigation(false);
    setToolbarHidden(false);
    scrollOrigin = window.scrollY;
  });

  window.addEventListener("scroll", function () {
    if (scrollTicking) return;

    scrollTicking = true;
    window.requestAnimationFrame(function () {
      var currentScroll = Math.max(0, window.scrollY);
      var distance = currentScroll - scrollOrigin;

      if (currentScroll <= 24) {
        setToolbarHidden(false);
        scrollOrigin = currentScroll;
      } else if (Math.abs(distance) >= 12) {
        setToolbarHidden(distance > 0);
        scrollOrigin = currentScroll;
      }

      scrollTicking = false;
    });
  }, { passive: true });
})();
