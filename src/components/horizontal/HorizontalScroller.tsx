"use client";

import { useRef, ReactNode, useEffect } from "react";
import { useGSAP } from "@/lib/gsap";
import { killNavTween } from "@/lib/navigationScroll";

interface HorizontalScrollerProps {
  children: ReactNode;
  onScrollProgress?: (progress: number, currentStep: number, totalSteps: number) => void;
}

const INTERACTIVE_SELECTOR =
  "button, a, input, select, textarea, [role='button'], [contenteditable='true']";

export default function HorizontalScroller({
  children,
  onScrollProgress,
}: HorizontalScrollerProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      const checkIsDesktop = () =>
        window.innerWidth >= 1024 && !window.matchMedia("(pointer: coarse)").matches;

      let isDesktop = checkIsDesktop();

      const handleScroll = () => {
        if (!isDesktop) return;

        const maxScroll = scroller.scrollWidth - scroller.clientWidth;
        if (maxScroll <= 0) return;

        const progress = Math.max(0, Math.min(1, scroller.scrollLeft / maxScroll));

        const contactPanel = document.getElementById("contacts");
        const aboutPanel = document.getElementById("about");
        const worksPanel = document.getElementById("works");
        let currentStep = 1;

        if (
          contactPanel &&
          scroller.scrollLeft >= contactPanel.offsetLeft - scroller.clientWidth * 0.5
        ) {
          currentStep = 4;
        } else if (
          aboutPanel &&
          scroller.scrollLeft >= aboutPanel.offsetLeft - scroller.clientWidth * 0.5
        ) {
          currentStep = 3;
        } else if (
          worksPanel &&
          scroller.scrollLeft >= worksPanel.offsetLeft - scroller.clientWidth * 0.5
        ) {
          currentStep = 2;
        } else {
          currentStep = 1;
        }

        if (onScrollProgress) {
          onScrollProgress(progress, currentStep, 4);
        }
      };

      const handleManualInteraction = () => {
        if (isDesktop) {
          killNavTween();
        }
      };

      // Custom Mouse Pointer Dragging Implementation (Multiplier: 0.62)
      const DRAG_MULTIPLIER = 0.62;
      const DRAG_THRESHOLD = 4; // px before considering pointer interaction a drag

      let isPointerDown = false;
      let isDragging = false;
      let startX = 0;
      let startScrollLeft = 0;
      let rafId: number | null = null;

      const handlePointerDown = (e: PointerEvent) => {
        if (!isDesktop) return;
        // Only trigger custom drag for mouse primary button
        if (e.pointerType !== "mouse" || e.button !== 0) return;

        const target = e.target as HTMLElement;
        if (target.closest(INTERACTIVE_SELECTOR)) return;

        isPointerDown = true;
        isDragging = false;
        startX = e.clientX;
        startScrollLeft = scroller.scrollLeft;
        killNavTween();
      };

      const handlePointerMove = (e: PointerEvent) => {
        if (!isDesktop || !isPointerDown) return;

        const dx = e.clientX - startX;

        if (!isDragging && Math.abs(dx) >= DRAG_THRESHOLD) {
          isDragging = true;
          document.body.style.userSelect = "none";
        }

        if (isDragging) {
          if (rafId) cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(() => {
            scroller.scrollLeft = startScrollLeft - dx * DRAG_MULTIPLIER;
          });
        }
      };

      const handlePointerUpOrCancel = () => {
        if (isPointerDown) {
          isPointerDown = false;
          if (isDragging) {
            isDragging = false;
            document.body.style.userSelect = "";
          }
          if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
          }
        }
      };

      const handleResize = () => {
        const nextIsDesktop = checkIsDesktop();
        if (isDesktop && !nextIsDesktop) {
          // Switched from desktop to mobile: reset horizontal offset
          scroller.scrollLeft = 0;
        }
        isDesktop = nextIsDesktop;
        if (isDesktop) {
          handleScroll();
        }
      };

      scroller.addEventListener("scroll", handleScroll, { passive: true });
      scroller.addEventListener("wheel", handleManualInteraction, { passive: true });
      scroller.addEventListener("touchstart", handleManualInteraction, { passive: true });

      scroller.addEventListener("pointerdown", handlePointerDown);
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUpOrCancel);
      window.addEventListener("pointercancel", handlePointerUpOrCancel);
      window.addEventListener("resize", handleResize);

      if (isDesktop) {
        handleScroll();
      }

      return () => {
        scroller.removeEventListener("scroll", handleScroll);
        scroller.removeEventListener("wheel", handleManualInteraction);
        scroller.removeEventListener("touchstart", handleManualInteraction);

        scroller.removeEventListener("pointerdown", handlePointerDown);
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUpOrCancel);
        window.removeEventListener("pointercancel", handlePointerUpOrCancel);
        window.removeEventListener("resize", handleResize);

        if (rafId) cancelAnimationFrame(rafId);
        document.body.style.userSelect = "";
      };
    },
    { scope: scrollerRef, dependencies: [onScrollProgress] }
  );

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let frameId: number | null = null;

    const restoreHashPosition = () => {
      const isDesktop =
        window.innerWidth >= 1024 && !window.matchMedia("(pointer: coarse)").matches;
      const targetId = decodeURIComponent(window.location.hash.slice(1));
      if (!targetId) return;

      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }

      frameId = requestAnimationFrame(() => {
        const targetPanel = document.getElementById(targetId);
        if (!targetPanel) return;

        if (isDesktop && scroller.contains(targetPanel)) {
          scroller.scrollLeft = targetPanel.offsetLeft;
        } else {
          targetPanel.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        frameId = null;
      });
    };

    restoreHashPosition();
    window.addEventListener("hashchange", restoreHashPosition);

    return () => {
      window.removeEventListener("hashchange", restoreHashPosition);
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
    };
  }, []);

  // Keyboard Navigation (ArrowRight, ArrowLeft, Home, End) — Desktop only
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isDesktop =
        window.innerWidth >= 1024 && !window.matchMedia("(pointer: coarse)").matches;
      if (!isDesktop) return;

      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          (activeEl instanceof HTMLElement && activeEl.isContentEditable))
      ) {
        return;
      }

      const scroller = scrollerRef.current;
      if (!scroller) return;

      const stepDistance = Math.round(scroller.clientWidth * 0.15); // 15% viewport width

      if (e.key === "ArrowRight") {
        e.preventDefault();
        killNavTween();
        scroller.scrollLeft += stepDistance;
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        killNavTween();
        scroller.scrollLeft -= stepDistance;
      } else if (e.key === "Home") {
        e.preventDefault();
        killNavTween();
        scroller.scrollLeft = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        killNavTween();
        scroller.scrollLeft = scroller.scrollWidth - scroller.clientWidth;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      ref={scrollerRef}
      data-horizontal-scroller="true"
      className="w-full h-auto overflow-visible select-auto lg:h-full lg:overflow-x-auto lg:overflow-y-hidden lg:overscroll-x-contain lg:select-none lg:[scrollbar-width:none] lg:[-ms-overflow-style:none] lg:[&::-webkit-scrollbar]:hidden"
      tabIndex={0}
      aria-label="Content scroller"
    >
      {children}
    </div>
  );
}
