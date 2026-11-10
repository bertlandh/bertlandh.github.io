(function () {
  "use strict";
  var script = document.currentScript;
  var enabled = !!script && script.dataset.ltAnalyticsEnabled === "true";
  var measurementId = script ? script.dataset.ltGaId : "";
  enabled = enabled && /^G-[A-Z0-9]+$/.test(measurementId);
  var consent = "denied";
  var loaded = false;
  var formViewed = false;
  var formStarted = false;
  var formObserver = null;
  var panel = document.querySelector("[data-lt-consent-panel]");
  var key = "learntech_optional_analytics";
  var pageLocation = location.origin + location.pathname;
  var pageReferrer = "";
  try { if (document.referrer) pageReferrer = new URL(document.referrer).origin + "/"; } catch (_) { /* Ignore invalid referrers. */ }
  if (enabled) window["ga-disable-" + measurementId] = true;
  function clearAnalyticsCookies() {
    if (typeof document.cookie !== "string") return;
    document.cookie.split(";").forEach(function (cookie) {
      var name = cookie.split("=")[0].trim();
      if (!/^_ga(?:_|$)/.test(name)) return;
      ["", location.hostname, "." + location.hostname].forEach(function (domain) {
        document.cookie = name + "=; Max-Age=0; path=/" + (domain ? "; domain=" + domain : "");
      });
    });
  }
  function readChoice() { try { return localStorage.getItem(key); } catch (_) { return null; } }
  function track(name, parameters) {
    if (!enabled || consent !== "granted" || !loaded) return;
    if (["quote_click", "contact_click", "enquiry_form_view", "enquiry_form_start", "enquiry_submit_attempt", "enquiry_confirmation_view"].indexOf(name) === -1) return;
    var safe = {};
    ["placement", "channel", "enquiry_type"].forEach(function (field) {
      if (parameters && /^[a-z_]{1,40}$/.test(parameters[field] || "")) safe[field] = parameters[field];
    });
    safe.transport_type = "beacon";
    safe.page_location = pageLocation;
    safe.page_referrer = pageReferrer;
    window.gtag("event", name, safe);
  }
  function loadAnalytics() {
    if (!enabled || consent !== "granted" || loaded) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window["ga-disable-" + measurementId] = false;
    window.gtag("consent", "default", {analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied"});
    window.gtag("consent", "update", {analytics_storage: "granted"});
    window.gtag("js", new Date());
    window.gtag("config", measurementId, {send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false, page_location: pageLocation, page_referrer: pageReferrer, ignore_referrer: false});
    window.gtag("event", "page_view", {page_location: pageLocation, page_referrer: pageReferrer, page_title: document.title});
    var tag = document.createElement("script");
    tag.async = true;
    tag.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(measurementId);
    document.head.appendChild(tag);
    var form = document.querySelector("[data-lt-enquiry]");
    if (form && window.IntersectionObserver && !formObserver) {
      formObserver = new window.IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && consent === "granted" && !formViewed) {
            formViewed = true;
            track("enquiry_form_view");
            formObserver.disconnect();
          }
        });
      }, {threshold: 0.1});
      formObserver.observe(form);
    }
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
      else {
        window["ga-disable-" + measurementId] = true;
        if (loaded) window.gtag("consent", "update", {analytics_storage: "denied"});
        if (formObserver) formObserver.disconnect();
        clearAnalyticsCookies();
        location.reload();
      }
      return;
    }
    if (event.target.closest("[data-lt-manage-analytics]") && enabled && panel) { panel.hidden = false; panel.scrollIntoView({block: "center"}); return; }
    var link = event.target.closest("[data-lt-event]");
    if (link) track(link.dataset.ltEvent, {placement: link.dataset.ltPlacement, channel: link.dataset.ltChannel});
    else {
      var contact = event.target.closest("a[href]");
      var href = contact ? contact.getAttribute("href") || "" : "";
      var channel = /^mailto:/i.test(href) ? "email" : /^tel:/i.test(href) ? "phone" : /^https:\/\/(wa\.me|api\.whatsapp\.com)(\/|$)/i.test(href) ? "whatsapp" : "";
      if (channel) track("contact_click", {channel: channel});
    }
  });
  document.addEventListener("focusin", function (event) {
    if (enabled && loaded && consent === "granted" && !formStarted && event.target.closest("[data-lt-enquiry]")) {
      formStarted = true;
      track("enquiry_form_start");
    }
  });
  document.addEventListener("submit", function (event) {
    if (event.target.matches("[data-lt-enquiry]")) track("enquiry_submit_attempt", {enquiry_type: event.target.elements.enquiry_type.value});
  });
  // Deliberately accepts event metadata only, never form fields or free text.
  window.LearnTechEvents = {track: track};
})();
