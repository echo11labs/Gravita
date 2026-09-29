import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const SHAPES = [
  {
    id: "rectangular",
    name: "Rectangular",
    tags: ["Structured", "Modern"],
    desc: "Clean lines and architectural balance for a defined look.",
    image: "/images/frame_rectangular.jpg",
    href: "/eyeglasses?shape=rectangular",
    ariaLabel: "Shop rectangular eyeglasses",
    imageScale: "scale-100",
  },
  {
    id: "round",
    name: "Round",
    tags: ["Classic", "Academic"],
    desc: "Soft curves that bring thoughtful proportion to everyday wear.",
    image: "/images/frame_round.jpg",
    href: "/eyeglasses?shape=round",
    ariaLabel: "Shop round eyeglasses",
    imageScale: "scale-100",
  },
  {
    id: "cat-eye",
    name: "Cat-eye",
    tags: ["Bold", "Elegant"],
    desc: "An uplifted silhouette that adds instant presence and character.",
    image: "/images/frame_cateye.jpg",
    href: "/eyeglasses?shape=cat-eye",
    ariaLabel: "Shop cat-eye eyeglasses",
    imageScale: "scale-100",
  },
  {
    id: "aviator",
    name: "Aviator",
    tags: ["Iconic", "Timeless"],
    desc: "A relaxed, expansive frame with undeniable heritage.",
    image: "/images/frame_aviator.jpg",
    href: "/eyeglasses?shape=aviator",
    ariaLabel: "Shop aviator eyeglasses",
    imageScale: "scale-[1.15]", // Normalize visual scale so aviator isn't materially smaller
  },
];

export default function ShopBySilhouette() {
  return (
    <section className="w-full bg-background pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pb-24">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-xs font-sans tracking-[0.2em] uppercase text-foreground/50">
              Find your frame
            </h2>
            <h3 className="font-display text-5xl sm:text-6xl lg:text-[4rem] tracking-tight text-foreground leading-[1.05]">
              Start with a shape.
            </h3>
            <p className="text-xl text-foreground/70 font-sans max-w-lg mt-4">
              Explore rectangular, round, cat-eye, and aviator frames.
            </p>
          </div>
          
          <div className="shrink-0">
            <Link 
              href="/eyeglasses"
              className="group inline-flex items-center text-foreground hover:text-accent font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span className="underline underline-offset-4 decoration-foreground/30 group-hover:decoration-accent transition-colors">
                View all frames
              </span>
              <ArrowRight className="h-4 w-4 ml-2 transition-transform motion-safe:group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Mobile Strict Editorial Stack */}
        <div className="flex flex-col gap-16 lg:hidden pb-8">
          {SHAPES.map((shape, index) => (
            <Link 
              key={shape.id}
              href={shape.href}
              aria-label={shape.ariaLabel}
              className="group flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
            >
              {/* Image Container (Sharp edges, 4:5 ratio) */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted mb-6">
                <Image
                  src={shape.image}
                  alt={`${shape.name} style eyeglasses`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className={`object-cover object-center transition-transform duration-[1.2s] ease-[cubic-bezier(0.25,1,0.5,1)] motion-safe:group-hover:scale-105 ${shape.imageScale}`}
                />
                <div className="absolute inset-0 bg-foreground/0 transition-colors duration-700 group-hover:bg-foreground/5" />
              </div>
              
              {/* Editorial Meta block */}
              <div className="flex flex-col border-t border-foreground/20 pt-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-display text-4xl text-foreground tracking-tight">
                    {shape.name}
                  </h3>
                  <span className="text-[10px] font-sans font-medium tracking-widest uppercase text-foreground/40 mt-2">
                    0{index + 1} — 0{SHAPES.length}
                  </span>
                </div>
                
                <p className="font-sans text-sm text-foreground/70 mb-6 leading-relaxed">
                  {shape.desc}
                </p>

                <div className="flex items-end justify-between border-b border-foreground/10 pb-4">
                  <div className="flex gap-2 text-[10px] font-sans tracking-[0.2em] uppercase text-foreground/50">
                    {shape.tags.join(" / ")}
                  </div>
                  <ArrowRight className="h-5 w-5 text-foreground/30 transition-transform duration-500 group-hover:translate-x-2 group-hover:text-accent shrink-0" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Desktop Staggered Grid */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-x-8 pb-0">
          {SHAPES.map((shape, index) => (
            <Link 
              key={shape.id}
              href={shape.href}
              aria-label={shape.ariaLabel}
              className={`group flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background ${index % 2 !== 0 ? "mt-16" : ""}`}
            >
              {/* Image Container */}
              <div data-motion-media className="relative aspect-[4/5] w-full overflow-hidden bg-muted mb-8">
                <Image
                  src={shape.image}
                  alt={`${shape.name} style eyeglasses`}
                  fill
                  sizes="25vw"
                  className={`object-cover object-center transition-transform duration-[1.2s] ease-[cubic-bezier(0.25,1,0.5,1)] motion-safe:group-hover:scale-105 ${shape.imageScale}`}
                />
                <div className="absolute inset-0 bg-foreground/0 transition-colors duration-700 group-hover:bg-foreground/5" />
              </div>
              
              {/* Label */}
              <div className="flex items-end justify-between w-full border-b border-foreground/10 pb-4">
                <span className="font-display text-4xl text-foreground tracking-tight group-hover:text-accent transition-colors" aria-hidden="true">
                  {shape.name}
                </span>
                <ArrowRight className="h-5 w-5 text-foreground/30 transition-transform duration-500 motion-safe:group-hover:translate-x-2 group-hover:text-accent shrink-0 mb-1.5" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
