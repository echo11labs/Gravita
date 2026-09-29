import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background border-t border-foreground/10 px-4 sm:px-6 lg:px-8 py-16 lg:py-24 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col gap-16 lg:gap-24">
        
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          
          {/* Brand & Closing */}
          <div className="flex flex-col items-start max-w-md">
            <Link 
              href="/" 
              className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground transition-colors mb-6" 
              aria-label="Gravita Home"
            >
              <span className="font-logo text-3xl sm:text-[2.5rem] tracking-[0.1em] font-light leading-none">
                GRΛVITΛ
              </span>
            </Link>
            <p className="font-display text-2xl sm:text-3xl text-foreground mb-8">
              See things differently.
            </p>
            <Link 
              href="/eyeglasses" 
              className="group inline-flex items-center text-sm font-sans tracking-wide text-foreground/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 transition-colors rounded-sm"
            >
              <span className="underline underline-offset-4 decoration-transparent hover:decoration-foreground/30 transition-colors">
                Explore eyeglasses
              </span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>

          {/* Navigation & Social */}
          <div className="flex flex-col sm:flex-row gap-12 sm:gap-24 lg:gap-32">
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col space-y-4">
                <li>
                  <Link href="/eyeglasses" className="text-foreground/70 hover:text-foreground font-sans tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-sm py-1">
                    Eyeglasses
                  </Link>
                </li>
                <li>
                  <Link href="/sunglasses" className="text-foreground/70 hover:text-foreground font-sans tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-sm py-1">
                    Sunglasses
                  </Link>
                </li>
                <li>
                  <Link href="/find-your-frame" className="text-foreground/70 hover:text-foreground font-sans tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-sm py-1">
                    Find your frame
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-foreground/70 hover:text-foreground font-sans tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-sm py-1">
                    About
                  </Link>
                </li>
              </ul>
            </nav>

            <nav aria-label="Social navigation">
              <ul className="flex flex-col space-y-4">
                <li>
                  <a 
                    href="https://www.instagram.com/gravita.butwal/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center text-foreground/70 hover:text-foreground font-sans tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-sm py-1"
                  >
                    Instagram
                    <span className="sr-only"> (opens in a new tab)</span>
                    <ArrowRight className="ml-1 h-3 w-3 rotate-[-45deg]" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-foreground/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm font-sans tracking-wide text-foreground/50">
            © {currentYear} Gravita.
          </p>
        </div>
        
      </div>
    </footer>
  );
}
