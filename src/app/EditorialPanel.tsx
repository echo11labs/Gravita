import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function EditorialPanel() {
  return (
    <section className="w-full bg-background flex flex-col lg:flex-row border-t border-foreground/10">
      
      {/* Image Half */}
      <div className="w-full lg:w-7/12 relative flex-shrink-0">
        {/* Mobile Image (Portrait) */}
        <div className="relative w-full h-[55svh] min-h-[400px] lg:hidden">
          <Image
            src="/images/editorial_mobile.jpg"
            alt="Person wearing Gravita eyewear in an architectural setting"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        
        {/* Desktop Image (Landscape / Wide) */}
        <div className="relative hidden lg:block w-full h-full min-h-[600px]">
          <Image
            src="/images/editorial_desktop.jpg"
            alt="Wide architectural portrait of a person wearing Gravita eyewear"
            fill
            sizes="60vw"
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* Text Half */}
      <div className="w-full lg:w-5/12 flex items-center justify-center p-8 sm:p-16 lg:p-20 xl:p-24 bg-background">
        <div className="w-full max-w-md flex flex-col space-y-8">
          
          <div className="space-y-6">
            <h2 className="text-xs sm:text-sm font-sans tracking-[0.2em] uppercase text-foreground/70">
              Our Point of View
            </h2>
            
            <h3 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.1] tracking-tight text-foreground">
              Designed for the way you look at the world.
            </h3>
            
            <p className="text-lg text-foreground/80 font-sans leading-relaxed">
              Gravita brings considered forms and everyday clarity into focus. Frames with presence, made for the moments that shape a day.
            </p>
          </div>
          
          <div className="pt-4">
            <Link 
              href="/about"
              className="group inline-flex items-center text-foreground font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span className="underline underline-offset-4 decoration-foreground/30 group-hover:decoration-accent transition-colors">
                About Gravita
              </span>
              <ArrowRight className="h-4 w-4 ml-2 transition-transform motion-safe:group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>

        </div>
      </div>
      
    </section>
  );
}
