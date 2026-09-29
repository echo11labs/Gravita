import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function GuidedSelection() {
  return (
    <section className="w-full bg-[#171917] text-[#F4F1EB]">
      {/* Desktop Layout: Asymmetrical Split */}
      <div className="hidden lg:grid grid-cols-12 max-w-[1440px] mx-auto min-h-[800px]">
        {/* Left Column: Content */}
        <div className="col-span-5 flex flex-col justify-center p-16 xl:p-24">
          <div className="flex flex-col">
            <h2 className="text-sm font-sans tracking-[0.2em] uppercase text-[#F4F1EB]/70 mb-8">
              Guided Selection
            </h2>
            <h3 className="font-display text-[clamp(3.5rem,4vw,4rem)] leading-[1.05] tracking-tight mb-8">
              Find the frame<br />that feels like you.
            </h3>
            <p className="text-lg text-[#F4F1EB]/80 font-sans max-w-md">
              Start with shape, fit, or everyday style.
            </p>
          </div>

          <div className="mt-10">
            <Link 
              href="/find-your-frame"
              className="group inline-flex items-center text-[#F4F1EB] font-medium tracking-wide py-3 -ml-1 px-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F1EB] focus-visible:ring-offset-2 focus-visible:ring-offset-[#171917]"
            >
              <span className="underline underline-offset-4 decoration-[#F4F1EB]/30 group-hover:decoration-[#F4F1EB] transition-colors">
                Explore the guide
              </span>
              <ArrowRight className="h-4 w-4 ml-2 transition-transform motion-safe:group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Right Column: Image + Selection Paths */}
        <div className="col-span-7 flex flex-col pt-16 pr-16 xl:pt-24 xl:pr-24 pb-16 xl:pb-24">
          <div className="relative w-full h-[600px] mb-12">
            <Image
              src="/images/guided_selection_desktop.jpg"
              alt="Person wearing premium eyeglasses in cool charcoal studio lighting"
              fill
              sizes="50vw"
              className="object-cover object-center"
            />
          </div>

          <div className="flex flex-col border-t border-[#F4F1EB]/20">
            <SelectionRow number="01" label="Face shape" href="/find-your-frame#face-shape" />
            <SelectionRow number="02" label="Frame fit" href="/find-your-frame#frame-fit" />
            <SelectionRow number="03" label="Everyday style" href="/find-your-frame#everyday-style" />
          </div>
        </div>
      </div>

      {/* Mobile Layout: Stacked */}
      <div className="flex flex-col lg:hidden w-full">
        <div className="px-6 py-12 sm:px-12 sm:py-16 flex flex-col">
          <h2 className="text-xs sm:text-sm font-sans tracking-[0.2em] uppercase text-[#F4F1EB]/70 mb-7">
            Guided Selection
          </h2>
          <h3 className="font-display text-4xl sm:text-5xl leading-[1.05] tracking-tight">
            Find the frame that feels like you.
          </h3>
        </div>

        <div className="relative w-full h-[55svh] min-h-[400px]">
          <Image
            src="/images/guided_selection_mobile.jpg"
            alt="Person wearing premium eyeglasses in cool charcoal studio lighting"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <div className="px-6 pt-10 pb-12 sm:px-12 flex flex-col">
          <p className="text-lg text-[#F4F1EB]/80 font-sans mb-8">
              Start with shape, fit, or everyday style.
            </p>
          <div>
            <Link 
              href="/find-your-frame"
              className="group inline-flex items-center text-[#F4F1EB] font-medium tracking-wide py-3 -ml-1 px-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F1EB] focus-visible:ring-offset-2 focus-visible:ring-offset-[#171917]"
            >
              <span className="underline underline-offset-4 decoration-[#F4F1EB]/30 group-hover:decoration-[#F4F1EB] transition-colors">
                Explore the guide
              </span>
              <ArrowRight className="h-4 w-4 ml-2 transition-transform motion-safe:group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col px-6 pb-12 sm:px-12 border-t border-[#F4F1EB]/20">
          <SelectionRow number="01" label="Face shape" href="/find-your-frame#face-shape" />
          <SelectionRow number="02" label="Frame fit" href="/find-your-frame#frame-fit" />
          <SelectionRow number="03" label="Everyday style" href="/find-your-frame#everyday-style" />
        </div>
      </div>
    </section>
  );
}

function SelectionRow({ number, label, href }: { number: string; label: string; href: string }) {
  return (
    <Link 
      href={href}
      className="group flex items-center justify-between py-6 sm:py-8 min-h-[56px] lg:min-h-[72px] border-b border-[#F4F1EB]/20 hover:border-[#F4F1EB]/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F1EB] focus-visible:ring-offset-2 focus-visible:ring-offset-[#171917] w-full"
    >
      <div className="flex items-baseline space-x-6">
        <span className="text-sm font-sans tracking-widest text-[#F4F1EB]/50 group-hover:text-[#F4F1EB]/70 transition-colors">
          {number}
        </span>
        <span className="text-2xl sm:text-3xl font-display tracking-tight text-[#F4F1EB]/80 group-hover:text-[#F4F1EB] transition-colors">
          {label}
        </span>
      </div>
      <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 text-[#F4F1EB]/50 group-hover:text-[#F4F1EB] transition-all motion-safe:group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  );
}
