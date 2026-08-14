"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { usePageTransition, normalizePath } from "@/context/PageTransitionContext";
import type { DestinationInfo } from "@/context/PageTransitionContext";

// ─── Visual & Motion Config ──────────────────────────────────────────────────
const CURTAIN_BG = "#1D242D";

// SVG Path Keyframes for fluid SVG morphing (douglus.site style)
// Coordinates in viewBox 0 0 100 100
const PATH_INITIAL     = "M 0 100 Q 50 100 100 100 L 100 100 L 0 100 Z";   // Flat below screen
const PATH_COVER_MID   = "M 0 0 Q 50 -25 100 0 L 100 100 L 0 100 Z";     // Arching up while covering
const PATH_COVER_FULL  = "M 0 0 Q 50 0 100 0 L 100 100 L 0 100 Z";       // 100% full screen rectangle
const PATH_REVEAL_MID  = "M 0 -50 Q 50 -25 100 -50 L 100 -50 L 0 -50 Z";   // Arching up while revealing
const PATH_REVEAL_END  = "M 0 -120 Q 50 -120 100 -120 L 100 -120 L 0 -120 Z"; // Exited above screen

const COVER_DURATION  = 0.85; // Cover travel duration
const REVEAL_DURATION = 0.90; // Reveal travel duration
const LABEL_IN_DUR    = 0.30;
const LABEL_OUT_DUR   = 0.25;

// ─── Component ────────────────────────────────────────────────────────────────
/**
 * PageTransitionOverlay
 *
 * SVG Path Morphing Page Transition (douglus.site / Awwwards fluid curtain style).
 * Uses native SVG path attribute interpolation for 100% fluid, organic motion.
 * Uses NO React useState — all animation state lives in refs.
 */
