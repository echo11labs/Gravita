# Gravita — Visual Storytelling & Copy Audit (v5)
### Senior Art Direction, UX, and Copy Review
*Date: 2026-09-29 | Status: ALL APPROVED CHANGES IMPLEMENTED*

---

## Status Board

| Change | Status |
|---|---|
| ShopBySilhouette h3 → "Start with a shape." | ✅ IMPLEMENTED |
| ShopBySilhouette subhead → "Explore rectangular, round, cat-eye, and aviator frames." | ✅ IMPLEMENTED |
| Eyeglasses collection h2 → "Explore eyeglasses." | ✅ IMPLEMENTED |
| Eyeglasses collection subhead → "Explore by shape or browse all frames." | ✅ IMPLEMENTED |
| GuidedSelection subtitle → "Start with shape, fit, or everyday style." | ✅ IMPLEMENTED |
| Product detail body → shape + color only, "core design principles" removed | ✅ IMPLEMENTED |
| Footer "See things differently." | ✅ RESOLVED — intentional pairing, no change |
| Hero body line | ⏸ DEFERRED — owner brief required |
| About h1 | ⏸ DEFERRED — owner approval required |
| Extended per-product copy | ⏸ DEFERRED — verified product data required |
| Per-product character descriptions | ❌ REJECTED PERMANENTLY |
| Face-shape step → shape-filter routing | ❌ REJECTED PERMANENTLY |

---

## A. Live Copy — Current State

This table reflects exactly what is rendered in the codebase as of this update.

| Location | File | Live copy |
|---|---|---|
| Hero h1 | `Hero.tsx` | "See things differently." |
| Hero body | `Hero.tsx` | "Eyewear shaped for the way you move through the world." ← deferred |
| ShopBySilhouette h3 | `ShopBySilhouette.tsx` | "Start with a shape." |
| ShopBySilhouette subhead | `ShopBySilhouette.tsx` | "Explore rectangular, round, cat-eye, and aviator frames." |
| EditorialPanel kicker | `EditorialPanel.tsx` | "Our Point of View" ← no approved change |
| EditorialPanel h3 | `EditorialPanel.tsx` | "Designed for the way you look at the world." ← no approved change |
| EditorialPanel body | `EditorialPanel.tsx` | "Gravita brings considered forms and everyday clarity into focus…" ← no approved change |
| GuidedSelection h3 | `GuidedSelection.tsx` | "Find the frame that feels like you." |
| GuidedSelection subtitle | `GuidedSelection.tsx` | "Start with shape, fit, or everyday style." |
| Eyeglasses collection h1 (kicker) | `eyeglasses/page.tsx` | "Eyeglasses" |
| Eyeglasses collection h2 | `eyeglasses/page.tsx` | "Explore eyeglasses." |
| Eyeglasses collection subhead | `eyeglasses/page.tsx` | "Explore by shape or browse all frames." |
| Product detail body | `eyeglasses/[slug]/page.tsx` | "A [shape] optical frame. [color] finish." |
| Sunglasses h1 | `sunglasses/page.tsx` | "A different view of the light." |
| Sunglasses body | `sunglasses/page.tsx` | "Our sunglasses collection is taking shape." |
| Find Your Frame h2 | `find-your-frame/page.tsx` | "Start with what feels right." |
| Find Your Frame subhead | `find-your-frame/page.tsx` | "Choose a starting point and explore frames at your own pace." |
| About h1 | `about/page.tsx` | "A clearer way to see what matters." ← deferred |
| About body | `about/page.tsx` | "Gravita is built around a simple idea: eyewear should feel considered, personal, and easy to live with." ← deferred |
| Footer close | `Footer.tsx` | "See things differently." — intentional hero/footer pairing |

---

## B. Owner Copy Decisions (Full Register)

### Implemented — owner approved

| Location | Before | After | Decision |
|---|---|---|---|
| ShopBySilhouette h3 | "A shape for every point of view." | "Start with a shape." | Owner revised from proposed "Find the shape that fits." — "fits" implies physical fit |
| ShopBySilhouette subhead | "Explore silhouettes designed to suit your everyday perspective." | "Explore rectangular, round, cat-eye, and aviator frames." | Owner revised from "Four shapes. One collection." — count-dependent |
| Eyeglasses collection h2 | "Frames for every point of view." | "Explore eyeglasses." | Owner preferred this over "Optical frames." — matches nav label |
| Eyeglasses collection subhead | "Explore optical frames across considered shapes and everyday styles." | "Explore by shape or browse all frames." | Owner approved |
| GuidedSelection subtitle | "Begin with the shape that suits your point of view." | "Start with shape, fit, or everyday style." | Owner proposed — reflects all three guide paths |
| Product detail body | "A considered [shape] silhouette…core design principles…" | "A [shape] optical frame. [color] finish." | Owner approved direction — prototype-safe, shows only verified visual attributes |

### Deferred — owner input required

