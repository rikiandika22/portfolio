"use client";

import { forwardRef } from "react";
import HorizontalProgress, {
  HorizontalProgressRef,
} from "@/components/horizontal/HorizontalProgress";

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
       * Stable three-column grid:
       * Desktop: 1fr auto 1fr with 20px typography
       * Mobile: auto 1fr auto with responsive 10px-12px typography
       */}
      <div className="grid grid-cols-[auto_1fr_auto] sm:grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4 w-full text-white">
        {/* Left — Copyright */}
        <span className="justify-self-start shrink-0 text-[10px] xs:text-xs sm:text-base lg:text-xl font-bold leading-none tracking-tight text-white whitespace-nowrap">
          © 2026 Portfolio
        </span>

        {/* Center — Horizontal Progress Indicator */}
        <div className="justify-self-center flex items-center justify-center">
          <HorizontalProgress ref={ref} />
        </div>

        {/* Right — Credit */}
        <span className="justify-self-end shrink-0 text-[10px] xs:text-xs sm:text-base lg:text-xl font-bold leading-none tracking-tight text-white whitespace-nowrap text-right">
          Design &amp; Code by Riki Andika
        </span>
      </div>
    </footer>
  );
});

PersistentFooter.displayName = "PersistentFooter";

export default PersistentFooter;
