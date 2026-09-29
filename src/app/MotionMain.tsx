"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

  useEffect(() => {
    const root = mainRef.current;
    const isHydrationSensitivePage =
      pathname.startsWith("/eyeglasses") || pathname.startsWith("/find-your-frame");
    if (
      !root ||
      isHydrationSensitivePage ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let refreshId: number | undefined;
    const context = gsap.context(() => {
      const headline = Array.from(root.querySelectorAll<HTMLElement>("h1")).find(
        (element) => !element.closest("[data-custom-motion]")
      );
      const sections = Array.from(root.querySelectorAll<HTMLElement>("section, [data-motion-section]"))
        .filter(
          (section) =>
            !section.closest("[data-custom-motion]") &&
            (!headline || !section.contains(headline))
        );
      const media = Array.from(root.querySelectorAll<HTMLElement>("[data-motion-media]"))
        .filter((element) => !element.closest("[data-custom-motion]"));

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

      refreshId = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    }, root);

    return () => {
      if (refreshId !== undefined) window.cancelAnimationFrame(refreshId);
      context.revert();
    };
  }, [pathname]);

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
