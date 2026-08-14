import type { ProjectSlideData } from "@/data/sumberAgungTransSlides";
import ProjectShowcase from "./ProjectShowcase";

interface SumberAgungOverviewProps {
  data: ProjectSlideData;
}

/**
 * Slide 01 — Fleet Management Overview.
 * Shows laptop + mobile mockups, section title, and two-column description.
 * Matches: docs/references/figma/works/sumberagungtrans/slide-1.png
 */
export default function SumberAgungOverview({ data }: SumberAgungOverviewProps) {
  return (
    <ProjectShowcase
      data={data}
      webAlt="Sumber Agung Trans fleet-management web interface"
      mobileAlt="Sumber Agung Trans fleet-management mobile interface"
      preloadWebImage
    />
  );
}
