# LearnTech business tools

The public Jekyll site serves `/tools/`, `/tools/invoice-quotation/` and `/tools/website-health/`. Discovery links are on the homepage, Resources submenu, Resources page and footer. The report return page is noindex and excluded from the sitemap.

## Documents

`assets/js/invoice-tool.js` is browser-only. Blank sender/customer details; no real sample records. Integer-cent line amounts, configurable tax and discount, JMD/USD/CAD/GBP/EUR, invoices and quotations, quotation-to-invoice conversion, print/PDF, text report and explicit local save. Saved documents use `learntech_documents_v1` in localStorage, capped at 200 records. JSON backup import is limited to 1 MB and validated. Browser cleanup removes local records; download backups. No invoice entries are automatically sent to the checker or Analytics.

## Website observations

The public-page API is deployed on Sites at `https://learntech-website-health.mereowl5.chatgpt.site/api/check`.

- Project: `appgprj_6af3674adc588191817ed465728c323c`
- Source checkout: `C:\Files\Others\repo\HOPE\Tools\da-b2b\health-check-api`
- Native Worker ESM, no dependencies or paid search API key.
- `node --test scripts/test.mjs`, `node scripts/build.mjs`, `node scripts/validate-artifact.mjs`.
- Public DNS checks and per-redirect target validation; no IP literals, private addresses, credentials, query strings or nonstandard ports. Crawl-rule checks, bounded response size, timeout and redirect count. No raw fetched HTML returned to clients.
- Browser origins limited to LearnTech domains. Per-isolate request throttling is best-effort, not a global distributed quota. The host adds its own traffic controls.
- Caching is optional and skipped when hosting denies the default cache. The service holds no lead database, submitted email addresses or invoice data. Hosting infrastructure may retain operational request metadata.
- Observes returned HTML and selected headers only. Does not measure speed, verify backups, scan vulnerabilities or prove the installed PHP version. PageSpeed links provide a separate speed-check route.

Keep service access public for the public tool. Deploy updates through Sites using its existing project ID and source repository; never embed credentials in Jekyll or browser JavaScript.

## Optional reports

Reports use the existing activated FormSubmit destination from `_data/enquiry.yml`. They use native POST, an `email` field, `_autoresponse`, `_url` and enabled default reCAPTCHA. Do not convert to AJAX or disable reCAPTCHA: FormSubmit documents that either prevents autoresponses. Exact report content is previewable before sharing. Report consent is required only for sending; assistance follow-up is a separate unchecked optional field. No newsletter signup.

Provider submission acceptance is not delivery confirmation. The first localhost test was accepted, but the owner reported no email yet. Delivery must be confirmed in the recipient inbox/spam folder; check for FormSubmit activation mail as well. The explicit canonical `_url` avoids relying on a cross-origin referrer. Download and print remain available without email.

## Analytics and validation

Existing explicit analytics consent gates all tool events. Fixed `tool` identifiers only; no user-entered URLs, emails, invoice values or report contents in custom events. Track starts, successful completion, local save, download, print, report request and errors. A request event is not successful delivery or a qualified lead.

Run `node scripts/test-tool-consent.cjs` for consent gating, withdrawal and data allowlisting. Run the existing native Windows Ruby local-build helper from the parent Website tools repository; no WSL. Browser QA used actual narrow iframe viewports at 320/375/768/1440 in the supported in-app browser after its viewport override did not apply. No horizontal overflow or unlabelled visible fields in the tools/homepage checks. This is responsive Chromium rendering, not a physical-device or Firefox certification.

The local test harness is not part of source, and disappears on a clean Jekyll rebuild. `scripts`, `tests`, this document and node_modules are excluded from the public build.
