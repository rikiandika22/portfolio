"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import ContactEditorialHeadline from "./ContactEditorialHeadline";
import ContactEditorialInfo from "./ContactEditorialInfo";

export default function ContactPageClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(".contact-headline-line", { yPercent: 0 });
        gsap.set(".contact-animate-item", { opacity: 1, y: 0 });
        return;
      }

      // Initial state
      gsap.set(".contact-headline-line", { yPercent: 115 });
      gsap.set(".contact-animate-item", { opacity: 0, y: 20 });

      // Staggered reveal timeline
      const tl = gsap.timeline({ delay: 0.1 });

      tl.to(".contact-headline-line", {
        yPercent: 0,
        duration: 0.85,
        stagger: 0.09,
        ease: "power3.out",
      }).to(
        ".contact-animate-item",
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.45"
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[100dvh] flex flex-col justify-between box-border overflow-x-hidden"
      style={{
        backgroundColor: "var(--color-page-background, #F1EFE9)",
        paddingInline: "var(--page-padding-inline)",
        paddingTop: "calc(var(--page-padding-block) + 4rem)",
        paddingBottom: "calc(var(--page-padding-block) + 3.5rem)",
      }}
    >
      <main className="my-auto w-full max-w-[1440px] mx-auto box-border">
        {/*
         * Asymmetric Page Grid:
         * Desktop (lg:): Two-column layout (Headline ~65% / Info ~35%)
         * Mobile (< lg): Natural vertical flow
         */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center w-full">
          {/* Left Column: Dominant Editorial Headline */}
          <div className="lg:col-span-7 xl:col-span-8 w-full">
            <ContactEditorialHeadline />
          </div>

          {/* Right Column: Supporting Info & Minimal Contact Links */}
          <div className="lg:col-span-5 xl:col-span-4 w-full flex justify-start lg:justify-end">
            <ContactEditorialInfo />
          </div>
        </div>
      </main>
    </div>
  );
}