| Location | Current | Direction | Blocker |
|---|---|---|---|
| Hero body | "Eyewear shaped for the way you move through the world." | No approved replacement | Stronger creative option or owner brief |
| About h1 | "A clearer way to see what matters." | No approved replacement | Owner must supply preferred wording |
| About body | "…eyewear should feel considered, personal, and easy to live with." | "considered" in use here — retire if possible | Owner approval |
| EditorialPanel kicker, h3, body | See live copy table above | No changes approved | Owner review |
| Extended per-product copy | "A [shape] optical frame. [color] finish." | Expand with verified product facts | Verified product data required |

### Rejected and closed

| Proposal | Reason |
|---|---|
| "Frames with a point of departure." (EditorialPanel h3) | "Departure" reads as leaving, not beginning |
| "The Collection" as EditorialPanel kicker | Mislabels a brand-statement section as navigation |
| "The full collection." as collection h2 | Misleading with 6 prototype fixtures |
| Six invented per-product character descriptions | Fictional claims, not based on verified product data |
| Face-shape → shape-filter routing | No justified user-choice-to-shape mapping |
| "Optical frames selected for daily wear and considered living." (hero body) | "Considered living" unnatural; "selected" implies unverified curation |
| "Find the shape that fits." (silhouette h3) | "Fits" implies physical fit, not visual silhouette |
| "Four shapes. One collection." (silhouette subhead) | Count-dependent; replaced with named-shapes version |

---

## C. Visual-System Guidance (Corrected)

### Typography
Do not treat Playfair Display as an "absolutely locked" audit rule. Verify against current implementation before declaring design drift. The display serif is in use and is consistent with the editorial character.

### Dark sections
`bg-[#171917]` is a contrast tool used in GuidedSelection and Find Your Frame. Extension to other routes is a design decision, not a system violation.

### Imagery at launch
The correct standard is: **owner-approved, rights-cleared imagery that accurately represents the business.** A photo session is an excellent path but not the only valid one — licensed stock with comparable eyewear is acceptable with owner approval. Hard constraint: **exact sellable products must be represented by imagery that accurately shows those products.** AI-generated frames cannot represent purchasable inventory at public launch.

### E-Commerce vs. Brand Promotion
The site has been actively transitioned away from an e-commerce functionality to a brand-promotional brochure experience. All Cart buttons, overlays, and price data have been stripped from the deployment. Do not reintroduce e-commerce logic without an explicit owner directive.

### Image role summary

| Role | Current | Prototype OK? | Launch requirement |
|---|---|---|---|
| Campaign portrait (Hero, EditorialPanel) | AI-generated | ✅ Prototype only | Rights-cleared; shows actual Gravita frames |
| Silhouette tiles | AI-generated | ✅ Prototype only | Actual inventory photography |
| Product listing | AI-generated | ✅ Prototype only | Exact-product photography, consistent setup |
| Product detail (multi-view) | Single AI image | ✅ Prototype only | 4–5 views per physical frame |
| GuidedSelection editorial mood | AI-generated | ✅ Prototype and launch | Must not imply real store, product, or person |

---

## D. Do Not Change List

1. **GRΛVITΛ wordmark** — Jost, `tracking-[0.1em]`, `font-light`, lambda substitution.
2. **"See things differently."** — Hero h1 and footer close. Intentional pairing. Do not duplicate elsewhere; do not retire.
3. **Warm ivory / near-black palette** — No gradients.
4. **Rectangular controls** — No rounded corners anywhere in the UI.
5. **Search overlay** — Fixed full-viewport, `z-[100]`, ivory, body-scroll lock.
6. **E-commerce features** — The site is a promotional brochure. Do not add Cart, Add to Cart, or Checkout features unless explicitly directed.
7. **Footer nav** — Four internal links + Instagram with `sr-only` new-tab label. No fabricated legal links.
8. **Product detail public-safe rule** — No price, SKU, stock, lens option, or Add to Cart (per business promotion mandate).
9. **`motion-safe:` on all hover animation** — Never remove.
10. **Find Your Frame routing** — No face-shape-to-filter routing without owner-approved user-choice mechanism.

---

## E. Owner Assets Still Required for Launch

### Copy
- [ ] Hero body — no approved replacement yet
- [ ] About h1 — owner must supply preferred wording
- [ ] Extended per-product descriptions — based on verified product facts only

### Brand facts
- [ ] Official legal/trading name
- [ ] Founder name (if approved for About page)
- [ ] Physical address (if public-facing)
- [ ] Contact email / WhatsApp
- [ ] Operating hours
- [ ] Approved business story paragraph

### Imagery
- [ ] Rights-cleared campaign portrait showing actual Gravita frames
- [ ] Product listing photography — all frames, consistent setup
- [ ] Product detail multi-view — 4–5 views per physical frame
- [ ] Silhouette tiles — one image per shape from actual inventory

### Legal
- [ ] Privacy policy page (required before analytics or tracking)
- [ ] Terms of service (required before commerce)
- [ ] Cookie/consent strategy
