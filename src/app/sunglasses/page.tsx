import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sunglasses | GRAVITA",
  description: "Our sunglasses collection is taking shape. Explore optical frames in the meantime.",
};

const SHAPES = [
  { label: "Rectangular", image: "/images/frame_rectangular.jpg", href: "/eyeglasses?shape=rectangular" },
  { label: "Round",       image: "/images/frame_round.jpg",        href: "/eyeglasses?shape=round"        },
  { label: "Cat-eye",     image: "/images/frame_cateye.jpg",       href: "/eyeglasses?shape=cat-eye"      },
  { label: "Aviator",     image: "/images/frame_aviator.jpg",      href: "/eyeglasses?shape=aviator"      },
];

export default function SunglassesPage() {
  return (
    <div className="flex-grow bg-background text-foreground">

      {/* ── SECTION 1: Editorial opening ───────────────────────────── */}
      <section className="relative isolate min-h-[80vh] sm:min-h-[85vh] overflow-hidden bg-foreground text-background">
        <div
          data-motion-media
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-[url('/images/sunglasses-hero-mobile.png')] bg-cover bg-center lg:bg-[url('/images/sunglasses-hero-desktop.png')]"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent lg:bg-gradient-to-r lg:from-foreground/90 lg:via-foreground/40 lg:to-transparent" />

        <div className="mx-auto flex h-full min-h-[80vh] sm:min-h-[85vh] max-w-[1440px] items-end px-4 pb-12 pt-32 sm:px-6 sm:pb-16 lg:px-8 lg:pb-24">
          <div className="grid w-full grid-cols-1 lg:grid-cols-12">
            <div className="flex flex-col gap-6 lg:gap-8 lg:col-span-8">
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-background/50 block">
                Sunglasses — Collection Zero One
              </span>
              
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] tracking-tight text-background">
                A different view<br className="hidden sm:block" /> of the light.
              </h1>
              
              <p className="max-w-sm font-sans text-sm sm:text-base leading-relaxed text-background/70">
                Our sunglasses collection is taking shape. We&rsquo;ll have more to show soon.
              </p>
              
              <Link
                href="/eyeglasses"
                className="group inline-flex items-center gap-3 border-b border-background/30 pb-2 text-[10px] font-sans font-medium uppercase tracking-[0.15em] text-background hover:border-background focus-visible:outline-none transition-colors self-start mt-2"
              >
                <span>Explore Eyeglasses</span>
                <ArrowRight className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-1 shrink-0" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: Eyeglasses shape bridge ─────────────────────── */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div className="space-y-3">
              <span className="text-xs font-sans tracking-[0.2em] uppercase text-foreground/50 block">
                While you wait
              </span>
              <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-foreground leading-[1.1]">
                Start with a shape.
              </h2>
            </div>
            <Link
              href="/eyeglasses"
              className="group inline-flex items-center gap-2 text-sm font-sans tracking-wide text-foreground/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground transition-colors rounded-sm self-start sm:self-auto shrink-0"
            >
              <span className="underline underline-offset-4 decoration-transparent group-hover:decoration-foreground/30 transition-colors">
                View all eyeglasses
              </span>
              <ArrowRight className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-1 shrink-0" aria-hidden="true" />
            </Link>
          </div>

          {/* 4-up shape grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {SHAPES.map((shape) => (
              <Link
                key={shape.label}
                href={shape.href}
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label={`Browse ${shape.label} eyeglasses`}
              >
                {/* Image */}
                <div data-motion-media className="relative aspect-square overflow-hidden bg-foreground/5 mb-4">
                  <Image
                    src={shape.image}
                    alt={`${shape.label} frame silhouette`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
                  />
                </div>
                {/* Label row */}
                <div className="flex items-center justify-between">
                  <span className="font-sans text-sm text-foreground tracking-wide">
                    {shape.label}
                  </span>
                  <ArrowRight
                    className="h-3.5 w-3.5 text-foreground/40 transition-transform motion-safe:group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 3: Closing strip ────────────────────────────────── */}
      <section className="border-t border-foreground/10 py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
            <div className="space-y-2">
              <p className="text-xs font-sans tracking-[0.2em] uppercase text-foreground/40">
                Find your frame
              </p>
              <p className="font-display text-2xl sm:text-3xl tracking-tight text-foreground leading-snug max-w-md">
                Not sure where to start? The guide will help.
              </p>
            </div>
            <Link
              href="/find-your-frame"
              className="group inline-flex items-center justify-between gap-4 px-8 py-4 bg-foreground text-background font-sans font-medium tracking-wide transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background shrink-0"
            >
              <span>Find your frame</span>
              <ArrowRight className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
