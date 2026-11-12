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
  // Only this named, public demo context can prefill the enquiry. Never copy
  // arbitrary query text, personal contact details or consent into the form.
  if (params.get("review") === "oasysoft") {
    var directions = {corporate: "Modern Corporate", showcase: "Product Showcase", editorial: "Jamaican Business", undecided: "Not sure yet / discuss the options"};
    var direction = Object.prototype.hasOwnProperty.call(directions, params.get("design")) ? directions[params.get("design")] : directions.undecided;
    var message = "I have reviewed the OASys website redesign concepts. My preferred direction is: " + direction + ". I would like to discuss the scope, visuals, timeline and quotation for redesigning http://www.oasysoft.com/.";
    interest.value = "improve";
    function fillEmpty(name, value) {
      var field = form.elements.namedItem(name);
      if (field && !field.value.trim()) field.value = value;
    }
    fillEmpty("business", "OASys");
    fillEmpty("website", "http://www.oasysoft.com/");
    fillEmpty("message", message);
    form.elements._subject.value = "OASys website redesign enquiry";
    document.querySelectorAll('[data-lt-channel="whatsapp"]').forEach(function (link) {
      try {
        var destination = new URL(link.href);
        if (destination.protocol === "https:" && destination.hostname === "wa.me") {
          destination.searchParams.set("text", "Hello LearnTech, " + message);
          link.href = destination.href;
        }
      } catch (_) { /* Preserve an existing link if its URL is invalid. */ }
    });
  }
  updateProduct();
  interest.addEventListener("change", updateProduct);
  document.querySelectorAll("[data-lt-enquiry-choice]").forEach(function (link) {
    link.addEventListener("click", function () {
      if (allowed.indexOf(link.dataset.ltEnquiryChoice) !== -1) { interest.value = link.dataset.ltEnquiryChoice; updateProduct(); }
    });
  });
})();
