"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";

export interface HorizontalProgressRef {
  setProgress: (progress: number) => void;
  setPanelStep: (currentStep: number, totalSteps: number) => void;
}

const HorizontalProgress = forwardRef<HorizontalProgressRef>((_, ref) => {
  const barRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    setProgress: (p: number) => {
      const clampedP = Math.max(0, Math.min(1, p));
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${clampedP})`;
      }
      if (containerRef.current) {
        // Slider only appears when user triggers scroll away from initial homepage state (p > 0.001)
        if (clampedP > 0.001) {
          containerRef.current.style.opacity = "1";
        } else {
          containerRef.current.style.opacity = "0";
        }
      }
    },
    setPanelStep: () => {
      // Panel step text indicator removed per user request
    },
  }));

  return (
    <div
      ref={containerRef}
      className="w-12 xs:w-16 sm:w-28 lg:w-64 flex items-center transition-opacity duration-300 ease-out pointer-events-none"
      style={{ opacity: 0 }}
    >
      {/* Progress slider track line */}
      <div className="w-full h-px relative overflow-hidden bg-white/40">
        <div
          ref={barRef}
          className="absolute inset-y-0 left-0 w-full origin-left bg-white transition-transform duration-75 ease-out"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
});

HorizontalProgress.displayName = "HorizontalProgress";

export default HorizontalProgress;
