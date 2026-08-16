"use client";

import { useRef, useCallback, useEffect } from "react";
import PersistentNavigation from "@/components/layout/PersistentNavigation";
import PersistentFooter from "@/components/layout/PersistentFooter";
import { HorizontalProgressRef } from "@/components/horizontal/HorizontalProgress";
import HorizontalScroller from "@/components/horizontal/HorizontalScroller";
import HorizontalTrack from "@/components/horizontal/HorizontalTrack";
import HorizontalPanel from "@/components/horizontal/HorizontalPanel";
import HomeFrame from "@/components/home/HomeFrame";
import WorksPanel from "@/components/works/WorksPanel";
import AboutPanel from "@/components/about/AboutPanel";
import GradientTransitionPanel from "@/components/transition/GradientTransitionPanel";
import ContactPanel from "@/components/contact/ContactPanel";

function interpolateHex(hex1: string, hex2: string, factor: number): string {
  const r1 = parseInt(hex1.slice(1, 3), 16);
  const g1 = parseInt(hex1.slice(3, 5), 16);
  const b1 = parseInt(hex1.slice(5, 7), 16);

  const r2 = parseInt(hex2.slice(1, 3), 16);
  const g2 = parseInt(hex2.slice(3, 5), 16);
  const b2 = parseInt(hex2.slice(5, 7), 16);

  const r = Math.round(r1 + factor * (r2 - r1));
  const g = Math.round(g1 + factor * (g2 - g1));
  const b = Math.round(b1 + factor * (b2 - b1));

  return `rgb(${r}, ${g}, ${b})`;
}

