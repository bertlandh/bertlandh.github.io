# Maintaining LearnTech Academy

The public Academy starts at `/academy/`. It includes Another Check-In (24 lessons), Custodia Registry (26 lessons), and 22 role learning paths. No learner account is required. Training content remains authoritative in the separate `teaching-dem` repository.

## Add a recording

1. Upload the recording to YouTube, choose Unlisted, and allow embedding.
2. Edit `_data/academy_videos.yml`. Set the matching lesson value to its video ID, not the complete URL. For `https://www.youtube.com/watch?v=ABC123`, use `another-checkin-C01: "ABC123"`.
3. Build and review the lesson. A nonempty lesson ID replaces the sample and removes the “Lesson video coming soon” notice. The direct YouTube link changes with it.
4. Commit and publish through the website's existing GitHub Pages workflow.

Empty values use the generic YouTube sample configured by `placeholder_id`. It is explicitly labelled as a sample, not lesson content. Unlisted videos can be watched and shared by anyone with their link, consistent with the public Academy.

## Update lesson content

Edit and review the lesson sources and decks in `teaching-dem`, then run its `scripts/export-academy.py --website <this repository>` command. The exporter overwrites generated Academy page front matter, `_data/academy.json`, covers and PDFs. It preserves `_data/academy_videos.yml`. Back up any manual edits to generated files before export.

Role paths come from the approved curriculum and permission matrix; they guide learning and do not grant application access. Lesson pages retain audience, prerequisite and effective-permission guidance.

PDF handouts contain the reviewed slide images and preserve their visual layout. They do not contain selectable slide text or speaker notes. The lesson webpage provides readable text and expandable narration. The editable PowerPoints stay in `teaching-dem`.

## Implementation and checks

- Layout: `_layouts/academy.html`; cards: `_includes/academy-card.html`.
- Styles and filtering: `assets/css/academy.css`, `assets/js/academy.js`.
- Generated downloads and artwork: `assets/academy/`.
- Normal build: `bundle exec jekyll build`.
- After building, run `scripts/validate-academy.py --website <this repository>` from `teaching-dem` to check links, headings, PDF hashes/page counts and all PDF pages against reviewed slide renders.

The September 2026 local environment blocked the remote-theme download. Preview validation used a temporary copy of `_config.yml` with only `remote_theme` removed, using the repository's local layouts and styles. Production configuration was left intact. Verify the normal GitHub Pages build when publishing. Sample-video playback could not be verified in the local embedded browser; the page also provides a direct YouTube link.
