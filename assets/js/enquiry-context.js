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
  // arbitrary message text, personal contact details or consent into the form.
  // One bounded, validated reference website may be included as plain text.
  if (params.get("review") === "oasysoft") {
    var directions = {corporate: "Modern Corporate", showcase: "Product Showcase", editorial: "Jamaican Business", undecided: "Not sure yet / discuss the options", other: "Another direction / my own reference"};
    var direction = Object.prototype.hasOwnProperty.call(directions, params.get("design")) ? directions[params.get("design")] : directions.undecided;
    var message = "I have reviewed the OASys website redesign concepts. My preferred direction is: " + direction + ". I would like to discuss the scope, visuals, timeline and quotation for redesigning http://www.oasysoft.com/.";
    var reference = (params.get("reference") || "").trim();
    if (reference && reference.length <= 500 && !/\s/.test(reference)) {
      try {
        var referenceUrl = new URL(/^https?:\/\//i.test(reference) ? reference : /^[a-z][a-z0-9+.-]*:/i.test(reference) ? reference : "https://" + reference);
        if (["https:", "http:"].indexOf(referenceUrl.protocol) !== -1 && referenceUrl.hostname && !referenceUrl.username && !referenceUrl.password && referenceUrl.href.length <= 500) {
          message += "\n\nReference website I like: " + referenceUrl.href;
        }
      } catch (_) { /* Invalid references are not copied into the enquiry. */ }
    }
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
  // Attica is a separate, bounded review context. Personal details and consent
  // remain blank, and existing user text is preserved.
  if (params.get("review") === "attica") {
    var atticaDirections = {heritage: "The Heritage", bold: "Black & Red", community: "The Connection", other: "A different direction", undecided: "Discuss the options"};
    var atticaDirection = Object.prototype.hasOwnProperty.call(atticaDirections, params.get("design")) ? atticaDirections[params.get("design")] : atticaDirections.undecided;
    var atticaMessage = "I have reviewed the Attica alumni website concepts for Block D, Taylor Hall, UWI Mona. My preferred direction is: " + atticaDirection + ". I would like to discuss the design, content and next steps.";
    var atticaReference = (params.get("reference") || "").trim();
    if (atticaReference && atticaReference.length <= 500 && !/\s/.test(atticaReference)) {
      try {
        var atticaUrl = new URL(atticaReference);
        if (["https:", "http:"].indexOf(atticaUrl.protocol) !== -1 && atticaUrl.hostname && !atticaUrl.username && !atticaUrl.password && atticaUrl.href.length <= 500) atticaMessage += "\n\nReference website I like: " + atticaUrl.href;
      } catch (_) { /* Invalid references stay out of the enquiry. */ }
    }
    interest.value = "new";
    [ ["business", "Fraternity of Attica alumni"], ["message", atticaMessage] ].forEach(function (entry) {
      var field = form.elements.namedItem(entry[0]);
      if (field && !field.value.trim()) field.value = entry[1];
    });
    form.elements._subject.value = "Attica alumni website enquiry";
    document.querySelectorAll('[data-lt-channel="whatsapp"]').forEach(function (link) {
      try {
        var atticaDestination = new URL(link.href);
        if (atticaDestination.protocol === "https:" && atticaDestination.hostname === "wa.me") {
          atticaDestination.searchParams.set("text", "Hello LearnTech, " + atticaMessage);
          link.href = atticaDestination.href;
        }
      } catch (_) { /* Preserve invalid existing links. */ }
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
