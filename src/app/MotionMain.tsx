"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type MotionMainProps = {
  children: ReactNode;
};

export default function MotionMain({ children }: MotionMainProps) {
  const mainRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
      anchors: true,
      respectReducedMotion: true,
    });

    const removeScrollListener = lenis.on("scroll", ScrollTrigger.update);

    return () => {
      removeScrollListener();
      lenis.destroy();
    };
  }, []);

  useGSAP(
    () => {
      const root = mainRef.current;
      if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const headline = root.querySelector<HTMLElement>("h1");
      const sections = Array.from(root.querySelectorAll<HTMLElement>("section, [data-motion-section]"))
        .filter((section) => !headline || !section.contains(headline));
      const media = Array.from(root.querySelectorAll<HTMLElement>("[data-motion-media]"));

      if (headline) {
        gsap.fromTo(
          headline,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", clearProps: "transform,opacity,visibility" }
        );
      }

      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: {
              trigger: section,
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      media.forEach((element) => {
        gsap.fromTo(
          element,
          { scale: 0.96, autoAlpha: 0.7 },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 1.15,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: {
              trigger: element,
              start: "top 84%",
              once: true,
            },
          }
        );
      });

      const refreshId = window.requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => window.cancelAnimationFrame(refreshId);
    },
    { scope: mainRef, dependencies: [pathname], revertOnUpdate: true }
  );

  return (
    <main
      ref={mainRef}
      id="main-content"
      className="flex flex-grow flex-col overflow-x-clip"
    >
      {children}
    </main>
  );
}
