"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import AboutStatement from "./AboutStatement";
import AboutHeadline from "./AboutHeadline";
import AboutCTA from "./AboutCTA";

export default function AboutPanel() {
  const panelRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const animatedElements = [
        ".about-animate-num",
        ".about-animate-statement",
        ".about-headline-line",
        ".about-blue-word",
        ".about-animate-cta",
      ];

      if (prefersReducedMotion) {
        gsap.set(animatedElements, { opacity: 1, y: 0, yPercent: 0 });
        return;
      }

      // Initial setup for GSAP reveal
      gsap.set(".about-animate-num", { opacity: 0, y: -8 });
      gsap.set(".about-animate-statement", { opacity: 0, y: 16 });
      gsap.set(".about-headline-line", { yPercent: 110 });
      gsap.set(".about-animate-cta", { opacity: 0, y: 12 });

      // ScrollTrigger horizontal reveal
      const scroller = document.querySelector<HTMLElement>("[data-horizontal-scroller]");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panelRef.current,
          scroller: scroller || window,
          horizontal: true,
          start: "left 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(".about-animate-num", {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      })
        .to(
          ".about-animate-statement",
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
          },
          "-=0.2"
        )
        .to(
          ".about-headline-line",
          {
            yPercent: 0,
            duration: 0.75,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .to(
          ".about-animate-cta",
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.3"
        );
    },
    { scope: panelRef }
  );

  return (
    <div
      ref={panelRef}
      className="w-full h-full flex flex-col justify-between pt-1 pb-2 sm:pb-4 px-2 sm:px-4 box-border overflow-hidden bg-page-background"
      style={{ background: "var(--color-page-background, #F1EFE9)" }}
    >
      {/* Top Left Area — Section Number 03/ */}
      <div className="w-full about-animate-num">
        <span className="text-2xl font-semibold leading-[1.5] text-base-dark-active tracking-normal">
          03/
        </span>
      </div>

      {/* Main Grid Content Area: Supporting Statement (Left) & Headline + CTA (Center/Right) */}
      <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-7xl mx-auto bg-transparent">
        {/* Left Side — Supporting Statement */}
        <div className="lg:col-span-4 flex flex-col justify-center">
          <AboutStatement />
        </div>

        {/* Center & Right Side — Large Editorial Headline & Call To Action */}
        <div className="lg:col-span-8 flex flex-col gap-6 lg:gap-8 items-start">
          <AboutHeadline />

          {/* CTA Link Button */}
          <div className="pt-2 about-animate-cta">
            <AboutCTA href="/about" label="More About Me" />
          </div>
        </div>
      </div>

      {/* Bottom Spacer for Footer Alignment */}
      <div className="w-full h-2 bg-transparent" />
    </div>
  );
}
