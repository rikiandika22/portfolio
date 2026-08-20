"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import AboutDetailContactCTA from "./AboutDetailContactCTA";

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
 * Desktop: Pinned horizontal scroll sequence + scroll-driven Capabilities fade-out & CTA reveal.
 * Mobile: Native vertical document flow without horizontal scrolling or touch hijacking.
 */
export default function AboutDetailCapabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const ctaLayerRef = useRef<HTMLDivElement>(null);
  const ctaContentRef = useRef<HTMLDivElement>(null);

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
        if (contentRef.current) gsap.set(contentRef.current, { clearProps: "all" });
        if (ctaLayerRef.current) gsap.set(ctaLayerRef.current, { clearProps: "all" });
        if (ctaContentRef.current) gsap.set(ctaContentRef.current, { clearProps: "all" });
        return;
      }

      const track = trackRef.current;
      const stage = stageRef.current;
      const section = sectionRef.current;
      const content = contentRef.current;
      const ctaLayer = ctaLayerRef.current;
      const ctaContent = ctaContentRef.current;

      // Initialize initial states via GSAP (avoids matrix conflict with inline style)
      // CTA layer starts at yPercent: 190 so the 85vh tall continuous feathered alpha mask is fully offscreen during Card 04 hold
      if (ctaLayer) gsap.set(ctaLayer, { yPercent: 190, force3D: true });
      if (ctaContent) gsap.set(ctaContent, { opacity: 0, y: 32, force3D: true });
      if (content) gsap.set(content, { opacity: 1 });

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
            // Proportional scroll distance: horizontal scrub + hold on 04 + CTA reveal
            return `+=${distance + window.innerHeight * 1.5}`;
          },
          pin: stage,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Total timeline normalized duration = 1.0

      // Phase 1 (0.00 to 0.58): Horizontal translation of the track from 01 to 04
      tl.to(track, {
        x: getScrollAmount,
        ease: "none",
        duration: 0.58,
      });

      // Phase 2 (0.58 to 0.70): Stable Hold phase on final capability (04 Graphic Design)
      tl.to({}, { duration: 0.12 });

      // Phase 3 (0.70 to 1.00): Master Single-Surface Feathered Alpha Reveal & Takeover
      // Layer 2: CTA Single Blue Surface + 85vh Feathered Mask rises seamlessly from bottom (0.70 -> 1.00)
      if (ctaLayer) {
        tl.fromTo(
          ctaLayer,
          { yPercent: 190 },
          {
            yPercent: 0,
            ease: "none",
            duration: 0.30,
          },
          0.70
        );
      }

      // Layer 1: Outgoing Capabilities Content fades out progressively (0.74 -> 0.94)
      if (content) {
        tl.fromTo(
          content,
          { opacity: 1 },
          {
            opacity: 0,
            ease: "power1.inOut",
            duration: 0.20,
          },
          0.74
        );
      }

      // Layer 3: CTA Inner Typography fades in and settles gently upward (0.78 -> 1.00)
      if (ctaContent) {
        tl.fromTo(
          ctaContent,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            ease: "power1.out",
            duration: 0.22,
          },
          0.78
        );
      }
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
      >
        {/* Inner Capabilities Content (Progressively fades out during transition) */}
        <div
          ref={contentRef}
          data-capabilities-content
          className="relative z-10 w-full h-full flex flex-col justify-between overflow-hidden will-change-[opacity]"
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

            {/* Centered Large Display Title: CAPABILITIES */}
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
                paddingLeft:
                  "max(var(--page-padding-inline), calc((100vw - 1380px) / 2 + var(--page-padding-inline)))",
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
                    <div
                      className={`w-full flex flex-col gap-4 ${isEven ? "pt-6" : "pt-8"}`}
                    >
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
            <span className="font-mono text-accent-primary">
              ↓ Continue Vertical Scroll
            </span>
          </div>
        </div>

        {/* Desktop CTA Reveal Layer (rises smoothly from bottom) */}
        <div
          ref={ctaLayerRef}
          data-capabilities-cta-layer
          className="absolute inset-0 z-30 w-full h-full pointer-events-auto will-change-transform"
        >
          {/*
           * Single Continuous Blue Background Surface (Sole visual owner of CTA Blue)
           * Extends 85vh above the CTA viewport.
           * A single non-linear 14-stop alpha mask curve (0% -> 100% across the top 85vh, and solid 100% below)
           * eliminates all boundaries, stepped shelves, and duplicate background edges.
           */}
          <div
            data-cta-single-background
            className="absolute left-0 right-0 w-full pointer-events-none"
            style={{
              top: "-85vh",
              height: "calc(100% + 85vh)",
              backgroundColor: "var(--color-surface-dark-blue, #104A7B)",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0) 0vh, rgba(0,0,0,0.002) 6.8vh, rgba(0,0,0,0.008) 13.6vh, rgba(0,0,0,0.02) 20.4vh, rgba(0,0,0,0.045) 27.2vh, rgba(0,0,0,0.08) 34vh, rgba(0,0,0,0.14) 40.8vh, rgba(0,0,0,0.23) 47.6vh, rgba(0,0,0,0.35) 54.4vh, rgba(0,0,0,0.50) 61.2vh, rgba(0,0,0,0.67) 68vh, rgba(0,0,0,0.82) 74.8vh, rgba(0,0,0,0.93) 79.9vh, rgba(0,0,0,1) 85vh, rgba(0,0,0,1) 100%)",
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0) 0vh, rgba(0,0,0,0.002) 6.8vh, rgba(0,0,0,0.008) 13.6vh, rgba(0,0,0,0.02) 20.4vh, rgba(0,0,0,0.045) 27.2vh, rgba(0,0,0,0.08) 34vh, rgba(0,0,0,0.14) 40.8vh, rgba(0,0,0,0.23) 47.6vh, rgba(0,0,0,0.35) 54.4vh, rgba(0,0,0,0.50) 61.2vh, rgba(0,0,0,0.67) 68vh, rgba(0,0,0,0.82) 74.8vh, rgba(0,0,0,0.93) 79.9vh, rgba(0,0,0,1) 85vh, rgba(0,0,0,1) 100%)",
            }}
            aria-hidden="true"
          />

          {/* CTA Content Container with transparent background so the single masked surface is the only blue owner */}
          <AboutDetailContactCTA contentRef={ctaContentRef} transparentBg={true} />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE & TABLET NATIVE VERTICAL STACK (< 1024px)                          */}
      {/* ========================================================================= */}
      <div
        className="block lg:hidden w-full mx-auto max-w-[1380px] box-border"
        style={{
          paddingInline: "clamp(20px, 5vw, 24px)",
          paddingTop: "clamp(36px, 5vw, 44px)",
          paddingBottom: "clamp(96px, 12vw, 132px)",
        }}
      >
        {/* Section Header */}
        <div
          className="relative w-full flex items-center justify-center border-b border-border-subtle/30 pb-4"
          style={{ marginBottom: "clamp(28px, 4vw, 36px)" }}
        >
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
        <div
          className="w-full flex flex-col"
          style={{ gap: "clamp(32px, 4.5vw, 38px)" }}
        >
          {CAPABILITIES.map((cap) => (
            <article
              key={cap.number}
              className="w-full rounded-xl border border-border-subtle/30 bg-page-background flex flex-col box-border"
              style={{
                paddingTop: "clamp(22px, 3.5vw, 26px)",
                paddingInline: "clamp(20px, 3vw, 24px)",
                paddingBottom: "clamp(26px, 4vw, 30px)",
                gap: "clamp(28px, 4vw, 34px)",
              }}
            >
              {/* Top Row: Large Number (left) + Blue Discipline Flag (right) */}
              <div className="w-full flex items-start justify-between gap-3">
                <span className="text-4xl sm:text-5xl font-bold tracking-tighter text-text-primary/30 leading-none select-none shrink-0">
                  {cap.number}
                </span>
                <div className="pt-0.5 text-right max-w-[68%]">
                  <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent-primary leading-tight text-right">
                    {cap.subtitle}
                  </span>
                </div>
              </div>

              {/* Content Block: Title + Description */}
              <div
                className="w-full flex flex-col"
                style={{ gap: "clamp(22px, 3vw, 26px)" }}
              >
                <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-text-primary leading-tight">
                  {cap.title}
                </h3>

                <p className="text-sm sm:text-base font-normal leading-relaxed text-text-secondary">
                  {cap.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile / Tablet Wide Feathered Alpha Bridge into CTA */}
        <div
          className="block lg:hidden w-full pointer-events-none mt-12 sm:mt-16"
          style={{
            height: "clamp(160px, 24vh, 260px)",
            marginBottom: "-clamp(96px, 12vw, 132px)",
            backgroundColor: "var(--color-surface-dark-blue, #104A7B)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.05) 15%, rgba(0,0,0,0.20) 35%, rgba(0,0,0,0.50) 60%, rgba(0,0,0,0.85) 85%, rgba(0,0,0,1) 100%)",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.05) 15%, rgba(0,0,0,0.20) 35%, rgba(0,0,0,0.50) 60%, rgba(0,0,0,0.85) 85%, rgba(0,0,0,1) 100%)",
          }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
