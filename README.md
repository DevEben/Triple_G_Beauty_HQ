# Triple G Beauty and Braids

A React portfolio for the studio, redesigned around the approved Serra Sanctuary reference: photographic composition, warm stone, terracotta and espresso, with Bodoni accents.

## Run locally

- `npm install` if dependencies are missing.
- `npm run dev` starts Vite; use the Local URL it prints.
- `npm run build` checks TypeScript and creates `dist/`.
- `npm test` verifies category-query handling and dialog keyboard boundaries.

## Content

Business details, WhatsApp number, portfolio entries, category names and media paths live in `src/config.ts`. All 17 original portfolio entries and their existing URLs are retained. Booking links open WhatsApp with a general enquiry or the selected hairstyle.

Photos are in `public/media/photos/`, and the user-controlled studio film is in `public/media/videos/`. The supplied brand logo is cut out in `public/logo-transparent-bronze.png` and used in the navigation, mobile menu and footer. Its alpha mask adapts to champagne, bronze or espresso for contrast; the original source assets remain untouched. Image failures display a visitor-friendly fallback.

## Design and verification

See `DESIGN.md`, `PRODUCT.md` and `docs/redesign-direction.md` for the approved direction. Preview captures are in `docs/previews/`. The gallery supports category links, a keyboard-accessible modal image preview, and individual style pages. The mobile menu and lightbox wrap keyboard focus and close with Escape. Reduced-motion preferences disable decorative animation.

This project is local only; no publication or remote Git operations are part of this redesign.

