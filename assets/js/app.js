(function () {
  "use strict";

  var toggle = document.querySelector("[data-nav-toggle]");
  var navigation = document.querySelector("[data-site-nav]");
  var header = document.querySelector("[data-site-header]");
  var submenuToggles = navigation ? navigation.querySelectorAll("[data-submenu-toggle]") : [];

  if (!toggle || !navigation) return;

  function setNavigation(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.classList.toggle("is-active", open);
    navigation.classList.toggle("is-open", open);
    document.body.classList.toggle("site-nav-open", open && window.matchMedia("(max-width: 900px)").matches);

    if (open && header) {
      navigation.style.setProperty("--mobile-header-height", header.offsetHeight + "px");
    }

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
  });
})();
