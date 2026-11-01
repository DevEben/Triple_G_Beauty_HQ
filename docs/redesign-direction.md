# Triple G — proposed redesign

Status: approved by the user and implemented locally. See docs/verification.md for validation results.

## Purpose

Present Triple G Beauty and Braids as a distinctive, meticulous braiding studio. Let prospective clients discover real work, compare four hairstyle families, and start a WhatsApp booking with the selected style included.

## Reference and alternatives

Selected replacement reference: SiteReel's Serra Sanctuary, https://sitereel.ai/template/serra-sanctuary. Inspected the live sample at https://serrasanctua-carvxfs7.manus.space/. Its opening uses large landscape imagery, white sans-serif and italic serif headings, terracotta actions, warm stone and dark brown tones, sparse navigation, and chapter-based storytelling. Adapt those principles to real hairstyle photography and a practical portfolio; the client rejected Mara Voss because its color scheme does not fit.

1. Serra-inspired beauty portfolio (recommended): warm stone, terracotta and espresso, white type over dominant photography, restrained Bodoni accents and spacious composition. Bronze connects to the existing logo; burgundy remains a selective booking accent.
2. Dark cinematic studio: espresso backgrounds and stronger video presence. Dramatic, but the existing salon photography has varied lighting and would be less cohesive at full-screen size.
3. Bright commercial salon: white surfaces and a compact service-first layout. Practical, but less distinctive for the premium portfolio brief.

## Proposed visual system

Keep the original logo and recognizable burgundy, espresso and bronze identity. Use photographic opening surfaces with a dark brown readability treatment, white type, warm stone supporting surfaces, terracotta or bronze controls, and selective burgundy booking accents. Avoid a large burgundy opening block. Retain Bodoni Moda for selected display moments with upright and italic contrast; reduce oversized typography and excessive repeated italics. Use generous, fluid spacing and deliberate photo crops that preserve the hairstyle.

## Page design

- Home: compact navigation with a clear booking action; a photographic opening composition inspired by Serra with a prominent real portrait, the existing “Every braid. A work of art.” promise, and clear portfolio and booking links. Follow with a curated four-look collection, an abbreviated studio craft story, a user-controlled craft video, four signature-style links, and a strong booking close with genuine hours and contact details.
- Portfolio: concise introduction, persistent category selection using the current URL parameters, considered image proportions, clear style captions, image lightbox, and direct links to style details.
- Style details: dominant hairstyle image, useful category-specific copy supported by the existing content, a prominent style-specific WhatsApp action, and related looks.
- Shared shell: cohesive mobile menu, footer and booking buttons. Mobile layouts receive their own composition rather than shrinking the desktop design.

## Interaction and quality

Use a short, coordinated entrance and subtle image hover treatment. Content remains visible by default; reduced-motion users receive immediate transitions. Preserve keyboard navigation, visible focus, Escape dismissal and focus restoration; keep modal focus within the active dialog. No autoplay audio. Use video posters and explicit play controls.

Preserve all existing routes, 17 portfolio entries, category filters, WhatsApp messages, TikTok details and business hours. Do not invent prices, testimonials, awards, locations or booking availability. Replace generic image failure text with a polished user-facing fallback.

## Implementation boundaries

Work in the existing React, Vite, Tailwind and Motion project. No backend, new booking system or remote publishing is required. Do not access .env files. Do not push code or create remote branches. This folder has no Git repository, so Git-based history and commits are unavailable.

## Verification

Run the TypeScript and Vite production build. Check navigation, category filters, style detail routes, general and style-specific WhatsApp URLs, menu and lightbox keyboard behavior, and reduced motion. Inspect desktop and narrow mobile layouts if browser access is available; report any browser-verification limitation explicitly.


