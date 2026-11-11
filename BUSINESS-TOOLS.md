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

## Report compatibility investigation â€” 10 November 2026

The owner reported no report delivery. The form now sends the full report in the conventional `message` field, with a fixed short autoresponse (the provider documents that its autoresponse includes the submission). Subject lines distinguish website reports from document copies. Native POST, reCAPTCHA and the honeypot are preserved. This is a compatibility hardening change, not a confirmed diagnosis of provider mail delivery. Gmail access was declined; no mailbox settings or messages were accessed. Run `node scripts/test-tool-report.cjs` and the consent tests. A recipient must confirm receipt before marking delivery fixed.

## Shared credits and focused SEO view

All invoice/quotation previews (including print/PDF), text downloads and email-report payloads end with the shared LearnTech credit and a relevant service enquiry link. JSON backups carry `createdWith` metadata; saved records remain version 1 and compatible with existing backups. The credit is part of the document flow, not a fixed-position print overlay. It appears at the end rather than covering totals or repeating on every page.

`/tools/seo-health/` is a focused view of nine existing public-page checks, using the same public API. It does not launch a second crawl or claim to measure rankings, keyword demand or backlinks. Its identifier is `seo_health`. LearnTech credit links on tool pages emit `tool_credit_click` after analytics consent, with the fixed tool ID and output_footer placement only. Offline PDF/email clicks are not measured by that browser event.

The output helper applies credits idempotently so repeated updates do not duplicate the footer. Future free tools should use `LearnTechTools.brandedReport`, `creditHTML` and `report`. Keep local draft storage separate from export metadata.

### Weekly tools review

In GA4 Pages and screens / Landing pages, filter page paths beginning `/tools/`. Review visitors, returning users, engagement and service enquiries by tool. Inspect `tool_start`, `tool_complete`, `tool_save`, `tool_download`, `tool_print`, `tool_report_request`, `tool_error` and `tool_credit_click`. Report requests remain requests, not delivered emails. The event parameter `tool` is already emitted; registering an event-scoped custom dimension called Tool for parameter `tool` enables dashboard breakdowns after processing. Account configuration must be checked separately; source changes do not create dashboard reports automatically.

In Search Console and Bing Webmaster Tools Search Performance, filter the tools URLs and review impressions, clicks and queries. These are search-discovery metrics; Bing does not receive the GA4 tool-use events. The sitemap includes the SEO page automatically, but crawling/indexing/rankings are not guaranteed.

On 10 November 2026, the existing GA4 property 331500281 was checked and the event-scoped custom dimension Tool was created for parameter `tool`. The saved definition was verified in the UI. This does not create a custom dashboard or backfill historical event parameters. Allow the documented processing interval before using it in explorations.

Analytics loading is restricted to the production LearnTech/GitHub hostnames. Local preview/test visits do not send GA events even if a saved consent choice exists.

## Image compressor and resizer

`/tools/image-resizer/` processes still JPEG/PNG/WebP locally with browser canvas. No backend, API key, image upload, persistent history or email integration. Source magic bytes and dimensions are checked before decoding (20 MB / 24 MP limits); output is limited to 4096 per side and 12 MP. Proportional and fixed social/website presets, contain/centre crop, no-enlarge default, JPEG/WebP quality and optional PNG/WebP transparency are supported. The final dimensions include a white credit strip rendered into the exported pixels below the photo. It contains the shared LearnTech tagline and website address. No download can omit this strip. Preview and final export use the same blob; settings changes invalidate stale downloads. File size may increase and is reported honestly.

Browser-supported JPEG EXIF orientation is honoured during decoding. Re-encoding makes a new file; original files are not modified. Animated formats and SVG/HEIC are rejected. Some browsers cannot encode WebP; format fallback is detected and reported rather than mislabelling a PNG as WebP. Local preview traffic remains excluded from Analytics. Production events use fixed identifier `image_tools` without file information.

Run `node scripts/test-image-tool.cjs` plus the existing report and consent suites.


## BrandSnap
Public tool: `/tools/brandsnap/`. Adapted from the existing `starterkits/bbkfirweb/brand-snap/Brand Snap – Mobile Web Selfie.html` camera, canvas, logo and text workflow; original prototype remains unchanged. Uses LearnTech styles, local JPEG/PNG/WebP decoding and bounded canvas output, proportional logo placement, wrapped text, optional camera cleanup and visible credit pixels. No image uploads, email delivery, location request, automatic camera start, or offline/PWA claim. Optional consent-based events contain only action and fixed tool identifier. Tests: `node --test scripts/test-brandsnap.cjs` plus existing image/report/consent checks. Physical camera capture needs device testing.


