# Aurel One hero campaign assets

Generated with the built-in image-generation tool on 2026-11-01. Both images are campaign illustrations for the hero story; the client portfolio and studio use the existing real photographs.

## Story

1. The craft: existing uploaded braiding-craft.png, hands braiding precise black box braids.
2. The expression: hero-finished-look.png, completed hairstyle worn with confidence.
3. The detail: hero-braid-detail.png, a closer view of the finished weave and scalp sectioning.

## Prompt set

### The finished look

Use case: photorealistic-natural. One wide landscape 16:9 premium website hero photograph. Continue the uploaded process reference, preserving medium black box braid texture, precise rectangular/diamond scalp partings, medium-brown skin, burgundy satin and warm champagne salon setting. An adult Black woman wears the completed long braids in a calm three-quarter profile, looking toward warm window light. Natural roots and woven hair texture; burgundy satin blouse and small gold earring. Cinematic amber rim light, espresso shadows, blurred cream architecture and a subtle green plant. Woman occupies the right half, full head uncropped, braid length visible, left 40 percent dark negative space for website copy. Natural skin and anatomy. No stylist hands, text, logos, watermarks, collage, plastic skin or changed braid type.

### Every detail

Use case: photorealistic-natural. One wide landscape 16:9 macro beauty campaign photograph. Use the process reference for precise parting geometry and the generated finished-look portrait for the same woman, black box braids, burgundy satin and amber/espresso lighting. A close three-quarter overhead/rear view of her completed hairstyle shows natural roots, section geometry and individual woven fibers. No stylist hands; face mostly outside the frame, with a subtle ear profile and small gold hoop only if natural. Soft raking window light, bronze highlights, natural healthy scalp detail. Dark espresso negative space at left 35 percent; flowing braids fill the right and lower frame; a hint of satin shoulder at bottom right. A closer camera view of the finished portrait, not a diagram. No text, labels, watermarks, floating hair, exploded anatomy or cornrows.

## Implementation

Hero.tsx maps scroll to the three images with an upward masked reveal into the portrait and an expanding aperture into the close detail. Typography travels vertically through each scene. The navigation collapses to a compact centered bar. Reduced motion presents a static opening. Original generated PNGs are preserved in the project asset folder.
