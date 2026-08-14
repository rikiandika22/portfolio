import type { ProjectSlideData } from "@/data/sumberAgungTransSlides";
import ProjectShowcase from "./ProjectShowcase";

interface SumberAgungOperationsProps {
  data: ProjectSlideData;
}

/**
 * Slide 02 — Reservation and Fleet Operations.
 * Shows the reservation web and mobile production screenshots.
 * Matches: docs/references/figma/works/sumberagungtrans/slide-2.png
 */
export default function SumberAgungOperations({ data }: SumberAgungOperationsProps) {
  return (
    <ProjectShowcase
      data={data}
      webAlt="Sumber Agung Trans reservation web interface"
      mobileAlt="Sumber Agung Trans reservation mobile interface"
    />
  );
}
