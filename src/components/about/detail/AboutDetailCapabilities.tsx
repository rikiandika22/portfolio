"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface CapabilityItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
}

const CAPABILITIES: readonly CapabilityItem[] = [
  {
    number: "01",
    title: "UI UX DESIGN",
    subtitle: "Interface & Experience Architecture",
    description:
      "I design intuitive interfaces by organizing user flows, creating wireframes, developing interactive prototypes, and maintaining a consistent visual system. Every design decision is made to help users understand and navigate the product more easily.",
  },
  {
    number: "02",
    title: "FRONT END DEVELOPMENT",
    subtitle: "Web Architecture & Interaction",
    description:
      "I build responsive and interactive websites with attention to structure, accessibility, animation, and visual detail. I focus on translating designs into interfaces that remain consistent across desktop, tablet, and mobile devices.",
  },
  {
    number: "03",
    title: "MOBILE DEVELOPMENT",
    subtitle: "Cross-Platform Application Engineering",
    description:
      "I develop mobile applications using Flutter, from interface implementation and navigation to API integration and local data management. My focus is creating applications that feel smooth, practical, and comfortable to use.",
  },
  {
    number: "04",
    title: "GRAPHIC DESIGN",
    subtitle: "Visual Identity & Digital Assets",
    description:
      "I create visual elements that support a clear and consistent identity, including social media content, promotional materials, interface assets, and presentation designs. I aim to keep every visual purposeful rather than purely decorative.",
  },
];

/**
 * AboutDetailCapabilities — Section 02/ Capabilities.
 * Desktop: Pinned horizontal scroll sequence driven continuously by vertical scroll.
 * Mobile: Native vertical document flow without horizontal scrolling or touch hijacking.
 */
