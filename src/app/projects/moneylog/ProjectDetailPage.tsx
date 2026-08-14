"use client";

import ProjectDetailExperience from "@/components/projectDetail/ProjectDetailExperience";
import MoneyLogOverview from "@/components/projects/moneyLog/MoneyLogOverview";
import MoneyLogTechnology from "@/components/projects/moneyLog/MoneyLogTechnology";
import { MONEYLOG_SLIDE_01, MONEYLOG_SLIDE_02 } from "@/data/moneyLogSlides";

const TOTAL_SLIDES = 2;

/**
 * Client component for the MoneyLog project detail experience.
 * Renders the Overview and Technology Behind the System project slides inside the horizontal shell.
 */
export default function ProjectDetailPage() {
  return (
    <ProjectDetailExperience totalSlides={TOTAL_SLIDES}>
      {[
        <MoneyLogOverview key="slide-01" data={MONEYLOG_SLIDE_01} />,
        <MoneyLogTechnology key="slide-02" data={MONEYLOG_SLIDE_02} />,
      ]}
    </ProjectDetailExperience>
  );
}
