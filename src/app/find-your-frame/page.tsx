"use client";

import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

const STEPS = [
  {
    id: "face-shape",
    number: "01",
    title: "Face shape",
    description: "Explore shapes that balance and complement your features.",
    nextTitle: "Discover shapes",
    nextText: "Our collection offers considered geometry—from classic rectangular frames to soft, balanced curves. Browse the full range to see how each silhouette is proportioned.",
  },
  {
    id: "frame-fit",
    number: "02",
    title: "Frame fit",
    description: "Start with the proportions and feel that suit your day.",
    nextTitle: "Find your fit",
    nextText: "Comfort begins with precise measurements. Explore our frames, noting bridge widths and temple lengths designed to provide a secure, effortless fit.",
  },
  {
    id: "everyday-style",
    number: "03",
    title: "Everyday style",
    description: "Browse frames by the way you want to wear them.",
    nextTitle: "Explore styles",
    nextText: "Whether you prefer subtle understatement or confident presence, our collection is curated to match your aesthetic. Discover frames defined by their finish and material.",
  },
];

function GuideContent() {
  const searchParams = useSearchParams();
  const requestedStep = searchParams.get("step");
  const currentStep = STEPS.some((step) => step.id === requestedStep)
    ? requestedStep
    : STEPS[0].id;

  return (
    <div className="flex flex-col border-t border-[#F4F1EB]/20">
      {STEPS.map((step) => {
        const isActive = currentStep === step.id;
        
        return (
          <div key={step.id} className="flex flex-col border-b border-[#F4F1EB]/20">
            <Link 
              href={`/find-your-frame?step=${step.id}`}
              className={`
                group flex items-start sm:items-center justify-between py-8 sm:py-12 transition-colors duration-300
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F1EB] focus-visible:ring-offset-2 focus-visible:ring-offset-[#171917]
                ${isActive ? "text-[#F4F1EB]" : "text-[#F4F1EB]/50 hover:text-[#F4F1EB]/80"}
              `}
              aria-current={isActive ? "step" : undefined}
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:space-x-8 lg:space-x-12 w-full pr-8">
                <span className="text-sm font-sans tracking-widest mb-4 sm:mb-0 w-8 shrink-0">
                  {step.number}
                </span>
                
                <div className="flex flex-col space-y-4 sm:max-w-2xl">
                  <h2 className={`font-display text-3xl sm:text-4xl tracking-tight transition-colors ${isActive ? "text-[#F4F1EB]" : "text-[#F4F1EB]/80 group-hover:text-[#F4F1EB]"}`}>
                    {step.title}
                  </h2>
                  <p className={`font-sans text-base sm:text-lg leading-relaxed transition-colors ${isActive ? "text-[#F4F1EB]/90" : "text-[#F4F1EB]/60 group-hover:text-[#F4F1EB]/80"}`}>
                    {step.description}
                  </p>
                </div>
              </div>
              
              <div className="shrink-0 self-center">
                <div className={`h-3 w-3 rounded-full transition-all duration-300 ${isActive ? "bg-[#F4F1EB]" : "bg-transparent border border-[#F4F1EB]/30 group-hover:border-[#F4F1EB]/60"}`} aria-hidden="true" />
              </div>
            </Link>

            {/* Active State Details */}
            {isActive && (
              <div className="pl-0 sm:pl-[4.5rem] lg:pl-[5.5rem] pb-10 sm:pb-12 pr-8 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="bg-[#1f221f] p-8 sm:p-10 border border-[#F4F1EB]/10">
                  <h3 className="font-display text-2xl tracking-tight text-[#F4F1EB] mb-4">
                    {step.nextTitle}
                  </h3>
                  <p className="font-sans text-[#F4F1EB]/80 leading-relaxed max-w-2xl mb-8">
                    {step.nextText}
                  </p>
                  
                  <Link 
                    href="/eyeglasses"
                    className="group inline-flex items-center text-[#F4F1EB] font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F1EB] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1f221f]"
                  >
                    <span className="underline underline-offset-4 decoration-[#F4F1EB]/30 group-hover:decoration-[#F4F1EB] transition-colors">
                      Browse all eyeglasses
                    </span>
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform motion-safe:group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function FindYourFramePage() {
  return (
    <div className="min-h-screen bg-[#171917] text-[#F4F1EB] pt-16 sm:pt-24 pb-32">
      <div className="max-w-4xl mx-auto px-6 sm:px-12 lg:px-20">
        <div className="space-y-6 mb-16 sm:mb-24">
          <h1 className="text-xs sm:text-sm font-sans tracking-[0.2em] uppercase text-[#F4F1EB]/70">
            Find your frame
          </h1>
          <h2 className="font-display text-[clamp(3rem,5vw,5rem)] tracking-tight text-[#F4F1EB] leading-[1.05]">
            Start with what feels right.
          </h2>
          <p className="text-lg sm:text-xl text-[#F4F1EB]/80 font-sans max-w-xl">
            Choose a starting point and explore frames at your own pace.
          </p>
        </div>

        <Suspense fallback={<div className="h-[600px] animate-pulse bg-[#1f221f] rounded-sm" />}>
          <GuideContent />
        </Suspense>
      </div>
    </div>
  );
}
