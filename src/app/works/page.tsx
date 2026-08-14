import type { CSSProperties } from "react";
import type { Metadata } from "next";
import PersistentFooter from "@/components/layout/PersistentFooter";
import PersistentNavigation from "@/components/layout/PersistentNavigation";
import PersonalProjects from "@/components/works/PersonalProjects";
import WorksHashNavigation from "@/components/works/WorksHashNavigation";
import WorksIntro from "@/components/works/WorksIntro";
import { PROJECT_STACK_ID } from "@/lib/projectNavigation";

export const metadata: Metadata = {
  title: "Works | Riki Andika Portfolio",
  description:
    "A closer look at the digital products designed and developed by Riki Andika.",
};

const sectionPadding: CSSProperties = {
  paddingInline: "var(--page-padding-inline)",
  paddingTop: "calc(var(--page-padding-block) + 3.5rem)",
  paddingBottom: "calc(var(--page-padding-block) + 3.5rem)",
};

export default function WorksPage() {
  return (
    <div
      data-works-page
      className="relative min-h-screen w-full overflow-x-hidden bg-page-background text-text-primary"
    >
      <WorksHashNavigation />
      <PersistentNavigation />

      <main>
        <section
          id="works-overview"
          aria-label="Works introduction"
          className="box-border h-screen min-h-[640px] w-full overflow-hidden bg-page-background h-[100dvh]"
          style={sectionPadding}
        >
          <WorksIntro />
        </section>

        <section
          id={PROJECT_STACK_ID}
          aria-label="Personal projects"
          className="relative w-full bg-page-background"
        >
          <PersonalProjects />
        </section>
      </main>

      <PersistentFooter />
    </div>
  );
}
