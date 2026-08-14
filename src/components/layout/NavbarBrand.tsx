"use client";

import TransitionLink from "@/components/animation/TransitionLink";
import { useRef, useState, useEffect, useCallback } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function NavbarBrand() {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealContainerRef = useRef<HTMLDivElement>(null);
  const extensionTextRef = useRef<HTMLSpanElement>(null);
  const activeTimelineRef = useRef<gsap.core.Timeline | null>(null);

  // Responsive / Touch detection
  const [isTouchOrMobile, setIsTouchOrMobile] = useState(false);

  useEffect(() => {
    const checkTouchOrMobile = () => {
      const isTouch = window.matchMedia("(hover: none)").matches;
      const isMobile = window.innerWidth < 1024;
      setIsTouchOrMobile(isTouch || isMobile);
    };

    checkTouchOrMobile();
    window.addEventListener("resize", checkTouchOrMobile);
    return () => window.removeEventListener("resize", checkTouchOrMobile);
  }, []);

  const handleEnter = useCallback(() => {
    if (isTouchOrMobile) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const revealContainer = revealContainerRef.current;
    const extensionText = extensionTextRef.current;
    if (!revealContainer || !extensionText) return;

    if (activeTimelineRef.current) {
      activeTimelineRef.current.kill();
    }

    const tl = gsap.timeline({ overwrite: "auto" });
    activeTimelineRef.current = tl;

    if (prefersReducedMotion) {
      tl.to(extensionText, {
        opacity: 1,
        duration: 0.15,
        ease: "power1.out",
      });
    } else {
      tl.fromTo(
        revealContainer,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.75,
          ease: "power3.out",
        },
        0
      ).fromTo(
        extensionText,
        { opacity: 0, yPercent: 100 },
        {
          opacity: 1,
          yPercent: 0,
          duration: 0.75,
          ease: "power3.out",
        },
        0
      );
    }
  }, [isTouchOrMobile]);

  const handleLeave = useCallback(() => {
    if (isTouchOrMobile) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const revealContainer = revealContainerRef.current;
    const extensionText = extensionTextRef.current;
    if (!revealContainer || !extensionText) return;

    if (activeTimelineRef.current) {
      activeTimelineRef.current.kill();
    }

    const tl = gsap.timeline({ overwrite: "auto" });
    activeTimelineRef.current = tl;

    if (prefersReducedMotion) {
      tl.to(extensionText, {
        opacity: 0,
        duration: 0.15,
        ease: "power1.in",
      });
    } else {
      tl.to(
        revealContainer,
        {
          clipPath: "inset(0 100% 0 0)",
          duration: 0.35,
          ease: "power2.in",
        },
        0
      ).to(
        extensionText,
        {
          opacity: 0,
          yPercent: 35,
          duration: 0.35,
          ease: "power2.in",
          onComplete: () => {
            gsap.set(revealContainer, { clipPath: "inset(0 100% 0 0)" });
            gsap.set(extensionText, { opacity: 0, yPercent: 100 });
          },
        },
        0
      );
    }
  }, [isTouchOrMobile]);

  useGSAP(
    () => {
      const revealContainer = revealContainerRef.current;
      const extensionText = extensionTextRef.current;
      if (!revealContainer || !extensionText) return;

      gsap.set(revealContainer, { clipPath: "inset(0 100% 0 0)" });
      gsap.set(extensionText, { opacity: 0, yPercent: 100 });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
      tabIndex={0}
      className="inline-grid grid-cols-[max-content_max-content] gap-x-4 items-center cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 rounded-sm text-white"
      aria-label="Riki Andika Khusna Saputra"
    >
      {/* Primary Brand Text — Always Visible */}
      <TransitionLink
        href="/"
        className="text-2xl font-semibold leading-[1.5] tracking-normal text-white whitespace-nowrap transition-opacity duration-200 hover:opacity-70"
      >
        Riki Andika
      </TransitionLink>

      {/* Hidden Extension Text — Left-to-Right + Bottom-to-Top Reveal */}
      <div
        ref={revealContainerRef}
        className={`overflow-hidden py-1 px-1 -my-1 -mx-1 ${
          isTouchOrMobile ? "hidden" : "block"
        }`}
        aria-hidden="true"
      >
        <span
          ref={extensionTextRef}
          className="block text-2xl font-semibold leading-[1.5] tracking-normal text-white whitespace-nowrap pointer-events-none"
        >
          Khusna Saputra
        </span>
      </div>
    </div>
  );
}
