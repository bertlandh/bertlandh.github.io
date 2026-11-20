# PrettiPetz verification — 19 November 2026

- Native Windows Ruby 3.1.7 / locked bundle: dependencies satisfied.
- Full production Jekyll build: passed (39.682 seconds on final build).
- Existing LearnTech files unchanged except additive collection and documentation exclusion in _config.yml.
- Seven generated pet pages; all local href/src targets checked by scoped validator.
- No host branding, GA tag or unrendered Liquid in generated pet pages.
- Canonical tags present; prelaunch noindex on all seven pages; no /pets/ entries in sitemap.
- Unpublished template and operating guide absent from generated site.
- Browser checks: seven pages each at actual widths 320, 375, 768 and 1440; no horizontal overflow (28 checks).
- Observed homepage images loaded. Browser error/warning log empty during tested pages.
- Mobile menu opens and closes; desktop navigation visible. Search, category selection, URL state and reset tested.
- Separate ignored local fixture site: three labelled test products, one per category. Category and availability intersection, empty result, reference search, product navigation and egg-specific information passed.
- Encoded WhatsApp enquiry includes title and product reference. Link inspected only; no message sent and no real contact number assumed.
- Unavailable listing suppresses enquiry CTA; final JMD price rendering uses two decimal places.
- Launch-mode validator rejects missing contacts, opening flag, approved policies and verified stock.

Fixtures were built outside this repository under ignored da-b2b/runtime/pet-business.
No fictitious product or fixture number is present in the production site source.
Editorial hero photograph is identified as such, not an available animal.
No purchase, listing publication, tracking activation, Git commit or push performed.

Limits: no owner-supplied stock or real WhatsApp contact is available yet, so actual
order handling, animal documentation and real-device WhatsApp opening remain
launch checks. Browser checks used the connected in-app browser, not physical phones.

## Mobile bottom navigation update — 19 November 2026
- Replaced mobile top-menu trigger with a fixed bottom toolbar and upward-opening navigation panel.
- Shared layout applies to all pet pages, including generated product pages.
- Toolbar height and expanded panel height are measured for page-bottom padding.
- Safe-area insets and viewport-fit cover supported; no scroll locking.
- Browser verification at 320x640 and 375x812: no horizontal overflow; panel sits above toolbar.
- All seven pages' final footer text was reachable above the open panel and closed toolbar after scrolling to the bottom.
- Escape collapses panel; selecting a navigation link reaches its target with menu collapsed.
- Desktop 1440px: bottom toolbar hidden, original top navigation visible, body bottom padding 0.
- Final native Jekyll build passed (42.729 seconds). Prelaunch checks and git diff whitespace checks passed.
- Phone safe-area handling is implemented; no physical iOS/Android device test was performed.

## Partner media and contacts — 19 November 2026
- Added eleven selected original photos, a smaller responsive hero derivative and three silent H.264 videos (10,440,058 bytes combined, versus 33,184,527 original bytes).
- Excluded duplicate images, the third-party poster and private WhatsApp screenshots from site assets.
- All WebP files decoded successfully and had no EXIF; all videos have fast-start moov before mdat. One video played successfully in-browser (readyState 4, currentTime advancing, no media error).
- Added data-driven contact pages for Bertland Hope and Krishna Baddaloo. Both contact downloads completed in browser; rendered vCards have correct names, PrettiPetz organisation and phone numbers, CRLF and lines no longer than 75 bytes.
- Git attributes preserve static vCard bytes across platforms. Re-run scripts/build-pet-contacts.rb after contact/domain edits.
- Published three enquiry guides using the explicitly stated pair prices. No actual stock or photo matching is claimed; launch validation still reports no verified inventory.
- Thirteen HTML pages checked at 375px and 1440px: no horizontal overflow, one H1 each and no observed broken loaded images. Four new-content pages checked at 320px with expanded mobile menu: no overflow and footer clears menu.
- Final native Jekyll build passed (18.31 seconds). Canonicals, internal links/posters, noindex, sitemap exclusion and prelaunch guards passed.
- Indexing and analytics remain off for PrettiPetz. Location, collection, hours, approved policies, real stock/photo mapping and ambiguous offer units remain pending.
- No Git commit, push, public deployment or WhatsApp message sent in this update.

## Page and image SEO audit — 19 November 2026
- Sixteen pages have unique search titles/descriptions, canonical URLs, OG/Twitter metadata and valid JSON-LD. The repeatable audit is scripts/check-pet-seo.py; current output is tests/pet-seo-audit.json.
- Structured graph separates PrettiPetz and both partners from the hosting organisation. Profiles identify the correct people; enquiry guides have no false Product/stock claims; breadcrumbs have at least two ordered items where used and correctly include catalogue parents for guides.
- Added original birds, quail-egg enquiries and cages category pages. Footer/category links now discover these pages directly, without requiring search parameters.
- Descriptive image alt text/captions, dimensions and responsive gallery thumbnails added. Browser verified that the mobile gallery selects thumbnail URLs. Full-size photos remain linked and described through ImageObjects.
- Prelaunch audit passed for all sixteen pages with noindex, zero active image-sitemap entries and no pet image-sitemap directive in robots.
- A separate isolated launch fixture passed: same sixteen pages, index/large-image-preview metadata, eleven image-sitemap entries and the correct robots sitemap directive. Production settings were never enabled by this test.
- Final native Windows Jekyll build passed in 26.557 seconds. Scoped business checks passed, existing root sitemap preserved and no pet pages leaked into it.
- Browser checks at 375px and 1440px covered all sixteen pages: 32 layout checks with no horizontal overflow or observed broken loaded images. Expanded mobile menu still clears the footer on the new eggs page.
- Canonical query stripping and publication are locally checked; Google Rich Results/Search Console live validation and ranking measurements remain post-launch work. No external index submission, profile/settings change, commit or push performed.
- Pickup wording reflects the owner's agreed-meeting-point model. Town/parish, hours, verified stock/photo matching and approved order policies remain pending.

## Bird favicon and scroll/card refinement — 19 November 2026
- Bird SVG retained as favicon with 32px PNG, ICO and 180px Apple touch fallbacks; asset versioning added. Fallbacks rendered directly from the existing mark, with no new production dependency.
- Existing bird photos displayed on both individual contact cards and on contact/about partner sections, with descriptive alt text and preserved image proportions.
- Browser mobile test at 375px: downward scroll hid the toolbar at scrollY 812; upward scroll returned it at scrollY 406; open menu stayed visible during further downward scrolling; Escape closed and restored the trigger.
- Both cards, contact and about pages checked at 375px and 1440px: no horizontal overflow, card images loaded, desktop bottom toolbar hidden.
- Keyboard focus reveals/pins the trigger; reduced-motion styling remains respected. Bottom spacing is preserved while the toolbar is off-screen.
- Node syntax check passed; final native Jekyll build passed in 18.694 seconds; business and SEO audits passed with indexing disabled.
