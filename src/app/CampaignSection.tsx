import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CampaignSection() {
  return (
    <section className="w-full bg-background border-t border-foreground/10 pt-20 lg:pt-28 pb-20 lg:pb-28">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Strip */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 lg:mb-16 gap-8">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-xs sm:text-sm font-sans tracking-[0.2em] uppercase text-foreground/70">
              The Collection
            </h2>
            <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight text-foreground leading-[1.05]">
              Shared perspectives.
            </h3>
          </div>
          <p className="font-sans text-lg text-foreground/80 max-w-sm md:text-right leading-relaxed">
            Distinct shapes united by a disciplined approach to proportion. Designed for the spaces we share.
          </p>
        </div>

        {/* 4K Image Container */}
        <div className="relative w-full aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9] bg-foreground/5 overflow-hidden">
          <Image
            src="/images/group.png"
            alt="Group of people wearing Gravita frames in an architectural setting"
            fill
            sizes="100vw"
            className="object-cover object-[50%_40%]"
          />
        </div>

        {/* Footer Strip */}
        <div className="mt-8 lg:mt-12 flex justify-end">
           <Link 
              href="/eyeglasses"
              className="group inline-flex items-center text-foreground font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span className="underline underline-offset-4 decoration-foreground/30 group-hover:decoration-foreground transition-colors">
                Explore the collection
              </span>
              <ArrowRight className="h-4 w-4 ml-2 transition-transform motion-safe:group-hover:translate-x-1" aria-hidden="true" />
            </Link>
        </div>
      </div>
    </section>
  );
}
