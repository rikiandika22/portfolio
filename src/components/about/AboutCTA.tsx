"use client";

import { useRef } from "react";
import TransitionLink from "@/components/animation/TransitionLink";
import { gsap, useGSAP } from "@/lib/gsap";

interface AboutCTAProps {
  href?: string;
  label?: string;
  className?: string;
}

export default function AboutCTA({
  href = "/about",
  label = "More About Me",
  className = "",
}: AboutCTAProps) {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);
  const labelBaseRef = useRef<HTMLSpanElement>(null);
  const labelActiveRef = useRef<HTMLSpanElement>(null);

  const activeTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const lastOriginRef = useRef<{ x: number; y: number }>({ x: 50, y: 50 });

  // Calculate pointer origin as percentages (0% - 100%) inside button
  const getPointerOrigin = (e: React.PointerEvent<HTMLAnchorElement> | React.MouseEvent<HTMLAnchorElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0 || rect.height === 0) return { x: 50, y: 50 };

    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    return { x: Math.round(x), y: Math.round(y) };
  };

  // Safely kill active timeline & active tweens
  const killAndResetState = () => {
    if (activeTimelineRef.current) {
      activeTimelineRef.current.kill();
      activeTimelineRef.current = null;
    }
    if (fillRef.current) gsap.killTweensOf(fillRef.current);
    if (waveRef.current) gsap.killTweensOf(waveRef.current);
    if (labelActiveRef.current) gsap.killTweensOf(labelActiveRef.current);
    if (labelBaseRef.current) gsap.killTweensOf(labelBaseRef.current);
  };

  useGSAP(
    () => {
      // Set clean initial state on mount
      if (fillRef.current && labelActiveRef.current) {
        gsap.set([fillRef.current, labelActiveRef.current], {
          clipPath: "circle(0% at 50% 50%)",
          opacity: 0,
        });
      }
      if (waveRef.current) {
        gsap.set(waveRef.current, { scale: 1, rotate: 0, opacity: 0 });
      }
    },
    { scope: containerRef }
  );

  // Entrance animation starting from specific pointer origin
  const playEntrance = (origin: { x: number; y: number }) => {
    killAndResetState();

    const fill = fillRef.current;
    const wave = waveRef.current;
    const activeText = labelActiveRef.current;
    const baseText = labelBaseRef.current;
    if (!fill || !activeText) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const initialClip = `circle(0% at ${origin.x}% ${origin.y}%)`;
    const overshootClip = `circle(155% at ${origin.x}% ${origin.y}%)`;
    const finalClip = `circle(150% at ${origin.x}% ${origin.y}%)`;

    if (prefersReducedMotion) {
      gsap.set([fill, activeText], { clipPath: finalClip, opacity: 1 });
      return;
    }

    // Set initial state for new entrance
    gsap.set([fill, activeText], {
      clipPath: initialClip,
      opacity: 1,
    });
    if (wave) {
      gsap.set(wave, { scale: 1.15, rotate: 4, opacity: 0.85 });
    }

    const tl = gsap.timeline({ overwrite: "auto" });

    // Liquid expansion from pointer origin with text reveal
    tl.to(
      [fill, activeText],
      {
        clipPath: overshootClip,
        duration: 0.65,
        ease: "power3.out",
      },
      0
    );

    if (wave) {
      tl.to(
        wave,
        {
          scale: 1,
          rotate: 0,
          opacity: 1,
          duration: 0.75,
          ease: "back.out(1.25)",
        },
        0
      );
    }

    if (baseText) {
      tl.to(
        baseText,
        {
          y: -1.5,
          duration: 0.35,
          ease: "power2.out",
        },
        0
      ).to(
        baseText,
        {
          y: 0,
          duration: 0.25,
          ease: "power2.out",
        },
        0.5
      );
    }

    // Settles smoothly into complete button bounds
    tl.to(
      [fill, activeText],
      {
        clipPath: finalClip,
        duration: 0.25,
        ease: "power2.inOut",
      },
      0.65
    );

    activeTimelineRef.current = tl;
  };

  // Exit animation collapsing back toward last pointer origin
  const playExit = () => {
    killAndResetState();

    const fill = fillRef.current;
    const wave = waveRef.current;
    const activeText = labelActiveRef.current;
    const baseText = labelBaseRef.current;
    if (!fill || !activeText) return;

    const origin = lastOriginRef.current;
    const collapseClip = `circle(0% at ${origin.x}% ${origin.y}%)`;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set([fill, activeText], { clipPath: collapseClip, opacity: 0 });
      return;
    }

    const tl = gsap.timeline({
      overwrite: "auto",
      onComplete: () => {
        // Restore 100% clean entrance state
        gsap.set([fill, activeText], {
          clipPath: "circle(0% at 50% 50%)",
          opacity: 0,
        });
        if (wave) {
          gsap.set(wave, { scale: 1, rotate: 0, opacity: 0 });
        }
        if (baseText) {
          gsap.set(baseText, { y: 0 });
        }
        activeTimelineRef.current = null;
      },
    });

    tl.to(
      [fill, activeText],
      {
        clipPath: collapseClip,
        duration: 0.38,
        ease: "power2.inOut",
      },
      0
    );

    if (wave) {
      tl.to(
        wave,
        {
          scale: 0.9,
          rotate: -3,
          opacity: 0.3,
          duration: 0.38,
          ease: "power2.inOut",
        },
        0
      );
    }

    if (baseText) {
      tl.to(
        baseText,
        {
          y: 0,
          duration: 0.38,
          ease: "power2.inOut",
        },
        0
      );
    }

    activeTimelineRef.current = tl;
  };

  // Pointer event handlers
  const handlePointerEnter = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const origin = getPointerOrigin(e);
    lastOriginRef.current = origin;
    playEntrance(origin);
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const origin = getPointerOrigin(e);
    lastOriginRef.current = origin;
    playExit();
  };

  const handleFocus = () => {
    const origin = { x: 50, y: 50 }; // Center origin for keyboard navigation
    lastOriginRef.current = origin;
    playEntrance(origin);
  };

  const handleBlur = () => {
    playExit();
  };

  return (
    <TransitionLink
      href={href}
      customNumber="03/"
      customLabel="ABOUT"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      aria-label={`${label} details page`}
      className={`relative inline-flex items-center justify-center border-[1.5px] border-base-dark text-lg sm:text-[20px] font-semibold tracking-normal overflow-hidden select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 transition-shadow ${className}`}
      style={{
        borderColor: "var(--color-text-primary, #1D242D)",
        borderRadius: "0px 24px 24px 0px",
        paddingInline: "16px",
        paddingBlock: "10px",
      }}
    >
      {/* Base Dark Text Layer */}
      <span
        ref={labelBaseRef}
        className="relative z-10 text-base-dark transition-colors duration-200 pointer-events-none"
        style={{ color: "var(--color-text-primary, #1D242D)" }}
      >
        {label}
      </span>

      {/* Animated Blue Fill Layer (Dynamic clip-path from pointer origin) */}
      <div
        ref={fillRef}
        className="absolute inset-0 bg-accent-primary z-20 pointer-events-none overflow-hidden"
        style={{
          backgroundColor: "var(--color-accent-primary, #2196F3)",
          borderRadius: "0px 24px 24px 0px",
          clipPath: "circle(0% at 50% 50%)",
          opacity: 0,
        }}
      >
        {/* Organic Wave Surface Element inside fill */}
        <div
          ref={waveRef}
          className="absolute inset-0 pointer-events-none bg-accent-hover/30 rounded-[50%] blur-[1px]"
          style={{
            transform: "scale(1)",
            transformOrigin: "center",
          }}
        />
      </div>

      {/* Active Light Text Layer (Revealed in sync with blue liquid) */}
      <span
        ref={labelActiveRef}
        className="absolute inset-0 z-30 flex items-center justify-center text-white font-semibold pointer-events-none"
        style={{
          paddingInline: "16px",
          paddingBlock: "10px",
          clipPath: "circle(0% at 50% 50%)",
          opacity: 0,
        }}
        aria-hidden="true"
      >
        {label}
      </span>
    </TransitionLink>
  );
}
