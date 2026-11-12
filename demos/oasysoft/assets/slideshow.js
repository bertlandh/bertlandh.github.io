(function () {
  'use strict';
  document.querySelectorAll('[data-oasys-slideshow]').forEach(function (root) {
    var slides = Array.from(root.querySelectorAll('[data-oasys-slide]'));
    var controls = root.querySelector('.slideshow-controls');
    var toggle = root.querySelector('[data-oasys-pause]');
    var dots = Array.from(root.querySelectorAll('[data-oasys-go]'));
    var status = root.querySelector('[data-oasys-status]');
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    var index = 0, timer = null, userPaused = reduced.matches;
    var holds = {hover: false, focus: false, offscreen: false};
    var videos = Array.from(root.querySelectorAll('video'));
    videos.forEach(function (video) { video.controls = false; });
    controls.hidden = false;
    function sync() {
      window.clearTimeout(timer);
      var running = !userPaused && !holds.hover && !holds.focus && !holds.offscreen && !document.hidden;
      root.dataset.playing = String(running);
      toggle.textContent = userPaused ? 'Play slideshow' : 'Pause slideshow';
      toggle.setAttribute('aria-label', userPaused ? 'Play slideshow' : 'Pause slideshow');
      status.setAttribute('aria-live', running ? 'off' : 'polite');
      videos.forEach(function (video) {
        if (running && slides[index].contains(video)) {
          var result = video.play();
          if (result && result.catch) result.catch(function () {
            if (slides[index].contains(video) && root.dataset.playing === 'true') { userPaused = true; sync(); }
          });
        } else video.pause();
      });
      if (running) timer = window.setTimeout(function () { show(index + 1); }, 8000);
    }
    function show(next) {
      index = (next + slides.length) % slides.length;
      slides.forEach(function (slide, i) { slide.hidden = i !== index; });
      dots.forEach(function (dot, i) { dot.setAttribute('aria-pressed', String(i === index)); });
      status.textContent = 'Slide ' + (index + 1) + ' of ' + slides.length;
      sync();
    }
    root.querySelector('[data-oasys-prev]').addEventListener('click', function () { show(index - 1); });
    root.querySelector('[data-oasys-next]').addEventListener('click', function () { show(index + 1); });
    dots.forEach(function (dot, i) { dot.addEventListener('click', function () { show(i); }); });
    toggle.addEventListener('click', function () {
      userPaused = !userPaused;
      if (!userPaused) { holds.focus = false; holds.hover = false; }
      sync();
    });
    root.addEventListener('mouseenter', function () { holds.hover = true; sync(); });
    root.addEventListener('mouseleave', function () { holds.hover = false; sync(); });
    root.addEventListener('focusin', function () { holds.focus = true; sync(); });
    root.addEventListener('focusout', function (event) { if (!root.contains(event.relatedTarget)) { holds.focus = false; sync(); } });
    document.addEventListener('visibilitychange', sync);
    reduced.addEventListener('change', function (event) { if (event.matches) userPaused = true; sync(); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) { holds.offscreen = !entries[0].isIntersecting; sync(); }, {threshold: 0.1}).observe(root);
    }
    show(0);
  });
})();
