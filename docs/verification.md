# Redesign verification — 2026-11-01

## Automated

- `npm test`: seven passing regression tests covering category query normalization and both modal keyboard focus boundaries.
- `npm run build`: TypeScript validation and Vite production output.
- Local Vite preview responds with HTTP 200 at http://127.0.0.1:5174/.

## Browser review

- Home, collection and hairstyle detail layouts inspected at desktop 1440px and mobile 390px; collection also inspected at 320px.
- No horizontal document overflow at the inspected dimensions.
- All six homepage photo elements loaded successfully.
- Original 17 entries render in the full gallery; Boho filters to five, Kids to two, with matching URL parameters.
- Lightbox next-image arrow key and Escape verified; focus returns to its originating image button.
- Shift+Tab wraps first-to-last in both mobile navigation and lightbox; native modal prevents background interaction.
- Style details link to a WhatsApp message containing the correct selected hairstyle and the existing business number. General booking hrefs retain the existing business number. No messages were sent.
- Studio film plays after explicit activation. After natural completion, `ended: true`, `paused: true`, and `controls: true` confirm replay/seek controls remain available.
- Navigation highlights now compare the complete path and hash rather than treating every homepage anchor as current.
- CSS and Motion use reduced-motion preferences; an emulated reduced-motion browser pass was not performed.

## Review and delivery

A separate read-only code review identified disappearing video controls on pause/end. This was reproduced, corrected, and verified through natural playback completion. No other important issues were identified.

Screenshots: docs/previews/home-desktop.png and docs/previews/home-mobile.png. The local preview is left open. No remote branches, pushes or deployments were made. No .env files were accessed.

## Hero image and animation correction

- Uploaded braiding-craft.png now supplies the hero; process.webp is restored in the studio.
- Compared Serra directly while scrolling: the reference pins a full-screen background and advances through story chapters. Triple G now adapts that structure with a sticky scene, scroll-scrubbed camera scale/pan and three text crossfades, rather than claiming to reproduce the landscape film.
- Browser confirmed stage top remains 0 while camera transform advances from none to scale 1.14575 and the active chapter changes.
- Chapter button navigation reaches the final chapter, and inactive chapter booking links are removed from the tab order.
- At actual 390px mobile width, stage and photo remain aligned with internal scrollTop 0; no horizontal document overflow.
- Landscape 844x390: all three chapter controls end at y=380, within the viewport; active booking action also remains visible.
- A review caught the minimum-height landscape edge; the short-height layout fixes it. Overflow clipping prevents focus from scrolling the pinned scene internally.
- The reduced-motion branch uses one static hero with direct collection access; no simulated media-preference browser pass was performed.

## Aurel One campaign hero revision

- Inspected the linked SiteReel template and live Aurel One sample directly while scrolling.
- Built a new three-image sequence: original process image, generated finished-look portrait, generated close braid detail.
- Browser verified all three images load; second and third scenes reach fully open clip masks; pinned stage remains at y=0 and does not scroll internally.
- Typography travels through the scene rather than remaining in the previous caption position. Header compacts to a centered bar during the story.
- At actual 390px phone width, no horizontal overflow; active CTA remains within the viewport. Portrait framing and scene-two heading scale adjusted for phones.
- Separate code review found no concrete important regressions in the new hero, keyboard order, reduced-motion branch, compact menu or short-height handling.
- Images generated with the built-in image tool and copied into public/media/photos/hero-finished-look.png and hero-braid-detail.png. Prompts documented in docs/hero-image-prompts.md.
