"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    id: "face-shape",
    number: "01",
    title: "Face shape",
    description: "Explore shapes that balance and complement your features.",
    nextTitle: "Discover shapes",
    nextText: "Our collection offers balanced geometry—from classic rectangular frames to soft curves. Browse the full range to see how each silhouette is proportioned.",
    image: "/images/guide-face-shape.webp",
    imageAlt: "Front-facing portrait showing how a clear optical frame relates to facial proportions",
    imagePosition: "object-center",
  },
  {
    id: "frame-fit",
    number: "02",
    title: "Frame fit",
    description: "Start with the proportions and feel that suit your day.",
    nextTitle: "Find your fit",
    nextText: "Comfort begins with precise measurements. Explore our frames, noting bridge widths and temple lengths designed to provide a secure, effortless fit.",
    image: "/images/guide-frame-fit.webp",
    imageAlt: "Optician adjusting the temple of a clear-lens frame for a precise, comfortable fit",
    imagePosition: "object-center",
  },
  {
    id: "everyday-style",
    number: "03",
    title: "Everyday style",
    description: "Browse frames by the way you want to wear them.",
    nextTitle: "Explore styles",
    nextText: "Whether you prefer subtle understatement or confident presence, our collection is curated to match your aesthetic. Discover frames defined by their finish and material.",
    image: "/images/guide-everyday-style.webp",
    imageAlt: "Reader wearing tortoiseshell eyeglasses during a quiet morning in a bookshop cafe",
    imagePosition: "object-[50%_42%]",
  },
];

export default function FindYourFramePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      // Hero Animation
      const heroTl = gsap.timeline();
      heroTl.fromTo(
        ".hero-element",
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1.2, stagger: 0.15, ease: "power3.out" }
      );

      // Parallax Stack Animations
      gsap.utils.toArray<HTMLElement>(".parallax-section").forEach((section) => {
        const image = section.querySelector(".parallax-image");
        const content = section.querySelector(".parallax-content");

        // 1. True Parallax on the image (moves slower than the scroll)
        // Image needs to be larger than the container for this to work without showing edges
        gsap.to(image, {
          yPercent: 15, // Move image down as we scroll down
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom", 
            end: "bottom top",
            scrub: true
          }
        });

        // 2. Fade up the text content when the section enters
        gsap.fromTo(content,
          { y: 60, autoAlpha: 0 },
          { 
            y: 0, 
            autoAlpha: 1, 
            duration: 1.2, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 60%", // Trigger when top of section hits 60% down the viewport
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-[#171917] text-[#F4F1EB]">
      
      {/* 100vh Hero Section */}
      <section className="relative w-full h-[100svh] flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-4xl mx-auto space-y-8 mt-16">
          <h1 className="hero-element text-xs sm:text-sm font-sans tracking-[0.2em] uppercase text-[#F4F1EB]/50">
            Find your frame
          </h1>
          <h2 className="hero-element font-display text-[clamp(3.5rem,7vw,7rem)] tracking-tight text-[#F4F1EB] leading-[1.05]">
            Start with what<br />feels right.
          </h2>
          <p className="hero-element text-xl sm:text-2xl text-[#F4F1EB]/70 font-sans max-w-2xl mx-auto leading-relaxed">
            A guide to finding clarity in proportion, fit, and style.
          </p>
        </div>
        
        {/* Scroll Indicator */}
        <div className="hero-element absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#F4F1EB]/30">Scroll</span>
          <div className="w-[1px] h-16 bg-[#F4F1EB]/10 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-[#F4F1EB]/50 animate-[scroll-down_2s_ease-in-out_infinite]" />
          </div>
        </div>
      </section>

      {/* Full-Bleed Parallax Stack */}
      {STEPS.map((step) => (
        <section 
          key={step.id} 
          id={step.id}
          className="parallax-section relative w-full h-[100svh] overflow-hidden flex flex-col justify-end"
        >
          {/* Image Background (Taller than viewport for parallax) */}
          <div className="absolute inset-x-0 -top-[10%] h-[120%] w-full z-0 pointer-events-none">
            <Image
              src={step.image}
              alt={step.imageAlt}
              fill
              sizes="100vw"
              className={`parallax-image object-cover ${step.imagePosition}`}
            />
            {/* Architectural Overlay for Text Legibility (No gradients, pure solid opacity) */}
            <div className="absolute inset-0 bg-[#171917]/50 mix-blend-multiply" />
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* Foreground Text Content */}
          <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 pb-24 sm:pb-32 parallax-content">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
              
              {/* Left Title Area */}
              <div className="lg:col-span-5 flex flex-col justify-end">
                <span className="text-sm font-sans tracking-[0.2em] uppercase text-[#F4F1EB]/50 mb-6 block">
                  Step {step.number}
                </span>
                <h3 className="font-display text-[clamp(3.5rem,5vw,5.5rem)] tracking-tight text-[#F4F1EB] leading-[1.05]">
                  {step.title}
                </h3>
              </div>

              {/* Right Content Area */}
              <div className="lg:col-span-6 lg:col-start-7 flex flex-col justify-end space-y-8">
                <h4 className="font-display text-2xl sm:text-3xl tracking-tight text-[#F4F1EB]">
                  {step.nextTitle}
                </h4>
                <p className="font-sans text-xl sm:text-2xl text-[#F4F1EB]/90 leading-relaxed max-w-xl">
                  {step.nextText}
                </p>
                <div className="pt-4">
                  <Link
                    href="/eyeglasses"
                    className="group inline-flex items-center text-[#F4F1EB] font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F1EB] focus-visible:ring-offset-2 focus-visible:ring-offset-[#171917]"
                  >
                    <span className="underline underline-offset-4 decoration-[#F4F1EB]/30 group-hover:decoration-[#F4F1EB] transition-colors">
                      Browse all eyeglasses
                    </span>
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform motion-safe:group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>
      ))}

      {/* Global CSS animation for scroll indicator */}
      <style jsx global>{`
        @keyframes scroll-down {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(200%); opacity: 0; }
        }
      `}</style>
    </main>
  );
}
