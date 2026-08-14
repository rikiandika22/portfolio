import { ReactNode } from "react";

interface ProjectDetailTrackProps {
  children: ReactNode;
}

/** Horizontal track container for project detail slides. */
export default function ProjectDetailTrack({ children }: ProjectDetailTrackProps) {
  return (
    <div className="project-detail-track flex h-full w-full flex-nowrap">
      {children}
    </div>
  );
}
