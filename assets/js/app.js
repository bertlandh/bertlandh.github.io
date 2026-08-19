(function () {
  "use strict";

  var toggle = document.querySelector("[data-nav-toggle]");
  var navigation = document.querySelector("[data-site-nav]");

  if (!toggle || !navigation) return;

  function setNavigation(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.classList.toggle("is-active", open);
    navigation.classList.toggle("is-open", open);
  }

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
