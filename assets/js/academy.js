document.querySelectorAll('[data-lesson-search]').forEach(function (input) {
  input.addEventListener('input', function () {
    var query = input.value.trim().toLowerCase();
    var visible = 0;
    document.querySelectorAll('[data-lesson-card]').forEach(function (card) {
      card.hidden = !card.dataset.search.includes(query);
      if (!card.hidden) visible++;
    });
    var empty = document.querySelector('[data-search-empty]');
    if (empty) empty.hidden = visible !== 0;
  });
});
