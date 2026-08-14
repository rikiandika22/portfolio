"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";

export interface ProjectSlideProgressRef {
  setProgress: (progress: number) => void;
}

interface ProjectSlideProgressProps {
  totalSlides: number;
}

/**
 * Internal project slide progress indicator.
 * Thin horizontal bar showing position across project slides.
 */
const ProjectSlideProgress = forwardRef<ProjectSlideProgressRef, ProjectSlideProgressProps>(
  (_, ref) => {
    const barRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      setProgress: (p: number) => {
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${Math.max(0, Math.min(1, p))})`;
        }
      },
    }));

    return (
      <div className="flex w-48 items-center">
        <div
          className="relative h-px w-full overflow-hidden"
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--color-text-light-secondary) 30%, transparent)",
          }}
        >
          <div
            ref={barRef}
            className="absolute inset-y-0 left-0 w-full origin-left transition-transform duration-75 ease-out"
            style={{
              backgroundColor: "var(--color-text-light-secondary)",
              transform: "scaleX(0)",
            }}
          />
        </div>
      </div>
    );
  }
);

ProjectSlideProgress.displayName = "ProjectSlideProgress";

export default ProjectSlideProgress;
