(function(){"use strict";var menu=document.querySelector('.menu'),nav=document.querySelector('#navigation');if(menu&&nav){menu.addEventListener('click',function(){var open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){menu.setAttribute('aria-expanded','false');nav.classList.remove('open');});});}var select=document.querySelector('#design');if(select){var design=new URLSearchParams(location.search).get('design');if(['heritage','bold','community','other','undecided'].includes(design))select.value=design;}var form=document.querySelector('#review-form');if(form)form.addEventListener('submit',function(e){e.preventDefault();var p=new URLSearchParams(new FormData(form));location.href=form.action+'?'+p.toString()+'#enquiry';});})();
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
