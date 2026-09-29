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
      <section className="relative overflow-hidden bg-foreground px-4 pb-24 pt-28 text-background sm:px-6 sm:pt-36 lg:px-8 lg:pb-28">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-12 h-[28rem] w-[28rem] rounded-full border border-background/15 sm:-right-16 sm:h-[38rem] sm:w-[38rem]" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-2 top-40 h-64 w-64 rounded-full border border-background/10 sm:right-32 sm:top-56" />
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">

            {/* Left — headline block */}
            <div className="lg:col-span-7 space-y-8">
              <span className="text-xs font-sans tracking-[0.18em] uppercase text-background/55 block">
                Sunglasses · collection zero one
              </span>
              <h1 className="max-w-3xl font-display text-5xl sm:text-6xl lg:text-8xl tracking-[-0.05em] text-background leading-[0.94]">
                A different view<br className="hidden sm:block" /> of the light.
              </h1>
              <p className="font-sans text-xl text-background/72 leading-relaxed max-w-lg">
                Our sunglasses collection is taking shape. We&rsquo;ll have
                more to show soon.
              </p>
              <Link
                href="/eyeglasses"
                className="group inline-flex items-center gap-3 border-b border-background/35 pb-2 text-sm font-sans tracking-wide text-background hover:border-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background transition-colors rounded-sm"
              >
                <span>Explore eyeglasses in the meantime</span>
                <ArrowRight className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-1 shrink-0" aria-hidden="true" />
              </Link>
            </div>

            <div className="lg:col-span-5 hidden lg:flex flex-col gap-8 self-end pb-1">
              <div className="border-t border-background/20 pt-7 space-y-3">
                <p className="text-xs font-sans text-background/45 tracking-[0.16em] uppercase">
                  In development
                </p>
                <p className="font-display text-3xl text-background/75 tracking-tight leading-snug max-w-sm">
                  A quieter lens for brighter days.
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs font-sans tracking-[0.16em] uppercase text-background/45">
                <span className="h-2 w-2 rounded-full bg-accent" />
                More to come
              </div>
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
