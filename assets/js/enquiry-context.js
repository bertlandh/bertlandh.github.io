(function () {
  "use strict";
  var form = document.querySelector("[data-lt-enquiry]");
  if (!form) return;
  var interest = form.elements.enquiry_type;
  var product = form.elements.requested_product;
  var productField = form.querySelector("[data-lt-product-field]");
  var allowed = ["new", "improve", "review", "seo", "reporting", "software", "consultancy", "product", "unsure"];
  function updateProduct() {
    var relevant = interest.value === "product";
    productField.hidden = !relevant;
    product.disabled = !relevant;
    product.required = relevant;
    if (!relevant) product.value = "";
  }
  var params = new URLSearchParams(location.search);
  if (allowed.indexOf(params.get("interest")) !== -1) interest.value = params.get("interest");
  if (interest.value === "product" && ["custodia", "check-in", "other"].indexOf(params.get("product")) !== -1) product.value = params.get("product");
  updateProduct();
  interest.addEventListener("change", updateProduct);
  document.querySelectorAll("[data-lt-enquiry-choice]").forEach(function (link) {
    link.addEventListener("click", function () {
      if (allowed.indexOf(link.dataset.ltEnquiryChoice) !== -1) { interest.value = link.dataset.ltEnquiryChoice; updateProduct(); }
    });
  });
})();