export default function AboutDetailCapabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !stageRef.current || !trackRef.current) return;

      const isDesktop =
        window.innerWidth >= 1024 &&
        !window.matchMedia("(pointer: coarse)").matches;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (!isDesktop || prefersReducedMotion) {
        gsap.set(trackRef.current, { clearProps: "all" });
        return;
      }

      const track = trackRef.current;
      const stage = stageRef.current;
      const section = sectionRef.current;

      // Function to calculate exact horizontal travel distance dynamically
      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        // Total negative horizontal shift needed to display the last capability with right breathing space
        return -(trackWidth - viewportWidth);
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => {
            const distance = track.scrollWidth - window.innerWidth;
            // Provide proportional vertical scroll distance to scrub horizontal track smoothly
            return `+=${Math.max(distance + window.innerHeight * 0.6, window.innerHeight * 2)}`;
          },
          pin: stage,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Phase 1 (0.0 to 0.85): Horizontal translation of the track
      tl.to(track, {
        x: getScrollAmount,
        ease: "none",
        duration: 0.85,
      });

      // Phase 2 (0.85 to 1.0): Hold phase on final capability (04 Graphic Design) before unpinning
      tl.to({}, { duration: 0.15 });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      data-capabilities-section
      className="relative w-full bg-page-background"
    >
      {/* ========================================================================= */}
      {/* DESKTOP PINNED HORIZONTAL STAGE (>= 1024px)                               */}
      {/* ========================================================================= */}
      <div
        ref={stageRef}
        data-capabilities-stage
        className="hidden lg:flex relative h-screen min-h-[100svh] w-full flex-col justify-between overflow-hidden bg-page-background select-none box-border"
        style={{
          paddingTop: "calc(var(--topbar-height) + 16px)",
          paddingBottom: "clamp(32px, 4.5vh, 48px)",
        }}
      >
        {/*
         * Anchored Section Header Layer
         * Spans 100% of the true viewport width (no max-width constraint).
         * CAPABILITIES is centered at exactly window.innerWidth / 2.
         * 02/ is positioned independently on the left without affecting title centering.
         */}
        <header
          data-capabilities-header-layer
          className="relative w-full shrink-0 flex items-center justify-center box-border"
          style={{
            paddingInline: "var(--page-padding-inline)",
            paddingTop: "4px",
            paddingBottom: "4px",
          }}
        >
          {/* Independent Left Section Index: 02/ */}
          <div
            className="absolute top-1/2 -translate-y-1/2 select-none"
            style={{ left: "var(--page-padding-inline)" }}
          >
            <span className="text-xl font-bold leading-none tracking-normal xl:text-2xl text-text-primary">
              02/
            </span>
          </div>

          {/* Centered Large Display Title: CAPABILITIES (Centered against true 100% viewport width) */}
          <h2
            className="w-full text-center font-bold uppercase tracking-tight text-text-primary select-none leading-none pointer-events-auto"
            style={{
              fontSize: "clamp(38px, 5.6vw, 92px)",
              letterSpacing: "-0.02em",
            }}
          >
            CAPABILITIES
          </h2>
        </header>

        {/* Pinned Horizontal Track */}
        <div className="w-full flex-1 flex items-center overflow-hidden my-auto py-2">
          <div
            ref={trackRef}
            data-capabilities-track
            className="flex flex-row items-stretch gap-8 xl:gap-12 will-change-transform"
            style={{
              paddingLeft: "max(var(--page-padding-inline), calc((100vw - 1380px) / 2 + var(--page-padding-inline)))",
              paddingRight: "calc(var(--page-padding-inline) + 8vw)",
            }}
          >
            {CAPABILITIES.map((cap, idx) => {
              const isEven = idx % 2 === 1;

              return (
                <article
                  key={cap.number}
                  data-capability-panel={cap.number}
                  className="group relative flex flex-col justify-between shrink-0 rounded-2xl border border-border-subtle/40 bg-page-background transition-colors duration-500 hover:border-accent-primary/60"
                  style={{
                    width: "clamp(480px, 62vw, 840px)",
                    minHeight: "clamp(360px, 46vh, 500px)",
                    padding: "clamp(28px, 3.5vw, 48px)",
                  }}
                >
                  {/* Top Row: Large Editorial Number + Discipline Subtitle */}
                  <div className="w-full flex items-start justify-between gap-6">
                    {/* Big Display Number */}
                    <div className="overflow-hidden leading-none">
                      <span
                        className="block font-bold leading-none tracking-tighter text-text-primary/25 transition-colors duration-500 group-hover:text-accent-primary/80 select-none"
                        style={{
                          fontSize: "clamp(64px, 7.5vw, 112px)",
                        }}
                      >
                        {cap.number}
                      </span>
                    </div>

                    {/* Subtitle Badge / Discipline Flag */}
                    <div className="pt-2 text-right">
                      <span className="inline-block text-xs xl:text-sm font-semibold uppercase tracking-wider text-accent-primary border-b border-accent-primary/40 pb-0.5">
                        {cap.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Content: Title + Description */}
                  <div className={`w-full flex flex-col gap-4 ${isEven ? "pt-6" : "pt-8"}`}>
                    <h3
                      className="font-bold uppercase tracking-tight text-text-primary leading-[1.05]"
                      style={{
                        fontSize: "clamp(28px, 3.2vw, 44px)",
                      }}
                    >
                      {cap.title}
                    </h3>

                    <p
                      className="max-w-2xl text-base xl:text-lg font-normal leading-relaxed text-text-secondary"
                      style={{ lineHeight: "1.7" }}
                    >
                      {cap.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Stage Bottom Indicator Bar */}
        <div
          className="w-full shrink-0 flex items-center justify-end text-xs text-text-muted uppercase tracking-widest pt-2 box-border"
          style={{ paddingInline: "var(--page-padding-inline)" }}
        >
          <span className="font-mono text-accent-primary">↓ Continue Vertical Scroll</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE & TABLET NATIVE VERTICAL STACK (< 1024px)                          */}
      {/* ========================================================================= */}
      <div
        className="block lg:hidden w-full mx-auto max-w-[1380px] box-border"
        style={{
          paddingInline: "var(--page-padding-inline)",
          paddingTop: "40px",
          paddingBottom: "80px",
        }}
      >
        {/* Section Header */}
        <div className="relative w-full flex items-center justify-center border-b border-border-subtle/30 pb-4 mb-8">
          <span className="absolute left-0 text-lg sm:text-xl font-bold leading-none tracking-normal text-text-primary">
            02/
          </span>
          <h2
            className="w-full text-center font-bold uppercase tracking-tight text-text-primary leading-none"
            style={{
              fontSize: "clamp(28px, 6.5vw, 44px)",
              letterSpacing: "-0.02em",
            }}
          >
            CAPABILITIES
          </h2>
        </div>

        {/* Vertical Capability Cards */}
        <div className="w-full flex flex-col gap-6">
          {CAPABILITIES.map((cap) => (
            <article
              key={cap.number}
              className="w-full rounded-xl border border-border-subtle/30 bg-page-background p-6 sm:p-8 flex flex-col gap-4"
            >
              <div className="w-full flex items-baseline justify-between gap-4">
                <span className="text-4xl font-bold tracking-tighter text-text-primary/30 leading-none">
                  {cap.number}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-accent-primary">
                  {cap.subtitle}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-text-primary leading-tight">
                {cap.title}
              </h3>

              <p className="text-sm sm:text-base font-normal leading-relaxed text-text-secondary">
                {cap.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