## Social sharing previews
Tools pages inherit the versioned 1200 x 630 JPEG `/assets/images/social/free-business-tools-share-v1.jpg` through the tools path default in `_config.yml`. Jekyll SEO Tag emits Open Graph and X/Twitter large-image metadata, dimensions and alt text in static HTML. Each page retains its title, description and canonical address. A future page can override image in its front matter. Keep previous image filenames available because social platforms cache previews.

Run `node scripts/check-tool-sharing.cjs` after building. It checks all six tools pages and the image encoding, unique image tags, absolute URLs, dimensions, alt text and size. The graphic is a generated promotional illustration, not an actual screenshot or customer report. If Facebook has cached an earlier preview, inspect the page in Facebook Sharing Debugger and request Scrape Again. The final preview display is platform-dependent.


## Tool search visibility
Tool-specific titles, descriptions, instructions, FAQs and related links are defined in `_data/business_tools.json`. The static guide include keeps this information visible without JavaScript. Tool pages use WebApplication structured data with truthful zero-price offers, no invented reviews or ratings; this does not assert eligibility for Google software-app rich results. The hub has a CollectionPage and ItemList. Individual tools have visible and structured breadcrumbs. `last_modified_at` reflects this content update. Shared cards remain social-only; the page hero does not treat image metadata objects as image URLs.

Validation: build, then `node scripts/check-tools-seo.cjs`, `node scripts/check-tool-sharing.cjs` and the existing tool tests. Google and Bing sitemap registrations should be checked separately from actual indexing. No ranking guarantee, meta-keyword stuffing or unsupported SVG conversion claim is made. True raster-to-vector SVG tracing would be a separate feature.


## SVG converter and favicon generator
`/tools/svg-converter/` uses vendored ImageTracer.js 1.2.6 (Unlicense), source https://github.com/jankovicsandras/imagetracerjs/tree/1.2.6; license is beside the vendored source. SHA256 1f7e21062196c53f2565120fc0708eac197c8403ec1bea28b381056ea0c3fdb9. The worker receives at most a 768px-long image, traces up to 16 colours, and is cancelled on changes/reset or after 45 seconds. Only generated path coordinates, RGB fills and bounded opacity are serialized; source SVG is not accepted. Output has genuine paths, escaped labels and a separate visible credit footer.

`/tools/favicon-generator/` outputs six credited PNGs (16,32,48,180,192,512), a 32-bit DIB ICO with 16/32/48 entries, a manifest icon template, an HTML snippet and a LearnTech README. Pure-JS ZIP uses store entries with CRC32; no ZIP library or server upload. Icon pixels are user artwork; branded names, PNG Software metadata and package documentation retain credit. The template makes no PWA installation claim. Both tools retain consent-based action-only analytics and no saved image history. Tests: `node --test scripts/test-asset-tools.cjs`, existing tool tests, SEO and sharing checks after native Jekyll build.

Trace palette preprocessing keeps transparent pixels separate from opaque colour clusters; semi-transparent pixels are thresholded to transparent/solid for simple logo tracing. Flat white/burgundy artwork has a full-pipeline transparency regression check. File-size validation happens before reading the source into an ArrayBuffer.


## Password generator and QR generator
The public collection now has nine tools. `/tools/password-generator/` adapts the character/length/copy workflow from `starterkits/bbkfirweb/cred-table-client-v3/app.js`; original legacy app is untouched. Public scope is generator only, per user selection. Web Crypto Uint32 rejection sampling avoids modulo bias; complete candidates are rejected until every selected group occurs. No strength score, compliance certification, credential vault, encrypted storage, email or history. Copy is explicit; downloaded text is unencrypted with LearnTech credit. Never commit generated password samples, real credentials or QR private data.

`/tools/qr-generator/` vendors qrcode-generator 1.4.4 (MIT), SHA256 18ae399f81182bc9de916e9c77b195df20cc58d6f2d55a62b085a299f1bf1780, license alongside source. UTF-8 encoding, URL/text modes, 800-byte content cap, M/H correction, integer module sizing with >=4 modules quiet zone. PNG and SVG have visible credits in a separate 80px footer, no hosted redirect or scan tracking. Test with an independent decoder and real downloaded output. Password/QR values never enter custom analytics; only fixed tool/action metadata is consent-based. Both pages skip the optional external Alpine script while retaining local LearnTech navigation.

## Email signature builder
Browser-local three-layout builder with escaped table-based HTML, HTTPS-only web/image links, formatted and plain-text copy, HTML/text downloads and LearnTech credit. No persistence or content analytics. Remote image hosts receive image requests. Email-client rendering needs a test message.
