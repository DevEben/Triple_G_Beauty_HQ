# Triple G Serra redesign implementation plan

Goal: Deliver the approved Serra-inspired braiding portfolio in the existing React application.
Architecture: Retain React Router and the existing content configuration. Shared CSS establishes earthy surfaces, photographic composition and responsive typography; focused page components compose that system. Native dialogs provide focus containment for menus and image previews.
Tech stack: React 18, Vite 6, TypeScript, Tailwind, Motion, lucide-react.

- [x] Capture approved strategy in PRODUCT.md and visual decisions in DESIGN.md.
- [x] Add a node:test regression for invalid category parameters falling back to the complete gallery; run it failing, then implement category normalization.
- [x] Build the shared shell: photographic/light navigation variants, native mobile menu, pill booking links, accessible images, motion preferences, coherent footer.
- [x] Replace Home.tsx with the photographic hero, curated collection, studio story, controlled craft film, signature styles, and booking close.
- [x] Redesign Portfolio.tsx and Detail.tsx; preserve 17 entries, valid URLs, lightbox keyboard navigation, related styles and style-specific booking.
- [x] Run node --test tests/portfolio.test.mjs and npm run build. Start the existing Vite dev script, verify its HTTP response, inspect desktop/mobile in the supported browser, and exercise filters, detail links, menu, lightbox and booking hrefs.
- [x] Correct observed failures and capture screenshots for delivery.

No Git operations: this directory has no Git repository. No deployment, pushes or .env access.

