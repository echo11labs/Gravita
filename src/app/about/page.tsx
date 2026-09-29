import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | GRAVITA",
  description: "Gravita is built around a simple idea: eyewear should feel considered, personal, and easy to live with.",
};

const PRINCIPLES = [
  {
    number: "01",
    title: "Shape",
    body: "Start with the outline that feels natural to you.",
  },
  {
    number: "02",
    title: "Balance",
    body: "Notice how proportion changes the way a frame sits on the face.",
  },
  {
    number: "03",
    title: "Presence",
    body: "Choose a frame that feels at home in the rest of your day.",
  },
];

export default function AboutPage() {
  return (
    <article className="flex-grow bg-background text-foreground">

      {/* ── SECTION 1: Editorial Hero ───────────────────────────────── */}
      <section className="border-b border-foreground/10 bg-[#E5E9E0] px-4 pb-0 pt-28 sm:px-6 sm:pt-36 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Text block */}
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-sans tracking-[0.18em] uppercase text-foreground/50 block mb-6">
              Gravita, in practice
            </span>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl tracking-[-0.05em] text-foreground leading-[0.96] mb-10">
              A clearer way to see what matters.
            </h1>
            <p className="font-sans text-xl sm:text-2xl text-foreground/80 leading-relaxed max-w-xl">
              Gravita is built around a simple idea: eyewear should feel
              personal and easy to live with.
            </p>
          </div>

          {/* Hero image — full-width within content shell */}
          <div data-motion-media className="relative w-full overflow-hidden">
            {/* Desktop: wide 16:9 */}
            <div className="relative hidden sm:block w-full aspect-[16/9]">
              <Image
                src="/images/about_editorial.jpg"
                alt="Person wearing understated optical eyeglasses in a quiet architectural setting with warm natural light"
                fill
                priority
                sizes="(min-width: 640px) 100vw"
                className="object-cover object-[60%_30%]"
              />
            </div>
            {/* Mobile: portrait crop of the same image */}
            <div className="relative block sm:hidden w-full aspect-[4/5]">
              <Image
                src="/images/about_editorial.jpg"
                alt="Person wearing understated optical eyeglasses in a quiet architectural setting with warm natural light"
                fill
                priority
                sizes="100vw"
                className="object-cover object-[65%_25%]"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 2: The Way We Choose ───────────────────────────── */}
      <section className="pt-20 lg:pt-28 px-4 sm:px-6 lg:px-8 border-t border-foreground/10 mt-20">
        <div className="max-w-7xl mx-auto">

          {/* Desktop: sticky label left / rows right */}
          <div className="hidden lg:grid grid-cols-12 gap-12 pb-20">
            {/* Left label column */}
            <div className="col-span-4">
              <div className="sticky top-36">
                <span className="text-xs font-sans tracking-[0.2em] uppercase text-foreground/50 block mb-6">
                  The way we choose
                </span>
                <h2 className="font-display text-4xl tracking-tight text-foreground leading-[1.1]">
                  Three ways<br />to begin.
                </h2>
                <div className="mt-10">
                  <Link
                    href="/find-your-frame"
                    className="group inline-flex items-center text-sm font-sans tracking-wide text-foreground/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground transition-colors rounded-sm"
                  >
                    <span className="underline underline-offset-4 decoration-transparent hover:decoration-foreground/30 transition-colors">
                      Find your frame
                    </span>
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform motion-safe:group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right rows column */}
            <div className="col-span-8 border-t border-foreground/10">
              {PRINCIPLES.map((p) => (
                <div
                  key={p.number}
                  className="flex items-baseline gap-12 py-10 border-b border-foreground/10"
                >
                  <span className="text-sm font-sans tracking-widest text-foreground/40 shrink-0 w-8">
                    {p.number}
                  </span>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-12 flex-1">
                    <h3 className="font-display text-3xl lg:text-4xl tracking-tight text-foreground shrink-0 mb-3 sm:mb-0 min-w-[8rem]">
                      {p.title}
                    </h3>
                    <p className="font-sans text-lg text-foreground/70 leading-relaxed">
                      {p.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: stacked */}
          <div className="lg:hidden pb-16">
            <span className="text-xs font-sans tracking-[0.2em] uppercase text-foreground/50 block mb-6">
              The way we choose
            </span>
            <h2 className="font-display text-4xl tracking-tight text-foreground leading-[1.1] mb-12">
              Three ways to begin.
            </h2>
            <div className="border-t border-foreground/10">
              {PRINCIPLES.map((p) => (
                <div
                  key={p.number}
                  className="flex items-start gap-6 py-8 border-b border-foreground/10"
                >
                  <span className="text-sm font-sans tracking-widest text-foreground/40 shrink-0 pt-1">
                    {p.number}
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display text-2xl tracking-tight text-foreground">
                      {p.title}
                    </h3>
                    <p className="font-sans text-base text-foreground/70 leading-relaxed">
                      {p.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link
                href="/find-your-frame"
                className="group inline-flex items-center text-sm font-sans tracking-wide text-foreground/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground transition-colors rounded-sm"
              >
                <span className="underline underline-offset-4 decoration-transparent hover:decoration-foreground/30 transition-colors">
                  Find your frame
                </span>
                <ArrowRight className="h-4 w-4 ml-2 transition-transform motion-safe:group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 3: Closing Editorial Panel ─────────────────────── */}
      <section className="border-t border-foreground/10">
        {/* Desktop: 5/12 image + 7/12 content split — reversed proportion from EditorialPanel */}
        <div className="hidden lg:flex flex-row min-h-[640px]">
          {/* Image */}
          <div className="w-5/12 relative min-h-[640px]">
            <Image
              src="/images/about_editorial.jpg"
              alt="Person in a quiet architectural space wearing Gravita eyewear"
              fill
              sizes="42vw"
              className="object-cover object-[80%_20%]"
            />
          </div>
          {/* Content */}
          <div className="w-7/12 flex items-center justify-center p-16 xl:p-24 bg-background">
            <div className="max-w-lg w-full flex flex-col space-y-8">
              <div className="space-y-6">
                <span className="text-xs font-sans tracking-[0.2em] uppercase text-foreground/50 block">
                  The way we choose
                </span>
                <h2 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.1] tracking-tight text-foreground">
                  Frames that belong in your day.
                </h2>
                <p className="text-lg text-foreground/80 font-sans leading-relaxed">
                  From the first thing you reach for in the morning to the
                  places you go after, eyewear becomes part of the rhythm
                  around you.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/eyeglasses"
                  className="group inline-flex items-center justify-between px-8 py-4 bg-foreground text-background font-medium tracking-wide transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <span>Explore eyeglasses</span>
                  <ArrowRight className="h-4 w-4 ml-4 transition-transform motion-safe:group-hover:translate-x-1 shrink-0" aria-hidden="true" />
                </Link>
                <Link
                  href="/find-your-frame"
                  className="inline-flex items-center justify-center px-8 py-4 border border-foreground/20 text-foreground font-medium tracking-wide transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Find your frame
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: image then content */}
        <div className="flex flex-col lg:hidden">
          <div className="relative w-full aspect-[3/2]">
            <Image
              src="/images/about_editorial.jpg"
              alt="Person in a quiet architectural space wearing Gravita eyewear"
              fill
              sizes="100vw"
              className="object-cover object-[70%_20%]"
            />
          </div>
          <div className="px-4 sm:px-6 py-16 bg-background flex flex-col space-y-8 max-w-2xl">
            <div className="space-y-6">
              <span className="text-xs font-sans tracking-[0.2em] uppercase text-foreground/50 block">
                The way we choose
              </span>
              <h2 className="font-display text-4xl tracking-tight text-foreground leading-[1.1]">
                Frames that belong in your day.
              </h2>
              <p className="text-lg text-foreground/80 font-sans leading-relaxed">
                From the first thing you reach for in the morning to the places
                you go after, eyewear becomes part of the rhythm around you.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Link
                href="/eyeglasses"
                className="group inline-flex items-center justify-between px-8 py-4 bg-foreground text-background font-medium tracking-wide transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span>Explore eyeglasses</span>
                <ArrowRight className="h-4 w-4 ml-4 transition-transform motion-safe:group-hover:translate-x-1 shrink-0" aria-hidden="true" />
              </Link>
              <Link
                href="/find-your-frame"
                className="inline-flex items-center justify-center px-8 py-4 border border-foreground/20 text-foreground font-medium tracking-wide transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Find your frame
              </Link>
            </div>
          </div>
        </div>
      </section>

    </article>
  );
}
