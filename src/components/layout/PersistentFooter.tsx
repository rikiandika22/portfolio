"use client";

import { forwardRef } from "react";
import HorizontalProgress, {
  HorizontalProgressRef,
} from "@/components/horizontal/HorizontalProgress";
import ProximityText from "./ProximityText";

const PersistentFooter = forwardRef<HorizontalProgressRef>((_, ref) => {
  return (
    <footer
      data-persistent-footer
      className="fixed bottom-0 left-0 right-0 z-40 w-full pointer-events-auto bg-transparent mix-blend-difference text-white"
      style={{
        paddingInline: "var(--page-padding-inline)",
        paddingBottom: "var(--page-padding-block)",
      }}
    >
      {/*
       * Stable layout:
       * Desktop: 1fr auto 1fr three-column grid with center progress indicator
       * Mobile: flex justify-between two-item layout (copyright on left, credit on right, slider hidden)
       */}
      <div className="flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr] gap-2 sm:gap-4 w-full text-white">
        {/* Left — Copyright */}
        <ProximityText
          text="© 2026 Portfolio"
          isFooter
          className="justify-self-start shrink-0 text-[10px] xs:text-xs sm:text-base lg:text-xl font-bold leading-none tracking-tight text-white whitespace-nowrap"
        />

        {/* Center — Horizontal Progress Indicator (Desktop only) */}
        <div className="justify-self-center hidden lg:flex items-center justify-center">
          <HorizontalProgress ref={ref} />
        </div>

        {/* Right — Credit */}
        <ProximityText
          text="Design & Code by Riki Andika"
          isFooter
          enableAmbientLoop
          className="justify-self-end shrink-0 text-[10px] xs:text-xs sm:text-base lg:text-xl font-bold leading-none tracking-tight text-white whitespace-nowrap text-right"
        />
      </div>
    </footer>
  );
});

PersistentFooter.displayName = "PersistentFooter";

export default PersistentFooter;
