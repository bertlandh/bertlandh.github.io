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
