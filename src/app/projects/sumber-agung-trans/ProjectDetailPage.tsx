"use client";

import ProjectDetailExperience from "@/components/projectDetail/ProjectDetailExperience";
import SumberAgungOverview from "@/components/projects/sumberAgungTrans/SumberAgungOverview";
import SumberAgungOperations from "@/components/projects/sumberAgungTrans/SumberAgungOperations";
import SumberAgungTechnology from "@/components/projects/sumberAgungTrans/SumberAgungTechnology";
import { SLIDE_01, SLIDE_02, SLIDE_03 } from "@/data/sumberAgungTransSlides";

const TOTAL_SLIDES = 3;

/**
 * Client component for the Sumber Agung Trans project detail experience.
 * Renders the three project slides inside the horizontal experience shell.
 */
export default function ProjectDetailPage() {
  return (
    <ProjectDetailExperience totalSlides={TOTAL_SLIDES}>
      {[
        <SumberAgungOverview key="slide-01" data={SLIDE_01} />,
        <SumberAgungOperations key="slide-02" data={SLIDE_02} />,
        <SumberAgungTechnology key="slide-03" data={SLIDE_03} />,
      ]}
    </ProjectDetailExperience>
  );
}
