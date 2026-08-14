"use client";

import ProjectDetailExperience from "@/components/projectDetail/ProjectDetailExperience";
import PosOverview from "@/components/projects/posCashierApp/PosOverview";
import PosTechnology from "@/components/projects/posCashierApp/PosTechnology";
import { POS_SLIDE_01, POS_SLIDE_02 } from "@/data/posCashierAppSlides";

const TOTAL_SLIDES = 2;

/**
 * Client component for the 32 BLOC (POS Cashier App) project detail experience.
 * Renders the Overview and Technology Behind the System project slides inside the horizontal shell.
 */
export default function ProjectDetailPage() {
  return (
    <ProjectDetailExperience totalSlides={TOTAL_SLIDES}>
      {[
        <PosOverview key="slide-01" data={POS_SLIDE_01} />,
        <PosTechnology key="slide-02" data={POS_SLIDE_02} />,
      ]}
    </ProjectDetailExperience>
  );
}
