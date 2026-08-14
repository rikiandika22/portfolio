"use client";

import { useRef, useCallback } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import TechIcon from "./TechIcon";
import TechStackGroup from "./TechStackGroup";
import type { TechStackGroup as TechStackGroupData, TechStackIcon } from "@/data/sumberAgungTransSlides";

interface TechStackAccordionProps {
  groups: TechStackGroupData[];
  allIcons: TechStackIcon[];
  isExpanded: boolean;
  onToggle: () => void;
}

/**
 * Tech Stack accordion with FLIP-style transformation.
 * Compact: horizontal icon row.
 * Expanded: 4-column grid with category headings, icons, and descriptions.
 */
export default function TechStackAccordion({
  groups,
  allIcons,
  isExpanded,
  onToggle,
}: TechStackAccordionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const compactRef = useRef<HTMLDivElement>(null);
  const expandedRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const compact = compactRef.current;
      const expanded = expandedRef.current;
      const arrow = arrowRef.current;
      if (!compact || !expanded || !arrow) return;

      timelineRef.current?.kill();
      gsap.killTweensOf([compact, expanded, arrow]);
      gsap.killTweensOf(expanded.querySelectorAll(".tech-group"));

      const compactIcons = Array.from(
        compact.querySelectorAll<HTMLElement>("[data-tech-icon]")
      );
      const expandedIcons = Array.from(
        expanded.querySelectorAll<HTMLElement>("[data-tech-icon]")
      );
      gsap.killTweensOf([...compactIcons, ...expandedIcons]);

      if (prefersReducedMotion) {
        if (isExpanded) {
          gsap.set(compact, { display: "none", opacity: 0, clearProps: "position,top,left,width" });
          gsap.set(expanded, {
            display: "grid",
            opacity: 1,
            height: "auto",
            visibility: "visible",
          });
          gsap.set(arrow, { rotation: 180 });
        } else {
          gsap.set(compact, {
            display: "flex",
            opacity: 1,
            clearProps: "position,top,left,width,visibility",
          });
          gsap.set(expanded, {
            display: "none",
            opacity: 0,
            height: 0,
            visibility: "hidden",
          });
          gsap.set(arrow, { rotation: 0 });
        }
        return;
      }

      if (isExpanded) {
        const compactTop = compact.offsetTop;
        const compactRects = new Map(
          compactIcons.map((icon) => [
            icon.dataset.techIcon,
            icon.getBoundingClientRect(),
          ])
        );

        gsap.set(compact, {
          display: "flex",
          position: "absolute",
          top: compactTop,
          left: 0,
          width: "100%",
          visibility: "visible",
        });
        gsap.set(expanded, {
          display: "grid",
          height: "auto",
          opacity: 1,
          visibility: "hidden",
          overflow: "hidden",
        });
        gsap.set(expandedIcons, { clearProps: "transform,opacity" });

        const expandedHeight = expanded.scrollHeight;
        const targetRects = new Map(
          expandedIcons.map((icon) => [
            icon.dataset.techIcon,
            icon.getBoundingClientRect(),
          ])
        );

        gsap.set(expanded, { height: 0, visibility: "visible" });
        expandedIcons.forEach((icon) => {
          const source = compactRects.get(icon.dataset.techIcon);
          const target = targetRects.get(icon.dataset.techIcon);
          if (!source || !target) return;
          gsap.set(icon, {
            x: source.left - target.left,
            y: source.top - target.top,
            scale: source.width / target.width,
            transformOrigin: "center center",
          });
        });
        gsap.set(expanded.querySelectorAll(".tech-group-copy"), {
          opacity: 0,
          y: 12,
        });

        const tl = gsap.timeline({
          defaults: { overwrite: true },
          onComplete: () => {
            gsap.set(compact, {
              display: "none",
              opacity: 0,
              clearProps: "position,top,left,width,visibility",
            });
            gsap.set(expanded, {
              display: "grid",
              height: "auto",
              opacity: 1,
              visibility: "visible",
              overflow: "visible",
            });
            gsap.set(expandedIcons, { clearProps: "transform,opacity" });
          },
        });
        timelineRef.current = tl;
        tl.to(compact, { opacity: 0, duration: 0.28, ease: "power2.in" }, 0)
          .to(expanded, { height: expandedHeight, duration: 0.68, ease: "power3.inOut" }, 0)
          .to(
            expandedIcons,
            {
              x: 0,
              y: 0,
              scale: 1,
              opacity: 1,
              duration: 0.68,
              stagger: 0.025,
              ease: "power3.inOut",
            },
            0
          )
          .to(
            expanded.querySelectorAll(".tech-group-copy"),
            { opacity: 1, y: 0, duration: 0.35, stagger: 0.055, ease: "power2.out" },
            0.3
          )
          .to(arrow, { rotation: 180, duration: 0.3, ease: "power2.inOut" }, 0);
      } else {
        const expandedHeight = expanded.getBoundingClientRect().height;
        gsap.set(expanded, {
          display: expandedHeight > 0 ? "grid" : "none",
          height: expandedHeight,
          opacity: expandedHeight > 0 ? 1 : 0,
          visibility: expandedHeight > 0 ? "visible" : "hidden",
          overflow: "hidden",
        });
        const expandedRects = new Map(
          expandedIcons.map((icon) => [
            icon.dataset.techIcon,
            icon.getBoundingClientRect(),
          ])
        );
        const compactTop = expanded.offsetTop;
        gsap.set(compact, {
          display: "flex",
          position: expandedHeight > 0 ? "absolute" : "relative",
          top: expandedHeight > 0 ? compactTop : "auto",
          left: 0,
          width: "100%",
          opacity: expandedHeight > 0 ? 0 : 1,
          visibility: expandedHeight > 0 ? "hidden" : "visible",
        });
        gsap.set(compactIcons, { clearProps: "transform,opacity" });
        const compactHeight = compact.scrollHeight;
        const compactRects = new Map(
          compactIcons.map((icon) => [
            icon.dataset.techIcon,
            icon.getBoundingClientRect(),
          ])
        );
        gsap.set(compact, { visibility: "visible" });

        expandedIcons.forEach((icon) => {
          const source = expandedRects.get(icon.dataset.techIcon);
          const target = compactRects.get(icon.dataset.techIcon);
          if (!source || !target) return;
          gsap.set(icon, { transformOrigin: "center center" });
        });

        const tl = gsap.timeline({
          defaults: { overwrite: true },
          onComplete: () => {
            gsap.set(expanded, {
              display: "none",
              height: 0,
              opacity: 0,
              visibility: "hidden",
              overflow: "hidden",
            });
            gsap.set(compact, {
              display: "flex",
              opacity: 1,
              visibility: "visible",
              clearProps: "position,top,left,width",
            });
            gsap.set([...compactIcons, ...expandedIcons], {
              clearProps: "transform,opacity",
            });
          },
        });
        timelineRef.current = tl;
        if (expandedHeight > 0) {
          tl.to(
            expanded.querySelectorAll(".tech-group-copy"),
            { opacity: 0, y: 10, duration: 0.2, stagger: 0.02 },
            0
          )
            .to(
              expandedIcons,
              {
                x: (index, icon: HTMLElement) => {
                  const source = expandedRects.get(icon.dataset.techIcon);
                  const target = compactRects.get(icon.dataset.techIcon);
                  return source && target ? target.left - source.left : 0;
                },
                y: (index, icon: HTMLElement) => {
                  const source = expandedRects.get(icon.dataset.techIcon);
                  const target = compactRects.get(icon.dataset.techIcon);
                  return source && target ? target.top - source.top : 0;
                },
                scale: (index, icon: HTMLElement) => {
                  const source = expandedRects.get(icon.dataset.techIcon);
                  const target = compactRects.get(icon.dataset.techIcon);
                  return source && target ? target.width / source.width : 1;
                },
                opacity: 0.35,
                duration: 0.48,
                stagger: 0.018,
                ease: "power3.inOut",
              },
              0
            )
            .to(expanded, {
              height: compactHeight,
              opacity: 0,
              duration: 0.48,
              ease: "power3.inOut",
            }, 0)
            .to(compact, { opacity: 1, duration: 0.3, ease: "power2.out" }, 0.24);
        }
        tl.to(arrow, { rotation: 0, duration: 0.3, ease: "power2.inOut" }, 0);
      }
    },
    { scope: containerRef, dependencies: [isExpanded] }
  );

  const handleToggle = useCallback(() => {
    onToggle();
  }, [onToggle]);

  return (
    <div ref={containerRef} className="relative w-full pt-1">
      {/* Header row with toggle */}
      <button
        onClick={handleToggle}
        aria-expanded={isExpanded}
        aria-label={`${isExpanded ? "Collapse" : "Expand"} Tech Stack`}
        className="sat-tech-button flex w-full cursor-pointer items-center gap-3 rounded-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      >
        {/* Circle arrow icon matching Figma */}
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border"
          style={{ borderColor: "var(--color-text-light-secondary)" }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
            style={{ color: "var(--color-text-light-secondary)" }}
          >
            <path
              d="M3 6H9M9 6L6.5 3.5M9 6L6.5 8.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="text-lg font-bold leading-[1.35] text-white sm:text-xl">
          Tech Stack
        </span>
      </button>

      {/* Compact state: horizontal icon row */}
      <div
        ref={compactRef}
        className="sat-tech-compact flex flex-wrap items-center gap-3"
      >
        {allIcons.map((icon) => (
          <TechIcon key={icon.name} name={icon.name} src={icon.src} size={56} />
        ))}
      </div>

      {/* Expanded state: category grid */}
      <div
        ref={expandedRef}
        className="sat-tech-expanded grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10 xl:gap-x-14"
        style={{ display: "none", opacity: 0, height: 0, overflow: "hidden" }}
      >
        {groups.map((group) => (
          <div key={group.id} className="tech-group">
            <TechStackGroup
              category={group.category}
              icons={group.icons}
              description={group.description}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleToggle}
        aria-label={`${isExpanded ? "Collapse" : "Expand"} Tech Stack`}
        data-expanded={isExpanded}
        className="sat-tech-divider flex w-full cursor-pointer items-center gap-4 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      >
        <span
          aria-hidden="true"
          className="h-px flex-1 opacity-50"
          style={{ backgroundColor: "var(--color-text-light-secondary)" }}
        />
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
      </button>
    </div>
  );
}
