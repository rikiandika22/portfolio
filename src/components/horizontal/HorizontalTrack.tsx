import { ReactNode } from "react";

interface HorizontalTrackProps {
  children: ReactNode;
}

export default function HorizontalTrack({ children }: HorizontalTrackProps) {
  return (
    <div className="horizontal-track flex flex-col w-full h-auto lg:flex-row lg:flex-nowrap lg:w-max lg:h-full">
      {children}
    </div>
  );
}
