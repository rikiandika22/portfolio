"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface ProximityTextProps {
  text: string;
  className?: string;
  maxTranslateY?: number;
  maxScaleX?: number;
  maxScaleY?: number;
  radius?: number;
  isFooter?: boolean;
  enableAmbientLoop?: boolean;
}

export default function ProximityText({
  text,
  className = "",
  maxTranslateY,
  maxScaleX,
  maxScaleY,
  radius,
  isFooter = false,
  enableAmbientLoop = false,
}: ProximityTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const isHoveredRef = useRef(false);
  const isWaveActiveRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);
  const waveTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const ambientDelayedCallRef = useRef<gsap.core.Tween | null>(null);
  const ambientTlRef = useRef<gsap.core.Timeline | null>(null);

  // Default parameters based on footer vs topbar
  const effectiveMaxY = maxTranslateY ?? (isFooter ? 2 : 3.5);
  const effectiveMaxScaleX = maxScaleX ?? (isFooter ? 1.03 : 1.05);
  const effectiveMaxScaleY = maxScaleY ?? (isFooter ? 1.005 : 1.01);
  const effectiveRadius = radius ?? (isFooter ? 70 : 80);

  const characters = Array.from(text);

  useEffect(() => {
    // Disable interaction on touch devices or when reduced motion is preferred
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouch || isReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const scheduleNextAmbientWave = (delay: number) => {
      if (!enableAmbientLoop) return;
      if (ambientDelayedCallRef.current) {
        ambientDelayedCallRef.current.kill();
      }
      ambientDelayedCallRef.current = gsap.delayedCall(delay, runAmbientWave);
    };

    const runAmbientWave = () => {
      if (!enableAmbientLoop) return;
      if (isHoveredRef.current) return;

      const validChars = charRefs.current.filter(
        (el): el is HTMLSpanElement => el !== null
      );
      if (validChars.length === 0) return;

      if (ambientTlRef.current) {
        ambientTlRef.current.kill();
      }

      isWaveActiveRef.current = true;

      const tl = gsap.timeline({
        onComplete: () => {
          isWaveActiveRef.current = false;
          validChars.forEach((el) => {
            el.style.transform = "";
          });

          // Schedule next wave after 4.5 to 6.0 seconds of idle delay
          const nextDelay = 4.5 + Math.random() * 1.5;
          scheduleNextAmbientWave(nextDelay);
        },
      });

      ambientTlRef.current = tl;

      tl.to(validChars, {
        y: -2.5,
        scaleX: 1.03,
        scaleY: 1.008,
        duration: 0.2,
        stagger: 0.03,
        ease: "power2.out",
      }).to(validChars, {
        y: 0,
        scaleX: 1,
        scaleY: 1,
        duration: 0.25,
        stagger: 0.03,
        ease: "power3.out",
      });
    };

    const updateProximity = () => {
      if (!isHoveredRef.current || !mousePosRef.current) return;

      if (!isWaveActiveRef.current) {
        const { x: mouseX, y: mouseY } = mousePosRef.current;

        charRefs.current.forEach((charEl) => {
          if (!charEl) return;
          const rect = charEl.getBoundingClientRect();
          const charCenterX = rect.left + rect.width / 2;
          const charCenterY = rect.top + rect.height / 2;

          const dist = Math.hypot(mouseX - charCenterX, mouseY - charCenterY);

          if (dist < effectiveRadius) {
            // Smooth cosine falloff for tactile pressure field
            const t = Math.cos((dist / effectiveRadius) * (Math.PI / 2));
            const targetY = -effectiveMaxY * t;
            const targetScaleX = 1 + (effectiveMaxScaleX - 1) * t;
            const targetScaleY = 1 + (effectiveMaxScaleY - 1) * t;

            charEl.style.transform = `translate3d(0, ${targetY.toFixed(2)}px, 0) scale(${targetScaleX.toFixed(3)}, ${targetScaleY.toFixed(3)})`;
          } else {
            charEl.style.transform = `translate3d(0, 0px, 0) scale(1, 1)`;
          }
        });
      }

      if (isHoveredRef.current) {
        animFrameRef.current = requestAnimationFrame(updateProximity);
      }
    };

    const handlePointerEnter = (e: PointerEvent) => {
      isHoveredRef.current = true;
      mousePosRef.current = { x: e.clientX, y: e.clientY };

      // Kill ambient timelines/delayed calls on hover entry
      if (enableAmbientLoop) {
        if (ambientDelayedCallRef.current) {
          ambientDelayedCallRef.current.kill();
          ambientDelayedCallRef.current = null;
        }
        if (ambientTlRef.current) {
          ambientTlRef.current.kill();
          ambientTlRef.current = null;
        }
      }

      const rect = container.getBoundingClientRect();
      const enterX = e.clientX - rect.left;
      const isFromLeft = enterX < rect.width / 2;

      // Stop any existing wave timeline
      if (waveTimelineRef.current) {
        waveTimelineRef.current.kill();
      }

      const validChars = charRefs.current.filter((el): el is HTMLSpanElement => el !== null);
      const orderedChars = isFromLeft ? [...validChars] : [...validChars].reverse();

      isWaveActiveRef.current = true;

      const tl = gsap.timeline({
        onComplete: () => {
          isWaveActiveRef.current = false;
        },
      });
      waveTimelineRef.current = tl;

      const liftAmount = isFooter ? -2 : -3.5;

      tl.to(orderedChars, {
        y: liftAmount,
        scaleX: effectiveMaxScaleX,
        scaleY: effectiveMaxScaleY,
        duration: 0.18,
        stagger: 0.02,
        ease: "power2.out",
      }).to(orderedChars, {
        y: 0,
        scaleX: 1,
        scaleY: 1,
        duration: 0.22,
        stagger: 0.02,
        ease: "power3.out",
      });

      if (!animFrameRef.current) {
        animFrameRef.current = requestAnimationFrame(updateProximity);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      if (!animFrameRef.current && isHoveredRef.current) {
        animFrameRef.current = requestAnimationFrame(updateProximity);
      }
    };

    const handlePointerLeave = () => {
      isHoveredRef.current = false;
      isWaveActiveRef.current = false;
      mousePosRef.current = null;

      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      if (waveTimelineRef.current) {
        waveTimelineRef.current.kill();
      }

      if (enableAmbientLoop) {
        if (ambientDelayedCallRef.current) {
          ambientDelayedCallRef.current.kill();
          ambientDelayedCallRef.current = null;
        }
        if (ambientTlRef.current) {
          ambientTlRef.current.kill();
          ambientTlRef.current = null;
        }
      }

      const validChars = charRefs.current.filter((el): el is HTMLSpanElement => el !== null);
      if (validChars.length > 0) {
        gsap.to(validChars, {
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.01,
          ease: "power3.out",
          overwrite: "auto",
          onComplete: () => {
            validChars.forEach((el) => {
              el.style.transform = "";
            });

            // Resume ambient wave after 4.5 seconds of idle time following pointer leave
            if (enableAmbientLoop) {
              scheduleNextAmbientWave(4.5);
            }
          },
        });
      }
    };

    const handleFocus = () => {
      const validChars = charRefs.current.filter((el): el is HTMLSpanElement => el !== null);
      if (validChars.length > 0) {
        const liftAmount = isFooter ? -1.5 : -2.5;
        gsap.to(validChars, {
          y: liftAmount,
          scaleX: effectiveMaxScaleX,
          duration: 0.25,
          stagger: 0.02,
          ease: "power2.out",
        });
      }
    };

    const handleBlur = () => {
      const validChars = charRefs.current.filter((el): el is HTMLSpanElement => el !== null);
      if (validChars.length > 0) {
        gsap.to(validChars, {
          y: 0,
          scaleX: 1,
          scaleY: 1,
          duration: 0.35,
          ease: "power3.out",
          onComplete: () => {
            validChars.forEach((el) => {
              el.style.transform = "";
            });
          },
        });
      }
    };

    container.addEventListener("pointerenter", handlePointerEnter);
    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);
    container.addEventListener("focus", handleFocus);
    container.addEventListener("blur", handleBlur);

    // Initial trigger for ambient loop
    if (enableAmbientLoop) {
      scheduleNextAmbientWave(5.0);
    }

    return () => {
      container.removeEventListener("pointerenter", handlePointerEnter);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      container.removeEventListener("focus", handleFocus);
      container.removeEventListener("blur", handleBlur);

      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      if (waveTimelineRef.current) {
        waveTimelineRef.current.kill();
      }
      if (ambientDelayedCallRef.current) {
        ambientDelayedCallRef.current.kill();
      }
      if (ambientTlRef.current) {
        ambientTlRef.current.kill();
      }
    };
  }, [
    effectiveMaxY,
    effectiveMaxScaleX,
    effectiveMaxScaleY,
    effectiveRadius,
    isFooter,
    enableAmbientLoop,
  ]);

  return (
    <span
      ref={containerRef}
      className={`inline-flex items-center select-none ${className}`}
    >
      <span aria-hidden="true" className="inline-flex items-center">
        {characters.map((char, i) => (
          <span
            key={`${char}-${i}`}
            ref={(el) => {
              charRefs.current[i] = el;
            }}
            className="inline-block transform-gpu will-change-transform"
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
