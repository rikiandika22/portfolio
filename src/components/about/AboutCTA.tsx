"use client";

import { useRef, useEffect } from "react";
import TransitionLink from "@/components/animation/TransitionLink";
import { gsap, useGSAP } from "@/lib/gsap";

interface AboutCTAProps {
  href?: string;
  label?: string;
  className?: string;
}

/**
 * AboutCTA — Dual-Layer Magnetic & Ripple CTA Link for Homepage About Navigation.
 * - Magnetic Layer: Outer wrapper tracking cursor proximity smoothly via persistent gsap.quickTo.
 * - Fill Layer: Original pointer-origin circular ripple fill reveal.
 */
export default function AboutCTA({
  href = "/about",
  label = "More About Me",
  className = "",
}: AboutCTAProps) {
  const magneticWrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const fillRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);
  const labelBaseRef = useRef<HTMLSpanElement>(null);
  const labelActiveRef = useRef<HTMLSpanElement>(null);

  const fillTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const lastOriginRef = useRef<{ x: number; y: number }>({ x: 50, y: 50 });

  // ---------------------------------------------------------------------------
  // 1. FILL HOVER ANIMATION (Original ripple fill inside button)
  // ---------------------------------------------------------------------------
  const getPointerOrigin = (
    e: React.PointerEvent<HTMLElement> | React.MouseEvent<HTMLElement>
  ) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0 || rect.height === 0) return { x: 50, y: 50 };

    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    return { x: Math.round(x), y: Math.round(y) };
  };

  const killFillAnimations = () => {
    if (fillTimelineRef.current) {
      fillTimelineRef.current.kill();
      fillTimelineRef.current = null;
    }
    if (fillRef.current) gsap.killTweensOf(fillRef.current);
    if (waveRef.current) gsap.killTweensOf(waveRef.current);
    if (labelActiveRef.current) gsap.killTweensOf(labelActiveRef.current);
    if (labelBaseRef.current) gsap.killTweensOf(labelBaseRef.current);
  };

  useGSAP(
    () => {
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
    { scope: buttonRef }
  );

  const playFillEntrance = (origin: { x: number; y: number }) => {
    killFillAnimations();

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

    gsap.set([fill, activeText], {
      clipPath: initialClip,
      opacity: 1,
    });
    if (wave) {
      gsap.set(wave, { scale: 1.15, rotate: 4, opacity: 0.85 });
    }

    const tl = gsap.timeline({ overwrite: "auto" });

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

    tl.to(
      [fill, activeText],
      {
        clipPath: finalClip,
        duration: 0.25,
        ease: "power2.inOut",
      },
      0.65
    );

    fillTimelineRef.current = tl;
  };

  const playFillExit = () => {
    killFillAnimations();

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
        fillTimelineRef.current = null;
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

    fillTimelineRef.current = tl;
  };

  const handlePointerEnter = (e: React.PointerEvent<HTMLElement>) => {
    const origin = getPointerOrigin(e);
    lastOriginRef.current = origin;
    playFillEntrance(origin);
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLElement>) => {
    const origin = getPointerOrigin(e);
    lastOriginRef.current = origin;
    playFillExit();
  };

  const handleFocus = () => {
    const origin = { x: 50, y: 50 };
    lastOriginRef.current = origin;
    playFillEntrance(origin);
  };

  const handleBlur = () => {
    playFillExit();
  };

  // ---------------------------------------------------------------------------
  // 2. MAGNETIC PROXIMITY INTERACTION (Operates on outer magnetic wrapper)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const wrapper = magneticWrapperRef.current;
    if (!wrapper) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isTouch || prefersReducedMotion) return;

    const xTo = gsap.quickTo(wrapper, "x", {
      duration: 0.35,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(wrapper, "y", {
      duration: 0.35,
      ease: "power3.out",
    });

    const INFLUENCE_RADIUS = 110;
    const MAX_X = 12;
    const MAX_Y = 8;

    let isNear = false;

    const handlePointerMove = (e: PointerEvent | MouseEvent) => {
      if (e.pointerType === "touch") return;

      const rect = wrapper.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const currentX = (gsap.getProperty(wrapper, "x") as number) || 0;
      const currentY = (gsap.getProperty(wrapper, "y") as number) || 0;

      const canonicalCenterX = rect.left - currentX + rect.width / 2;
      const canonicalCenterY = rect.top - currentY + rect.height / 2;

      const deltaX = e.clientX - canonicalCenterX;
      const deltaY = e.clientY - canonicalCenterY;
      const distance = Math.hypot(deltaX, deltaY);

      const halfDiagonal = Math.hypot(rect.width / 2, rect.height / 2);
      const maxReach = halfDiagonal + INFLUENCE_RADIUS;

      if (distance < maxReach) {
        isNear = true;

        const normalized = Math.max(0, 1 - distance / maxReach);
        const strength = Math.pow(normalized, 1.75);

        const targetX = (deltaX / maxReach) * MAX_X * strength * 2.2;
        const targetY = (deltaY / maxReach) * MAX_Y * strength * 2.2;

        const clampedX = Math.max(-MAX_X, Math.min(MAX_X, targetX));
        const clampedY = Math.max(-MAX_Y, Math.min(MAX_Y, targetY));

        xTo(clampedX);
        yTo(clampedY);
      } else if (isNear) {
        isNear = false;
        xTo(0);
        yTo(0);
      }
    };

    const handleWindowLeave = () => {
      if (isNear) {
        isNear = false;
        xTo(0);
        yTo(0);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.addEventListener("mouseleave", handleWindowLeave, {
      passive: true,
    });
    window.addEventListener("blur", handleWindowLeave, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handleWindowLeave);
      window.removeEventListener("blur", handleWindowLeave);
      xTo(0);
      yTo(0);
    };
  }, []);

  return (
    <div
      ref={magneticWrapperRef}
      className="inline-block will-change-transform"
      style={{ isolation: "isolate" }}
    >
      <TransitionLink
        ref={buttonRef}
        href={href}
        customNumber="03/"
        customLabel="ABOUT"
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onMouseEnter={handlePointerEnter}
        onMouseLeave={handlePointerLeave}
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
          aria-hidden="true"
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
    </div>
  );
}
