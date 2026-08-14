"use client";

import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import PersistentNavigation from "@/components/layout/PersistentNavigation";
import PersistentFooter from "@/components/layout/PersistentFooter";
import ProjectDetailTrack from "./ProjectDetailTrack";
import ProjectDetailSlide from "./ProjectDetailSlide";
import { HorizontalProgressRef } from "@/components/horizontal/HorizontalProgress";
import {
  PROJECT_STACK_PATH,
  PROJECT_STACK_SKIP_SPLASH_KEY,
} from "@/lib/projectNavigation";

interface ProjectDetailExperienceProps {
  totalSlides: number;
  children: React.ReactNode[];
}

const INTERACTIVE_SELECTOR =
  "button, a, input, select, textarea, [role='button'], [contenteditable='true']";

/**
 * Fixed project-detail shell. The title and blue surface stay in place while
 * only the panels inside the surface participate in horizontal scrolling.
 */
export default function ProjectDetailExperience({
  totalSlides,
  children,
}: ProjectDetailExperienceProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const footerProgressRef = useRef<HorizontalProgressRef>(null);
  const scrollTweenRef = useRef<gsap.core.Tween | null>(null);
  const pointerPending = useRef(false);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartY = useRef(0);
  const scrollStartX = useRef(0);

  const updateProgress = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const maxScroll = scroller.scrollWidth - scroller.clientWidth;
    const progress = maxScroll > 0 ? scroller.scrollLeft / maxScroll : 0;
    footerProgressRef.current?.setProgress(progress);
  }, []);

  const killScrollTween = useCallback(() => {
    scrollTweenRef.current?.kill();
    scrollTweenRef.current = null;
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const handleScroll = () => updateProgress();
    const stopProgrammaticScroll = () => killScrollTween();

    updateProgress();
    scroller.addEventListener("scroll", handleScroll, { passive: true });
    scroller.addEventListener("wheel", stopProgrammaticScroll, { passive: true });
    scroller.addEventListener("touchstart", stopProgrammaticScroll, {
      passive: true,
    });

    return () => {
      scroller.removeEventListener("scroll", handleScroll);
      scroller.removeEventListener("wheel", stopProgrammaticScroll);
      scroller.removeEventListener("touchstart", stopProgrammaticScroll);
    };
  }, [killScrollTween, updateProgress]);

  useEffect(() => () => killScrollTween(), [killScrollTween]);

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const scroller = scrollerRef.current;
      const target = event.target as HTMLElement;

      if (
        !scroller ||
        event.button !== 0 ||
        target.closest(INTERACTIVE_SELECTOR)
      ) {
        return;
      }

      killScrollTween();
      pointerPending.current = true;
      isDragging.current = false;
      dragStartX.current = event.clientX;
      dragStartY.current = event.clientY;
      scrollStartX.current = scroller.scrollLeft;
    },
    [killScrollTween]
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const scroller = scrollerRef.current;
      if (!pointerPending.current || !scroller) return;

      const deltaX = dragStartX.current - event.clientX;
      const deltaY = dragStartY.current - event.clientY;

      if (!isDragging.current) {
        if (Math.abs(deltaX) < 5 && Math.abs(deltaY) < 5) return;

        if (Math.abs(deltaY) >= Math.abs(deltaX)) {
          pointerPending.current = false;
          return;
        }

        isDragging.current = true;
        scroller.setPointerCapture(event.pointerId);
        scroller.style.cursor = "grabbing";
      }

      event.preventDefault();
      scroller.scrollLeft = scrollStartX.current + deltaX;
    },
    []
  );

  const endPointerInteraction = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      if (scroller.hasPointerCapture(event.pointerId)) {
        scroller.releasePointerCapture(event.pointerId);
      }

      pointerPending.current = false;
      isDragging.current = false;
      scroller.style.cursor = "grab";
    },
    []
  );

  const navigateToSlide = useCallback(
    (slideIndex: number) => {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      const slides = scroller.querySelectorAll<HTMLElement>("[data-slide-index]");
      const targetSlide = slides[slideIndex];
      if (!targetSlide) return;

      killScrollTween();
      const targetX = targetSlide.offsetLeft;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        scroller.scrollLeft = targetX;
        return;
      }

      const scrollPosition = { x: scroller.scrollLeft };
      scrollTweenRef.current = gsap.to(scrollPosition, {
        x: targetX,
        duration: 0.9,
        ease: "power3.inOut",
        overwrite: true,
        onUpdate: () => {
          scroller.scrollLeft = scrollPosition.x;
        },
        onComplete: () => {
          scrollTweenRef.current = null;
        },
      });
    },
    [killScrollTween]
  );

  const getCurrentSlideIndex = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return 0;

    const slides = scroller.querySelectorAll<HTMLElement>("[data-slide-index]");
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    slides.forEach((slide, index) => {
      const distance = Math.abs(slide.offsetLeft - scroller.scrollLeft);
      if (distance < closestDistance) {
        closestIndex = index;
        closestDistance = distance;
      }
    });

    return closestIndex;
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;

      const currentSlide = getCurrentSlideIndex();
      if (event.key === "ArrowLeft" && currentSlide > 0) {
        event.preventDefault();
        navigateToSlide(currentSlide - 1);
      }
      if (event.key === "ArrowRight" && currentSlide < totalSlides - 1) {
        event.preventDefault();
        navigateToSlide(currentSlide + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [getCurrentSlideIndex, navigateToSlide, totalSlides]);

  return (
    <div
      data-project-detail-experience
      className="relative h-screen h-[100dvh] w-full select-none overflow-hidden"
    >
      <div
        className="pointer-events-none fixed inset-0 z-0 h-full w-full"
        style={{ background: "var(--color-page-background)" }}
      />

      <PersistentNavigation />

      <main
        className="absolute inset-0 z-10 flex min-h-0 w-full flex-col items-center"
        style={{
          paddingTop: "calc(var(--page-padding-block) + 3.5rem)",
          paddingBottom: "calc(var(--page-padding-block) + 2.25rem)",
        }}
      >
        <h1
          className="project-detail-heading shrink-0 text-center font-normal uppercase leading-none tracking-tight text-text-primary"
          style={{
            fontSize: "clamp(40px, 6.11vw, 88px)",
            letterSpacing: "-0.02em",
          }}
        >
          <Link
            href={PROJECT_STACK_PATH}
            scroll={false}
            onNavigate={() => {
              sessionStorage.setItem(PROJECT_STACK_SKIP_SPLASH_KEY, "true");
            }}
            aria-label="Back to the Personal Project selector"
            className="rounded-sm uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-4"
          >
            Personal Project
          </Link>
        </h1>

        <div className="relative mx-auto flex min-h-0 w-full max-w-[var(--project-card-max-width)] flex-1 flex-col overflow-hidden px-[var(--page-padding-inline)]">
          <section
            data-project-detail-card
            aria-label="Project details"
            className="relative min-h-0 flex-1 overflow-hidden rounded-2xl w-full"
            style={{ backgroundColor: "var(--color-surface-dark-blue)" }}
          >
            <div
              ref={scrollerRef}
              data-project-scroller
              className="absolute inset-0 z-0 overflow-x-auto overflow-y-hidden"
              style={{
                cursor: "grab",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
                touchAction: "pan-x pan-y",
              }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endPointerInteraction}
              onPointerCancel={endPointerInteraction}
            >
              <ProjectDetailTrack>
                {children.map((child, index) => (
                  <ProjectDetailSlide key={index} index={index}>
                    {child}
                  </ProjectDetailSlide>
                ))}
              </ProjectDetailTrack>
            </div>
          </section>
        </div>
      </main>

      <style>{`
        [data-project-scroller]::-webkit-scrollbar { display: none; }

        [data-project-detail-experience] .project-detail-heading {
          margin-bottom: 32px;
        }

        [data-project-detail-experience] .sat-showcase,
        [data-project-detail-experience] .pos-overview,
        [data-project-detail-experience] .pos-technology,
        [data-project-detail-experience] .moneylog-overview,
        [data-project-detail-experience] .moneylog-technology {
          padding: 28px 44px 52px;
        }

        [data-project-detail-experience] .sat-technology {
          padding: 18px 36px 46px;
        }

        [data-project-detail-experience] .sat-project-copy,
        [data-project-detail-experience] .sat-features {
          margin-top: 12px;
          padding-left: 44px;
        }

        [data-project-detail-experience] .sat-feature-button {
          padding-block: 7px;
        }

        [data-project-detail-experience] .sat-feature-copy {
          padding: 12px 0 9px;
        }

        [data-project-detail-experience] .sat-tech-button {
          padding-block: 9px;
        }

        [data-project-detail-experience] .sat-tech-compact {
          padding: 14px 0 14px 36px;
        }

        [data-project-detail-experience] .sat-tech-expanded {
          padding: 8px 40px 12px 0;
        }

        [data-project-detail-experience] .sat-tech-divider {
          padding-bottom: 26px;
        }

        [data-project-detail-experience] .sat-tech-divider[data-expanded="true"] {
          padding-bottom: 58px;
        }

        @media (min-width: 1024px) and (max-height: 820px) {
          [data-project-detail-experience] > main {
            padding-top: calc(var(--page-padding-block) + 3rem) !important;
          }

          [data-project-detail-experience] .project-detail-heading {
            margin-bottom: 24px;
            font-size: 72px !important;
          }

          [data-project-detail-experience] .sat-technology {
            row-gap: 8px;
            padding: 12px 36px 40px;
          }

          [data-project-detail-experience] .sat-technology > h2 {
            margin-top: 4px;
            font-size: 72px !important;
          }

          [data-project-detail-experience] .sat-tech-divider[data-expanded="false"] {
            padding-bottom: 7px;
          }
        }

        @media (max-width: 639px) {
          [data-project-detail-experience] > main {
            padding-top: 68px !important;
            padding-bottom: 64px !important;
          }

          [data-project-detail-experience] .project-detail-heading {
            margin-bottom: 12px;
          }

          [data-project-detail-experience] .sat-showcase,
          [data-project-detail-experience] .pos-overview,
          [data-project-detail-experience] .moneylog-overview,
          [data-project-detail-experience] .sat-technology {
            padding: 16px 16px 44px;
          }

          [data-project-detail-experience] .sat-project-copy,
          [data-project-detail-experience] .sat-features,
          [data-project-detail-experience] .sat-tech-compact {
            padding-left: 0;
          }

          [data-project-detail-experience] .sat-tech-expanded {
            padding-right: 0;
          }
        }
      `}</style>

      <PersistentFooter ref={footerProgressRef} />
    </div>
  );
}
