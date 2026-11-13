(function () {
  "use strict";
  var select = document.querySelector("#design");
  if (select) {
    var design = new URLSearchParams(location.search).get("design");
    if (["heritage", "bold", "community", "other", "undecided"].includes(design)) select.value = design;
  }
  var form = document.querySelector("#review-form");
  if (form) form.addEventListener("submit", function (event) {
    event.preventDefault();
    location.href = form.action + "?" + new URLSearchParams(new FormData(form)).toString() + "#enquiry";
  });
})();
(function () {
  "use strict";
  document.querySelectorAll("[data-slideshow]").forEach(function (root) {
    var slides = Array.from(root.querySelectorAll("[data-slide]"));
    if (slides.length < 2) return;
    var index = 0, timer = null, paused = false, hovering = false, focused = false;
    var motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    var pause = root.querySelector("[data-pause]");
    var counter = root.querySelector("[data-counter]");
    function show(next, manual) {
      index = (next + slides.length) % slides.length;
      slides.forEach(function (slide, i) { slide.hidden = i !== index; });
      counter.textContent = (index + 1) + " / " + slides.length;
      if (manual) root.querySelector("[data-announcement]").textContent = "Photo " + (index + 1) + " of " + slides.length;
    }
    function schedule() {
      window.clearInterval(timer); timer = null;
      pause.textContent = motion.matches ? "Auto-play off" : paused ? "Play slideshow" : "Pause slideshow";
      pause.disabled = motion.matches;
      if (!paused && !motion.matches && !hovering && !focused && !document.hidden) timer = window.setInterval(function () { show(index + 1, false); }, 6500);
    }
    root.querySelector("[data-next]").addEventListener("click", function () { show(index + 1, true); schedule(); });
    root.querySelector("[data-previous]").addEventListener("click", function () { show(index - 1, true); schedule(); });
    pause.addEventListener("click", function () {
      if (motion.matches) { paused = true; show(index + 1, true); } else paused = !paused;
      schedule();
    });
    root.addEventListener("mouseenter", function () { hovering = true; schedule(); });
    root.addEventListener("mouseleave", function () { hovering = false; schedule(); });
    root.addEventListener("focusin", function () { focused = true; schedule(); });
    root.addEventListener("focusout", function (event) { focused = root.contains(event.relatedTarget); schedule(); });
    document.addEventListener("visibilitychange", schedule);
    motion.addEventListener("change", schedule);
    schedule();
  });
})();

(function () {
  "use strict";
  var header = document.querySelector("[data-alumni-header]");
  if (!header) return;
  var menu = header.querySelector(".menu"), nav = header.querySelector("#navigation");
  var groups = Array.from(header.querySelectorAll(".nav-group"));
  var hover = window.matchMedia("(hover: hover) and (min-width: 701px)");
  function closeGroups(except) {
    groups.forEach(function (group) {
      if (group === except) return;
      window.clearTimeout(group.hoverTimer);
      group.querySelector(".nav-trigger").setAttribute("aria-expanded", "false");
      group.querySelector(".nav-panel").hidden = true;
    });
  }
  function openGroup(group) {
    closeGroups(group);
    group.querySelector(".nav-trigger").setAttribute("aria-expanded", "true");
    group.querySelector(".nav-panel").hidden = false;
  }
  function closeMenu() {
    closeGroups(); nav.classList.remove("open"); menu.setAttribute("aria-expanded", "false");
  }
  menu.addEventListener("click", function () {
    var open = menu.getAttribute("aria-expanded") !== "true";
    closeGroups(); nav.classList.toggle("open", open); menu.setAttribute("aria-expanded", String(open));
  });
  groups.forEach(function (group) {
    var trigger = group.querySelector(".nav-trigger"), panel = group.querySelector(".nav-panel");
    trigger.addEventListener("click", function () {
      window.clearTimeout(group.hoverTimer);
      if (trigger.getAttribute("aria-expanded") === "true") closeGroups(); else openGroup(group);
    });
    trigger.addEventListener("keydown", function (event) {
      if (event.key === "ArrowDown") { event.preventDefault(); openGroup(group); panel.querySelector("a").focus(); }
    });
    group.addEventListener("mouseenter", function () {
      if (hover.matches) group.hoverTimer = window.setTimeout(function () { openGroup(group); }, 140);
    });
    group.addEventListener("mouseleave", function () {
      window.clearTimeout(group.hoverTimer);
      if (hover.matches && !group.contains(document.activeElement)) closeGroups();
    });
    group.addEventListener("focusout", function (event) {
      if (!group.contains(event.relatedTarget)) closeGroups();
    });
    group.addEventListener("keydown", function (event) {
      if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); closeGroups(); trigger.focus(); }
    });
  });
  nav.querySelectorAll("a").forEach(function (link) { link.addEventListener("click", closeMenu); });
  document.addEventListener("click", function (event) { if (!header.contains(event.target)) closeMenu(); });
  header.addEventListener("keydown", function (event) {
    if (event.key === "Escape") { closeMenu(); menu.focus(); }
  });
  hover.addEventListener("change", closeMenu);
})();