export default function PageTransitionOverlay() {
  const { subscribe, isActiveRef } = usePageTransition();
  const router = useRouter();
  const pathname = usePathname();

  // DOM refs
  const pathRef = useRef<SVGPathElement>(null);
  const labelNumRef = useRef<HTMLSpanElement>(null);
  const labelTitleRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  // Runtime transition refs
  const targetDestRef = useRef<DestinationInfo | null>(null);
  const coverTlRef = useRef<gsap.core.Timeline | null>(null);
  const revealTlRef = useRef<gsap.core.Timeline | null>(null);

  // Sync flags
  const labelInDoneRef = useRef(false);
  const revealPendingRef = useRef(false);
  const phaseRef = useRef<"idle" | "covering" | "navigating" | "revealing">("idle");

  // ── Reveal sequence ───────────────────────────────────────────────────────
  function startReveal() {
    if (revealTlRef.current) return; // already running
    phaseRef.current = "revealing";

    const path = pathRef.current;
    const label = labelRef.current;
    if (!path || !label) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tl = gsap.timeline({
      onComplete: () => {
        // Reset path to initial parked position below screen
        gsap.set(path, { attr: { d: PATH_INITIAL } });
        gsap.set(label, { opacity: 0, y: 0 });
        document.body.style.overflow = "";
        revealTlRef.current = null;
        targetDestRef.current = null;
        labelInDoneRef.current = false;
        revealPendingRef.current = false;
        phaseRef.current = "idle";
        isActiveRef.current = false;
      },
    });
    revealTlRef.current = tl;

    if (reduced) {
      tl.to(label, { opacity: 0, duration: 0.14, ease: "power2.in" }).to(path, {
        opacity: 0,
        duration: 0.20,
        ease: "power2.inOut",
      });
      return;
    }

    // 1. Label exits upward
    tl.to(label, {
      opacity: 0,
      y: -10,
      duration: LABEL_OUT_DUR,
      ease: "power2.in",
    });

    // 2. Fluid SVG curtain morphs upward to reveal new page
    tl.to(
      path,
      {
        attr: { d: PATH_REVEAL_MID },
        duration: REVEAL_DURATION * 0.5,
        ease: "power2.in",
      },
      0
    ).to(
      path,
      {
        attr: { d: PATH_REVEAL_END },
        duration: REVEAL_DURATION * 0.5,
        ease: "power2.out",
      },
      REVEAL_DURATION * 0.5
    );
  }

  // ── Pathname effect — route commit detection ──────────────────────────────
  const pathnameForEffect = pathname;
  useEffect(() => {
    if (phaseRef.current !== "navigating") return;
    const dest = targetDestRef.current;
    if (!dest) return;

    if (normalizePath(pathnameForEffect) !== normalizePath(dest.targetPath)) return;

    // Route committed. Flush 1 rAF tick and immediately start reveal
    requestAnimationFrame(() => {
      if (phaseRef.current !== "navigating") return;
      if (labelInDoneRef.current) {
        startReveal();
      } else {
        revealPendingRef.current = true;
      }
    });
  });

  // ── Subscribe to transition requests ─────────────────────────────────────
  useEffect(() => {
    const path = pathRef.current;
    const label = labelRef.current;
    const labelNum = labelNumRef.current;
    const labelTitle = labelTitleRef.current;

    function startCover(dest: DestinationInfo) {
      if (!path || !label || !labelNum || !labelTitle) return;

      // Kill any stale timelines
      if (coverTlRef.current) { coverTlRef.current.kill(); coverTlRef.current = null; }
      if (revealTlRef.current) { revealTlRef.current.kill(); revealTlRef.current = null; }

      targetDestRef.current = dest;
      labelInDoneRef.current = false;
      revealPendingRef.current = false;
      phaseRef.current = "covering";

      // Direct DOM text update
      labelNum.textContent = dest.number;
      labelTitle.textContent = dest.label;

      document.body.style.overflow = "hidden";

      // Reset path to start below screen
      gsap.set(path, { opacity: 1, attr: { d: PATH_INITIAL } });
      gsap.set(label, { opacity: 0, y: 10 });

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        phaseRef.current = "navigating";
        router.push(dest.href, { scroll: false });
        gsap.to(label, {
          opacity: 1,
          duration: 0.14,
          ease: "power2.out",
          onComplete: () => {
            labelInDoneRef.current = true;
            if (revealPendingRef.current) startReveal();
          },
        });
        return;
      }

      // Build continuous fluid cover timeline
      const coverTl = gsap.timeline();
      coverTlRef.current = coverTl;

      // 1. Fluid SVG path morphing from bottom to full screen
      coverTl
        .to(path, {
          attr: { d: PATH_COVER_MID },
          duration: COVER_DURATION * 0.55,
          ease: "power2.in",
        })
        .to(path, {
          attr: { d: PATH_COVER_FULL },
          duration: COVER_DURATION * 0.45,
          ease: "power2.out",
        });

      // 2. Label enters seamlessly while curtain reaches top
      coverTl.to(
        label,
        {
          opacity: 1,
          y: 0,
          duration: LABEL_IN_DUR,
          ease: "power2.out",
          onComplete: () => {
            labelInDoneRef.current = true;
            if (revealPendingRef.current) startReveal();
          },
        },
        COVER_DURATION * 0.55
      );

      // 3. Trigger router.push exactly at 100% full coverage
      coverTl.call(() => {
        phaseRef.current = "navigating";
        router.push(dest.href, { scroll: false });
      }, undefined, COVER_DURATION);
    }

    const unsubscribe = subscribe(startCover);
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      data-page-transition-overlay
      aria-hidden="true"
      className="fixed inset-0 z-[9999] overflow-hidden pointer-events-none select-none"
    >
      {/* Layer 1: SVG Fluid Path Curtain */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          fill={CURTAIN_BG}
          d={PATH_INITIAL}
        />
      </svg>

      {/* Layer 2: Destination Label */}
      <div
        ref={labelRef}
        data-transition-label
        className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none"
        style={{ opacity: 0, color: "#E9F5FE" }}
      >
        <span
          ref={labelNumRef}
          className="block text-xl font-semibold uppercase tracking-[0.18em] mb-3 sm:text-2xl"
          style={{ color: "rgba(233,245,254,0.60)" }}
        />
        <h2
          ref={labelTitleRef}
          className="font-normal uppercase leading-none tracking-tight"
          style={{ fontSize: "clamp(36px, 7vw, 96px)" }}
        />
      </div>
    </div>
  );
}
