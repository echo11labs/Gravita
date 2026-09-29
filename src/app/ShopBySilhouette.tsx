import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const SHAPES = [
  {
    id: "rectangular",
    name: "Rectangular",
    image: "/images/frame_rectangular.jpg",
    href: "/eyeglasses?shape=rectangular",
    ariaLabel: "Shop rectangular eyeglasses",
    imageScale: "scale-100",
  },
  {
    id: "round",
    name: "Round",
    image: "/images/frame_round.jpg",
    href: "/eyeglasses?shape=round",
    ariaLabel: "Shop round eyeglasses",
    imageScale: "scale-100",
  },
  {
    id: "cat-eye",
    name: "Cat-eye",
    image: "/images/frame_cateye.jpg",
    href: "/eyeglasses?shape=cat-eye",
    ariaLabel: "Shop cat-eye eyeglasses",
    imageScale: "scale-100",
  },
  {
    id: "aviator",
    name: "Aviator",
    image: "/images/frame_aviator.jpg",
    href: "/eyeglasses?shape=aviator",
    ariaLabel: "Shop aviator eyeglasses",
    imageScale: "scale-[1.15]", // Normalize visual scale so aviator isn't materially smaller
  },
];

export default function ShopBySilhouette() {
  return (
    <section className="w-full bg-background pt-16 pb-16 sm:pt-24 sm:pb-20 lg:pb-24">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-sm font-sans tracking-widest uppercase text-foreground/70">
              Find your frame
            </h2>
            <h3 className="font-display text-4xl sm:text-5xl tracking-tight text-foreground leading-[1.1]">
              Start with a shape.
            </h3>
            <p className="text-lg text-foreground/80 font-sans max-w-lg">
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

        {/* Grid Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:gap-x-8">
          {SHAPES.map((shape) => (
            <Link 
              key={shape.id}
              href={shape.href}
              aria-label={shape.ariaLabel}
              className="group flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {/* Image Container */}
              <div data-motion-media className="relative aspect-square w-full overflow-hidden bg-muted mb-4">
                <Image
                  src={shape.image}
                  alt={`${shape.name} style eyeglasses`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className={`object-cover object-center transition-transform duration-700 motion-safe:group-hover:scale-[1.03] ${shape.imageScale}`}
                />
              </div>
              
              {/* Label */}
              <div className="flex items-center justify-between w-full">
                <span className="font-medium text-foreground tracking-wide group-hover:text-accent transition-colors" aria-hidden="true">
                  {shape.name}
                </span>
                <ArrowRight className="h-4 w-4 text-foreground/50 transition-transform duration-300 motion-safe:group-hover:translate-x-1 group-hover:text-accent shrink-0 ml-2" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
