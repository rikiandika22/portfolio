import { ReactNode } from "react";

interface HorizontalTrackProps {
  children: ReactNode;
}

export default function HorizontalTrack({ children }: HorizontalTrackProps) {
  return (
    <div className="horizontal-track flex flex-nowrap w-max h-full">
      {children}
    </div>
  );
}
