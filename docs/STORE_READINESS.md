# Gravita Store Readiness

## 1. Current website status
Summarize what is implemented:
- visual storefront;
- homepage;
- navigation;
- Eyeglasses browse/filter experience;
- product-detail template;
- Find Your Frame guide;
- Sunglasses empty state;
- global search over current public catalog data;
- empty bag drawer;
- footer;
- accessibility foundations.

The current catalog is prototype content and the site is not ready to accept online orders.

## 2. Required catalog data
Provide a per-product checklist (Owner decision required for unknown operational values):
- [ ] product name;
- [ ] stable slug;
- [ ] SKU;
- [ ] eyewear brand/manufacturer if applicable;
- [ ] collection/category: eyeglasses or sunglasses;
- [ ] shape;
- [ ] color;
- [ ] actual retail price;
- [ ] currency;
- [ ] sale price if applicable;
- [ ] inventory/availability;
- [ ] dimensions: lens width, bridge width, temple length, frame width;
- [ ] material only if confirmed;
- [ ] lens options only if offered;
- [ ] prescription eligibility only if verified;
- [ ] care instructions if supplied;
- [ ] product description;
- [ ] at least four approved image views;
- [ ] alt text;
- [ ] image rights/source;
- [ ] related/similar product relationships.

```json
// Schema example — not product data.
{
  "name": "Fictional Frame",
  "slug": "fictional-frame",
  "sku": "SKU-9999",
  "category": "eyeglasses",
  "shape": "round",
  "color": "tortoise",
  "price": 120,
  "currency": "USD",
  "inventory": 45,
  "dimensions": {
    "lensWidth": 49,
    "bridgeWidth": 21,
    "templeLength": 145,
    "frameWidth": 138
  },
  "description": "A classic fictional frame.",
  "images": [
    "/images/fictional-front.jpg",
    "/images/fictional-side.jpg"
  ]
}
```

## 3. Product photography requirements
Specify (Owner decision required):
- exact-product photography, not AI-invented frames;
- front, 3/4, side, detail/hinge, and worn/on-face views;
- consistent neutral background for listing images;
- high-resolution source dimensions;
- web-optimized output;
- image naming convention;
- color accuracy and asset ownership.

## 4. Commerce decisions
Checklist (Owner decision required for all choices):
- [ ] sales model: inquiry, online purchase, or both;
- [ ] payment provider;
- [ ] supported currency;
- [ ] taxes;
- [ ] delivery regions;
- [ ] shipping fees/timing;
- [ ] returns/exchanges;
- [ ] warranty;
- [ ] prescription workflow;
- [ ] pupillary distance handling if needed;
- [ ] data/privacy policy;
- [ ] terms;
- [ ] inventory ownership and update process;
- [ ] who handles customer support.

## 5. Content and brand facts
List the facts needed to update the About page and footer (Owner decision required):
- [ ] official legal/trading name;
- [ ] owner/founder approval;
- [ ] physical address only if public;
- [ ] phone/email/WhatsApp;
- [ ] hours;
- [ ] official Instagram/social accounts;
- [ ] launch date only if approved;
- [ ] actual business story and wording;
- [ ] approved logos/font licenses.

## 6. Technical integration plan
Recommend a staged approach:
Phase 1: replace prototype catalog with real read-only catalog data.
Phase 2: add product availability, pricing, and real product details.
Phase 3: add cart and checkout only after payment/policy decisions.
Phase 4: add analytics, SEO metadata, transaction email, legal content, and monitoring.

Live-cart, payment, and order handling must not be enabled until product, policy, and payment data are verified.

## 7. Pre-launch QA checklist
Include:
- [ ] content fact check;
- [ ] route and link audit;
- [ ] mobile and desktop testing;
- [ ] image optimization;
- [ ] accessibility keyboard/focus/dialog test;
- [ ] search/filter test;
- [ ] cart behavior test;
- [ ] form/payment security review;
- [ ] privacy/terms review;
- [ ] domain and HTTPS;
- [ ] analytics consent requirements where applicable;
- [ ] backup/deployment rollback;
- [ ] performance measurement.

## 8. Known current constraints
List:
- no verified sunglasses inventory;
- prototype eyeglasses product names/images/data;
- no verified pricing/SKUs;
- no checkout/payment;
- no shipping/returns/warranty policy;
- no verified contact/location/hours;
- no legal/policy pages;
- browser-automation screenshot tooling issue reported by the agent, requiring manual cross-browser QA before launch.
