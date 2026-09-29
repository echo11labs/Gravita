// ============================================================================
// DEVELOPMENT FIXTURE DATA
// ============================================================================
// REQUIRED FIELDS FOR LIVE CATALOG INTEGRATION:
// - product name
// - slug
// - SKU
// - product images (high-res, multiple angles)
// - price/currency
// - color
// - shape
// - frame measurements (bridge, temple length, width)
// - availability / inventory rules
// - lens options / prescription compatibility
// - product description
// - policy/service rules
//
// Current dataset is local placeholder data. Do not render invented prices, 
// stock availability, reviews, or materials in the public UI.
export const FIXTURE_PRODUCTS = [
  { slug: "the-architect", name: "The Architect", shape: "rectangular", color: "Classic Tortoise", image: "/images/frame_rectangular.jpg", howItWearsImage: "/images/the-architect.png" },
  { slug: "the-academic", name: "The Academic", shape: "round", color: "Matte Black", image: "/images/frame_round.jpg", howItWearsImage: "/images/The Academic.png" },
  { slug: "the-editor", name: "The Editor", shape: "cat-eye", color: "Midnight Blue", image: "/images/frame_cateye.jpg", howItWearsImage: "/images/the-editor.png" },
  { slug: "the-pilot", name: "The Pilot", shape: "aviator", color: "Brushed Gold", image: "/images/frame_aviator.jpg", howItWearsImage: "/images/The-Pilot.png" },
  { slug: "the-modernist", name: "The Modernist", shape: "rectangular", color: "Amber Ash", image: "/images/frame_rectangular_2.jpg", howItWearsImage: "/images/The-Modernist.png" },
  { slug: "the-artisan", name: "The Artisan", shape: "round", color: "Vintage Havana", image: "/images/frame_round_2.jpg", howItWearsImage: "/images/The-Artisan.png" },
];
