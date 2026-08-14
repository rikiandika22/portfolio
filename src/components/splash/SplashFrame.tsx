import { ReactNode } from "react";

interface SplashFrameProps {
  children: ReactNode;
}

export default function SplashFrame({ children }: SplashFrameProps) {
  return (
    <div className="splash-outer-container fixed inset-0 z-[80] w-full h-[100dvh] overflow-hidden pointer-events-auto bg-[#1D242D]">
      {/* Dark Splash Surface */}
      <div
        className="splash-surface relative w-full h-full bg-[#1D242D] flex items-center justify-center overflow-hidden"
        style={{
          paddingInline: "var(--page-padding-inline)",
          paddingBlock: "var(--page-padding-block)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
