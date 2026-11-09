(function () {
  "use strict";
  var script = document.currentScript;
  var enabled = !!script && script.dataset.ltAnalyticsEnabled === "true";
  var measurementId = script ? script.dataset.ltGaId : "";
  enabled = enabled && /^G-[A-Z0-9]+$/.test(measurementId);
  var consent = "denied";
  var loaded = false;
  var panel = document.querySelector("[data-lt-consent-panel]");
  var key = "learntech_optional_analytics";
  function readChoice() { try { return localStorage.getItem(key); } catch (_) { return null; } }
  function track(name, parameters) {
    if (!enabled || consent !== "granted" || !loaded) return;
    if (["quote_click", "contact_click", "enquiry_submit_attempt", "enquiry_confirmation_view"].indexOf(name) === -1) return;
    var safe = {};
    ["placement", "channel", "enquiry_type"].forEach(function (field) {
      if (parameters && /^[a-z_]{1,40}$/.test(parameters[field] || "")) safe[field] = parameters[field];
    });
    window.gtag("event", name, safe);
  }
  function loadAnalytics() {
    if (!enabled || consent !== "granted" || loaded) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", measurementId, {send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false, ignore_referrer: true});
    window.gtag("event", "page_view", {page_location: location.origin + location.pathname, page_title: document.title});
    var tag = document.createElement("script");
    tag.async = true;
    tag.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(measurementId);
    document.head.appendChild(tag);
    if (location.pathname === "/enquiry/thanks/") track("enquiry_confirmation_view");
  }
  if (enabled) {
    consent = readChoice();
    if (consent !== "granted" && consent !== "denied") consent = null;
    if (panel) panel.hidden = !!consent;
    loadAnalytics();
    document.querySelectorAll("[data-lt-manage-analytics]").forEach(function (button) { button.hidden = false; });
  }
  document.addEventListener("click", function (event) {
    var choice = event.target.closest("[data-lt-consent]");
    if (choice && enabled) {
      consent = choice.dataset.ltConsent;
      if (consent !== "granted" && consent !== "denied") return;
      try { localStorage.setItem(key, consent); } catch (_) { /* Choice remains valid for this page. */ }
      if (panel) panel.hidden = true;
      if (consent === "granted") loadAnalytics();
      else location.reload();
      return;
    }
    if (event.target.closest("[data-lt-manage-analytics]") && enabled && panel) { panel.hidden = false; panel.scrollIntoView({block: "center"}); return; }
    var link = event.target.closest("[data-lt-event]");
    if (link) track(link.dataset.ltEvent, {placement: link.dataset.ltPlacement, channel: link.dataset.ltChannel});
  });
  document.addEventListener("submit", function (event) {
    if (event.target.matches("[data-lt-enquiry]")) track("enquiry_submit_attempt", {enquiry_type: event.target.elements.enquiry_type.value});
  });
  // Deliberately accepts event metadata only, never form fields or free text.
  window.LearnTechEvents = {track: track};
})();
