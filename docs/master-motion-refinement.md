# Master hero and cross-page motion refinement

The user preferred the opening in master (996ea05). Its original three-scene composition, scroll masks, moving headlines and compact navigation have been restored on dev. Supplied films, client photos, owner portrait, contact information and SEO additions remain in place.

## Reference inspection

Live browser review: Serena Congiu (https://www.serenacongiu.com/) and ANORAK (https://anorakfilm.com/), discovered through the supplied curation sites. Serena's photographic scale changes were observed in browser captures and width measurements. ANORAK informed typographic pacing; its design/imagery is not copied. Landing Love's beauty category was reviewed for relevance. Captures and observations are in docs/references.

## Motion system

- Master opening: three scroll-directed images and captions, scene navigation and a skip action.
- Headings: bounded line masks; 0.85-second movement with a 90 ms line stagger.
- Images: viewport-triggered curtain with a 34 px settle; 1 second, once per entry.
- Collection: animated category indicator, item entry/exit and position-only reflow. Every image retains its assigned crop across filters.
- Detail pages: route entry, masked photograph, heading choreography and related-image reveals.
- Owner, transformation, styles, films and booking: use the same heading/image vocabulary.
- Lightbox: image/caption transitions on open and next/previous.

No scroll hijacking or extra animation library. Static HTML remains visible before JavaScript and reduced-motion preferences suppress curtains/transforms.

## Asset performance

Same hero artwork, optimized as WebP:
- Craft: 130,628 bytes
- Expression: 98,584 bytes
- Detail: 155,844 bytes
- Total: 385,056 bytes, compared with 5,044,464 bytes for the original PNGs.

The first image has high fetch priority. Later scene images load eagerly at low priority to prevent a blank reveal. The genuine portfolio remains separate from labelled campaign scenes.

## Verification

See docs/previews/master-motion-results.json for actual sampled heading transforms, filter motion and interaction checks. The browser run covers all three hero scenes, compact header, nine screen widths, gallery filtering, lightbox navigation, detail animation and reduced motion. See master-production-results.json for final prerender/hydration checks. No field Core Web Vitals or hardware frame-rate guarantee is claimed.

Final production build passes with 21 prerendered URLs. Production browser verification passes with zero errors for the homepage, filtered collection, new style details and reduced-motion hydration. See docs/previews/master-production-results.json.
