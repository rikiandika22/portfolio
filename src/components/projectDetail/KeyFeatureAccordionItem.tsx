"use client";

import { useRef, useCallback } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface KeyFeatureAccordionItemProps {
  id: string;
  number: string;
  title: string;
  description: string;
  isOpen: boolean;
  onToggle: (id: string) => void;
}

/**
 * Individual Key Feature accordion row.
 * Independently toggleable with smooth GSAP height + opacity animation.
 */
export default function KeyFeatureAccordionItem({
  id,
  number,
  title,
  description,
  isOpen,
  onToggle,
}: KeyFeatureAccordionItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const content = contentRef.current;
      const arrow = arrowRef.current;
      if (!content || !arrow) return;

      gsap.killTweensOf([content, arrow]);

      if (prefersReducedMotion) {
        gsap.set(content, {
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
          overflow: "hidden",
        });
        gsap.set(arrow, { rotation: isOpen ? 180 : 0 });
        return;
      }

      if (isOpen) {
        const currentHeight = content.getBoundingClientRect().height;
        gsap.set(content, { height: "auto", overflow: "hidden" });
        const fullHeight = content.scrollHeight;
        gsap.set(content, { height: currentHeight });
        gsap.to(content, {
          height: fullHeight,
          opacity: 1,
          duration: 0.42,
          ease: "power3.out",
          overwrite: true,
          onComplete: () => {
            gsap.set(content, { height: "auto", opacity: 1, overflow: "hidden" });
          },
        });
        gsap.to(arrow, { rotation: 180, duration: 0.3, ease: "power2.inOut" });
      } else {
        gsap.set(content, {
          height: content.getBoundingClientRect().height,
          overflow: "hidden",
        });
        gsap.to(content, {
          height: 0,
          opacity: 0,
          duration: 0.35,
          ease: "power3.inOut",
          overflow: "hidden",
          overwrite: true,
          onComplete: () => {
            gsap.set(content, { height: 0, opacity: 0, overflow: "hidden" });
          },
        });
        gsap.to(arrow, { rotation: 0, duration: 0.3, ease: "power2.inOut" });
      }
    },
    { scope: containerRef, dependencies: [isOpen] }
  );

  const handleToggle = useCallback(() => {
    onToggle(id);
  }, [id, onToggle]);

  return (
    <div ref={containerRef} className="w-full">
      {/* Toggle button row */}
      <button
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-label={`${isOpen ? "Collapse" : "Expand"} ${title}`}
        className="sat-feature-button flex w-full cursor-pointer items-center justify-between gap-4 rounded-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      >
        <span className="text-sm font-bold leading-[1.4] text-white sm:text-base">
          {title}
        </span>
        <div className="flex items-center gap-3 shrink-0">
          <span
            className="text-sm font-semibold"
            style={{ color: "var(--color-text-light-secondary)" }}
          >
            {number}
          </span>
          <svg
            ref={arrowRef}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            style={{ color: "var(--color-text-light-secondary)" }}
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>

      {/* Divider */}
      <div
        className="h-px w-full opacity-40"
        style={{ backgroundColor: "var(--color-text-light-secondary)" }}
      />

      {/* Expandable description */}
      <div
        ref={contentRef}
        style={{ height: 0, opacity: 0, overflow: "hidden" }}
      >
        <p
          className="sat-feature-copy text-xs font-normal leading-[1.5] sm:text-sm"
          style={{ color: "var(--color-text-light-secondary)" }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