export default function HorizontalPageShell() {
  const progressRef = useRef<HorizontalProgressRef>(null);
  const globalBgRef = useRef<HTMLDivElement>(null);

  const handleScrollProgress = useCallback(
    (progress: number, currentStep: number, totalSteps: number) => {
      if (progressRef.current) {
        progressRef.current.setProgress(progress);
        progressRef.current.setPanelStep(currentStep, totalSteps);
      }

      const scroller = document.querySelector<HTMLElement>("[data-horizontal-scroller]");
      if (!scroller) return;

      const transPanel = document.getElementById("transition");
      const contactPanel = document.getElementById("contacts");
      if (!transPanel || !contactPanel) return;

      const currentX = scroller.scrollLeft;
      const transX = transPanel.offsetLeft;
      const contactX = contactPanel.offsetLeft;

      // Contact alignment condition (2px rounding tolerance)
      const isContactAligned = currentX >= contactX - 2;

      // Transition start condition: ONLY when left edge of GradientTransitionPanel enters visible viewport (currentX >= transX)
      const isTransitioning = currentX >= transX && !isContactAligned;

      // tTrans ranges from 0.0 at currentX = transX to 1.0 at contactX
      let tTrans = 0;
      if (currentX >= transX && contactX > transX) {
        tTrans = Math.max(0, Math.min(1, (currentX - transX) / (contactX - transX)));
      }

      // Update Global Background Layer behind stationary header/footer
      if (globalBgRef.current) {
        if (isContactAligned) {
          // State 3: Solid Dark Blue Contact State
          globalBgRef.current.style.background = "var(--color-surface-dark-blue, #104A7B)";
        } else if (isTransitioning) {
          // State 2: Full Viewport Horizontal Gradient State
          globalBgRef.current.style.background =
            "linear-gradient(90deg, var(--color-page-background, #F1EFE9) 0%, #A2CBE8 24%, var(--color-accent-primary, #2196F3) 58%, var(--color-surface-dark-blue, #104A7B) 100%)";
        } else {
          // State 1: 100% Flat Cream State (Homepage, Works, About)
          globalBgRef.current.style.background = "var(--color-page-background, #F1EFE9)";
        }
      }

      // Synchronized transition progress for ALL navbar & footer text elements
      const navT = isContactAligned ? 1 : tTrans;

      const root = document.documentElement;
      root.style.setProperty("--nav-brand-color", interpolateHex("#1D242D", "#FFFFFF", navT));
      root.style.setProperty("--footer-left-color", interpolateHex("#1D242D", "#FFFFFF", navT));
      root.style.setProperty("--nav-center-color", interpolateHex("#546881", "#A5C2DE", navT));
      root.style.setProperty("--footer-bar-color", interpolateHex("#1D242D", "#A5C2DE", navT));
      root.style.setProperty("--nav-social-color", interpolateHex("#1D242D", "#FFFFFF", navT));
      root.style.setProperty("--footer-right-color", interpolateHex("#1D242D", "#FFFFFF", navT));
    },
    []
  );

  // Native Vertical Scroll Listener on Mobile (< 1024px) for Contact color transition
  useEffect(() => {
    const handleVerticalScroll = () => {
      const isDesktop =
        window.innerWidth >= 1024 && !window.matchMedia("(pointer: coarse)").matches;
      if (isDesktop) return;

      // Check contact section intersection for color synchronization
      const contactPanel = document.getElementById("contacts");
      if (contactPanel) {
        const rect = contactPanel.getBoundingClientRect();
        const contactTop = rect.top;
        const triggerPoint = window.innerHeight * 0.4;

        let navT = 0;
        if (contactTop <= triggerPoint) {
          navT = 1;
        } else if (contactTop <= window.innerHeight) {
          navT = (window.innerHeight - contactTop) / (window.innerHeight - triggerPoint);
          navT = Math.max(0, Math.min(1, navT));
        }

        const root = document.documentElement;
        root.style.setProperty("--nav-brand-color", interpolateHex("#1D242D", "#FFFFFF", navT));
        root.style.setProperty("--footer-left-color", interpolateHex("#1D242D", "#FFFFFF", navT));
        root.style.setProperty("--nav-center-color", interpolateHex("#546881", "#A5C2DE", navT));
        root.style.setProperty("--footer-bar-color", interpolateHex("#1D242D", "#A5C2DE", navT));
        root.style.setProperty("--nav-social-color", interpolateHex("#1D242D", "#FFFFFF", navT));
        root.style.setProperty("--footer-right-color", interpolateHex("#1D242D", "#FFFFFF", navT));
      }
    };

    window.addEventListener("scroll", handleVerticalScroll, { passive: true });
    handleVerticalScroll();

    return () => {
      window.removeEventListener("scroll", handleVerticalScroll);
    };
  }, []);

  return (
    <div
      data-horizontal-page-shell
      className="relative w-full min-h-screen overflow-x-hidden select-auto lg:h-screen lg:h-[100dvh] lg:overflow-hidden lg:select-none"
    >
      {/* Layer 0: Global Dynamic Visual Background Layer (100% Viewport width & height, fixed inset-0) */}
      <div
        ref={globalBgRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0 transition-colors duration-200"
        style={{ background: "var(--color-page-background, #F1EFE9)" }}
      />

      {/* Persistent Stationary Header Navigation */}
      <PersistentNavigation />

      {/* Native Horizontal Scroller (Desktop) / Vertical Document Flow (Mobile) */}
      <HorizontalScroller onScrollProgress={handleScrollProgress}>
        <HorizontalTrack>
          {/* Panel 01 — Homepage Content */}
          <HorizontalPanel id="home">
            <HomeFrame embedded={true} />
          </HorizontalPanel>

          {/* Panel 02 — Selected Works Preview */}
          <HorizontalPanel id="works">
            <WorksPanel />
          </HorizontalPanel>

          {/* Panel 03 — About Overview Section (Opaque Flat Cream Surface) */}
          <HorizontalPanel id="about">
            <AboutPanel />
          </HorizontalPanel>

          {/* Unnumbered Bridge — Gradient Transition Panel */}
          <GradientTransitionPanel />

          {/* Panel 05 — Contact Section (Opaque Flat Dark Blue Surface) */}
          <HorizontalPanel id="contacts" noPadding={true}>
            <ContactPanel />
          </HorizontalPanel>
        </HorizontalTrack>
      </HorizontalScroller>

      {/* Persistent Stationary Footer with Progress Bar */}
      <PersistentFooter ref={progressRef} />
    </div>
  );
}
