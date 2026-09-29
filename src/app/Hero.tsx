import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full flex flex-col lg:flex-row bg-background lg:h-[calc(100vh-5rem)] lg:min-h-[600px] lg:max-h-[900px]">
      
      {/* Mobile Image (renders top on mobile) */}
      <div data-motion-media className="w-full relative block lg:hidden h-[45svh] min-h-[350px] max-h-[500px]">
        <Image
          src="/images/hero-mobile.png"
          alt="Model wearing contemporary premium eyewear in a modern, sleek setting"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 0vw"
          className="object-cover object-center"
        />
      </div>

      {/* Content Half */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-20 order-2 lg:order-1 lg:h-full bg-background">
        <div className="w-full max-w-lg flex flex-col space-y-8 lg:-mt-12">
          <div className="space-y-4 lg:space-y-6">
            <h1 className="font-display text-5xl sm:text-6xl lg:text-[4.5rem] leading-[1.05] tracking-tight text-foreground">
              See things differently.
            </h1>
            <p className="text-lg sm:text-xl text-foreground/80 font-sans leading-relaxed max-w-[90%]">
              Eyewear shaped for the way you move through the world.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            {/* Primary CTA */}
            <Link
              href="/eyeglasses"
              className="group flex sm:flex-1 items-center justify-between px-8 py-4 bg-foreground text-background font-medium tracking-wide transition-colors duration-300 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background whitespace-nowrap"
            >
              <span>Shop eyewear</span>
              <ArrowRight className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-1 shrink-0 ml-4" aria-hidden="true" />
            </Link>
            {/* Secondary CTA */}
            <Link
              href="/sunglasses"
              className="flex sm:flex-1 items-center justify-center px-8 py-4 border border-foreground text-foreground font-medium tracking-wide transition-colors duration-300 hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background whitespace-nowrap"
            >
              <span>Explore sunglasses</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop Image (renders right on desktop) */}
      <div data-motion-media className="w-full lg:w-1/2 h-full relative hidden lg:block order-1 lg:order-2">
        <Image
          src="/images/hero.png"
          alt="Model wearing contemporary premium eyewear in a modern, sleek setting"
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 0vw"
          className="object-cover object-[75%_center]"
        />
      </div>
    </section>
  );
}
