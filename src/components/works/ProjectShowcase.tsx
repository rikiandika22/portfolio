"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { PERSONAL_PROJECTS } from "@/data/projects";
import ProjectScene from "./ProjectScene";

export default function ProjectShowcase() {
  const showcaseTrackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  /*
   * Per-outgoing-panel dark overlays.
   * overlay[0] sits at z-15 (above p0=z10, below p1=z20) → darkens p0 during 01→02.
   * overlay[1] sits at z-25 (above p1=z20, below p2=z30) → darkens p1 during 02→03.
   * Because the incoming panel has higher z-index it naturally slides above the overlay,
   * keeping the incoming project clean and bright.
   */
  const panelOverlayRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (!showcaseTrackRef.current || !stageRef.current) return;

      const isDesktop =
        window.innerWidth >= 1024 &&
        !window.matchMedia("(pointer: coarse)").matches;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const p0 = panelRefs.current[0];
      const p1 = panelRefs.current[1];
      const p2 = panelRefs.current[2];

      if (!p0 || !p1 || !p2) return;

      if (!isDesktop || prefersReducedMotion) {
        // Clear all GSAP inline styles for natural vertical flow on mobile & reduced motion
        gsap.set([p0, p1, p2], {
          clearProps: "all",
        });
        return;
      }

      // Initial desktop GSAP setup: Project 01 (p0) is fully visible, p1 & p2 are translated below and hidden
      gsap.set(p0, { yPercent: 0, scale: 1, opacity: 1, autoAlpha: 1, zIndex: 10 });
      gsap.set(p1, { yPercent: 100, scale: 1, opacity: 0, autoAlpha: 0, zIndex: 20 });
      gsap.set(p2, { yPercent: 100, scale: 1, opacity: 0, autoAlpha: 0, zIndex: 30 });

      const thumb0 = p0.querySelector(".project-scene-thumbnail");
      const thumb1 = p1.querySelector(".project-scene-thumbnail");
      const thumb2 = p2.querySelector(".project-scene-thumbnail");

      const num1 = p1.querySelector(".project-scene-number");
      const num2 = p2.querySelector(".project-scene-number");

      // Scroll-driven scrubbed timeline with dedicated hold phases
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: showcaseTrackRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          pin: stageRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Initial Hold on Project 01 (0.0 to 0.6)
      // Project 01 (Sumber Agung Trans) remains 100% visible upon arrival

      // 2. Transition 01 -> 02 (0.6 to 1.8)
      tl.to(
        p0,
        {
          yPercent: -20,
          scale: 0.98,
          opacity: 0,
          autoAlpha: 0,
          ease: "none",
          duration: 1.2,
        },
        0.6
      ).fromTo(
        p1,
        { yPercent: 100, opacity: 0, autoAlpha: 0 },
        {
          yPercent: 0,
          opacity: 1,
          autoAlpha: 1,
          ease: "none",
          duration: 1.2,
          immediateRender: false,
        },
        0.6
      );

      if (thumb0) {
        tl.to(thumb0, { yPercent: -8, ease: "none", duration: 1.2 }, 0.6);
      }
      if (thumb1) {
        tl.fromTo(
          thumb1,
          { yPercent: 8 },
          { yPercent: 0, ease: "none", duration: 1.2, immediateRender: false },
          0.6
        );
      }
      if (num1) {
        tl.fromTo(
          num1,
          { yPercent: 12 },
          { yPercent: 0, ease: "none", duration: 1.2, immediateRender: false },
          0.6
        );
      }

      // 3. Hold on Project 02 (1.8 to 2.4)

      // 4. Transition 02 -> 03 (2.4 to 3.6)
      tl.to(
        p1,
        {
          yPercent: -20,
          scale: 0.98,
          opacity: 0,
          autoAlpha: 0,
          ease: "none",
          duration: 1.2,
        },
        2.4
      ).fromTo(
        p2,
        { yPercent: 100, opacity: 0, autoAlpha: 0 },
        {
          yPercent: 0,
          opacity: 1,
          autoAlpha: 1,
          ease: "none",
          duration: 1.2,
          immediateRender: false,
        },
        2.4
      );

      if (thumb1) {
        tl.to(thumb1, { yPercent: -8, ease: "none", duration: 1.2 }, 2.4);
      }
      if (thumb2) {
        tl.fromTo(
          thumb2,
          { yPercent: 8 },
          { yPercent: 0, ease: "none", duration: 1.2, immediateRender: false },
          2.4
        );
      }
      if (num2) {
        tl.fromTo(
          num2,
          { yPercent: 12 },
          { yPercent: 0, ease: "none", duration: 1.2, immediateRender: false },
          2.4
        );
      }

      // ── Per-panel outgoing darkening + clockwise content tilt ──────────────────
      //
      // Architecture:
      //   overlay[0] z-15: above p0 (z10), below p1 (z20) → darkens outgoing p0.
      //   overlay[1] z-25: above p1 (z20), below p2 (z30) → darkens outgoing p1.
      // The incoming panel always slides above the overlay via natural z-order.
      //
      // Content rotation targets [data-project-content] inside each panel.
      // Only the inner composition tilts; the panel wrapper/background stays straight.

      const o0 = panelOverlayRefs.current[0];
      const o1 = panelOverlayRefs.current[1];
      const content0 = p0.querySelector<HTMLElement>("[data-project-content]");
      const content1 = p1.querySelector<HTMLElement>("[data-project-content]");

      // Initialise overlays at opacity 0
      if (o0) gsap.set(o0, { opacity: 0 });
      if (o1) gsap.set(o1, { opacity: 0 });

      // Initialise content at identity transform
      if (content0) gsap.set(content0, { rotation: 0, x: 0, transformOrigin: "center center" });
      if (content1) gsap.set(content1, { rotation: 0, x: 0, transformOrigin: "center center" });

      // 01 → 02 (0.6 – 1.8)
      // Overlay darkens p0 from 0 → 0.26 over the full transition duration.
      // Content tilts +3deg clockwise and drifts +10px right.
      if (o0) {
        tl.to(o0, { opacity: 0.26, ease: "none", duration: 1.2 }, 0.6);
      }
      if (content0) {
        tl.to(
          content0,
          { rotation: 3, x: 10, ease: "none", duration: 1.2, transformOrigin: "center center" },
          0.6
        );
      }

      // 02 → 03 (2.4 – 3.6)
      if (o1) {
        tl.to(o1, { opacity: 0.26, ease: "none", duration: 1.2 }, 2.4);
      }
      if (content1) {
        tl.to(
          content1,
          { rotation: 3, x: 10, ease: "none", duration: 1.2, transformOrigin: "center center" },
          2.4
        );
      }
    },
    { scope: showcaseTrackRef }
  );

  return (
    <div data-personal-projects-wrapper className="relative w-full bg-page-background">
      {/*
       * PERSONAL PROJECT intro — owns its own viewport composition.
       * 100svh height, flex-centered vertically.
       * Padding-top offsets the persistent navbar (--topbar-height + block padding).
       * Padding-bottom offsets the persistent footer (~64px).
       * NO max-width container — h2 must center against the true viewport width.
       */}
      <div
        data-personal-projects-header
        className="w-full flex flex-col items-center justify-center bg-page-background"
        style={{
          minHeight: "100svh",
          paddingTop: "calc(var(--topbar-height) + var(--page-padding-block) + 32px)",
          paddingBottom: "calc(64px + var(--page-padding-block) + 32px)",
          paddingInline: "var(--page-padding-inline)",
        }}
      >
        <h2
          id="personal-projects-heading"
          className="w-full text-center font-normal uppercase leading-none tracking-[-0.02em] text-text-primary select-none"
          style={{
            fontSize: "clamp(40px, 6.5vw, 104px)",
          }}
        >
          Personal Project
        </h2>
      </div>

      {/* Desktop Sticky Stage / Mobile Vertical Stack */}
      <div
        ref={showcaseTrackRef}
        data-personal-projects-showcase
        className="relative w-full lg:h-[350vh] bg-page-background"
      >
        <div
          ref={stageRef}
          data-showcase-stage
          className="relative w-full overflow-hidden lg:h-screen lg:h-[100svh] lg:sticky lg:top-0 flex flex-col justify-center bg-page-background"
        >
          {/* Desktop Layered Container */}
          <div className="relative h-full w-full flex flex-col lg:block overflow-hidden bg-page-background">
            {PERSONAL_PROJECTS.map((project, index) => (
              <div
                key={project.id}
                ref={(el) => {
                  panelRefs.current[index] = el;
                }}
                data-project-panel={project.id}
                className="relative w-full lg:absolute lg:inset-0 lg:h-full flex flex-col justify-center border-b border-border-subtle/30 lg:border-b-0 last:border-b-0 bg-page-background overflow-hidden"
                style={{
                  zIndex: (index + 1) * 10,
                }}
              >
                <ProjectScene
                  project={project}
                  index={index}
                  priority={index === 0}
                />
              </div>
            ))}

            {/*
             * Outgoing overlay 0 — z-15 (above p0=z10, below p1=z20).
             * GSAP animates opacity 0 → 0.26 during the 01→02 transition.
             * Solid #1d242d (portfolio dark token) provides real panel-level darkening.
             * The incoming p1 slides above this at z-20, keeping it clean and bright.
             */}
            <div
              ref={(el) => { panelOverlayRefs.current[0] = el; }}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 hidden lg:block"
              style={{
                zIndex: 15,
                background: "#1d242d",
                opacity: 0,
                willChange: "opacity",
              }}
            />

            {/*
             * Outgoing overlay 1 — z-25 (above p1=z20, below p2=z30).
             * GSAP animates opacity 0 → 0.26 during the 02→03 transition.
             */}
            <div
              ref={(el) => { panelOverlayRefs.current[1] = el; }}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 hidden lg:block"
              style={{
                zIndex: 25,
                background: "#1d242d",
                opacity: 0,
                willChange: "opacity",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
