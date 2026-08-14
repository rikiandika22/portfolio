"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { SUMBER_AGUNG_TRANS } from "@/data/projects";
import ProjectVisual from "./ProjectVisual";
import ProjectSummary from "./ProjectSummary";
import SeeMoreLink from "./SeeMoreLink";

const HOMEPAGE_WORKS_SECTION_NUMBER = "02/";

export default function WorksPanel() {
  const panelRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const animatedElements = [
        ".works-animate-num",
        ".works-animate-title-text",
        ".works-animate-laptop",
        ".works-animate-mobile",
        ".works-animate-category",
        ".works-animate-description",
        ".works-animate-cta",
      ];

      if (prefersReducedMotion) {
        gsap.set(animatedElements, { opacity: 1, y: 0, scale: 1, yPercent: 0 });
        return;
      }

      // Initial setup for GSAP reveal
      gsap.set(".works-animate-num", { opacity: 0, y: -8 });
      gsap.set(".works-animate-title-text", { yPercent: 110 });
      gsap.set(".works-animate-laptop", { opacity: 0, y: 24, scale: 0.98 });
      gsap.set(".works-animate-mobile", { opacity: 0, y: 24, scale: 0.98 });
      gsap.set(".works-animate-category", { opacity: 0, y: 16 });
      gsap.set(".works-animate-description", { opacity: 0, y: 16 });
      gsap.set(".works-animate-cta", { opacity: 0, y: 12 });

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

      tl.to(".works-animate-num", {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      })
        .to(
          ".works-animate-title-text",
          {
            yPercent: 0,
            duration: 0.75,
            ease: "power3.out",
          },
          "-=0.2"
        )
        .to(
          ".works-animate-laptop",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .to(
          ".works-animate-mobile",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .to(
          [".works-animate-category", ".works-animate-description"],
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .to(
          ".works-animate-cta",
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
      className="w-full h-full flex flex-col justify-between pt-1 pb-2 sm:pb-4 px-2 sm:px-4 box-border overflow-hidden"
    >
      {/* Upper Grid Area: Section number (left) & Project title (center/right) */}
      <div className="flex items-center justify-between lg:grid lg:grid-cols-12 gap-x-5 items-start w-full">
        {/* Top Left Area — Section Number 02/ */}
        <div className="shrink-0 lg:col-span-2 works-animate-num">
          <span className="text-lg sm:text-2xl font-semibold leading-[1.5] text-base-dark-active tracking-normal">
            {HOMEPAGE_WORKS_SECTION_NUMBER}
          </span>
        </div>

        {/* Upper Central Area — Project Title */}
        <div className="flex-1 lg:col-span-8 text-right lg:text-center overflow-hidden py-1">
          <h2 className="text-xl sm:text-4xl lg:text-7xl font-normal leading-none tracking-tight text-text-primary uppercase inline-block works-animate-title-text">
            {SUMBER_AGUNG_TRANS.title}
          </h2>
        </div>
      </div>

      {/* Dedicated Middle Row: Centered Device Composition */}
      <div className="w-full py-2 sm:py-4 flex items-center justify-center">
        <ProjectVisual
          laptopMockup={SUMBER_AGUNG_TRANS.laptopMockup}
          mobileMockup={SUMBER_AGUNG_TRANS.mobileMockup}
          title={SUMBER_AGUNG_TRANS.title}
        />
      </div>

      {/* Lower Area: Category (left), Description (right) & See More CTA (center bottom) */}
      <div className="flex flex-col gap-y-2 sm:gap-y-3 w-full pb-2">
        <ProjectSummary
          category={SUMBER_AGUNG_TRANS.subtitle}
          description={SUMBER_AGUNG_TRANS.description}
        />

        {/* Lower Center Area — See More Call To Action */}
        <div className="flex justify-center w-full pt-1 works-animate-cta">
          <SeeMoreLink
            href="/works"
            label="See More"
            customNumber="02/"
            customLabel="WORKS"
          />
        </div>
      </div>
    </div>
  );
}
