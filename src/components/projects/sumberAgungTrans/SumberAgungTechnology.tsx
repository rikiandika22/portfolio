"use client";

import { useState, useCallback } from "react";
import type { TechnologySlideData } from "@/data/sumberAgungTransSlides";
import { ALL_TECH_ICONS } from "@/data/sumberAgungTransSlides";
import KeyFeatureAccordionItem from "@/components/projectDetail/KeyFeatureAccordionItem";
import TechStackAccordion from "@/components/projectDetail/TechStackAccordion";
import ProjectIdentity from "./ProjectIdentity";

interface SumberAgungTechnologyProps {
  data: TechnologySlideData;
}

/**
 * Slide 03 — The Technology Behind the System.
 * Contains interactive Key Features accordion and Tech Stack transformation.
 */
export default function SumberAgungTechnology({ data }: SumberAgungTechnologyProps) {
  const [openFeatures, setOpenFeatures] = useState<Set<string>>(new Set());
  const [techStackExpanded, setTechStackExpanded] = useState(false);

  const handleFeatureToggle = useCallback((id: string) => {
    setOpenFeatures((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleTechStackToggle = useCallback(() => {
    setTechStackExpanded((prev) => !prev);
  }, []);

  return (
    <div className="sat-technology flex flex-col h-full min-h-0 overflow-y-auto overflow-x-hidden gap-y-4 px-4 pt-4 pb-14 sm:px-8 sm:pt-6 sm:pb-14 lg:grid lg:grid-rows-[auto_auto_minmax(0,1fr)] lg:gap-y-3 lg:px-11 lg:pt-8 lg:pb-14 box-border">
      <div className="shrink-0">
        <ProjectIdentity />
      </div>

      {/* Headline */}
      <h2
        className="mt-1 sm:mt-4 w-full max-w-[1180px] justify-self-center text-center font-normal uppercase text-2xl sm:text-4xl lg:text-[clamp(48px,6.67vw,96px)] shrink-0"
        style={{
          color: "var(--color-surface-soft-blue)",
          lineHeight: "0.95",
          letterSpacing: "-0.03em",
          whiteSpace: "pre-line",
        }}
      >
        {data.headline}
      </h2>

      <div className="grid grid-cols-1 content-start gap-x-12 gap-y-4 lg:gap-y-0 lg:grid-cols-12 xl:gap-x-16 w-full">
        <section className="lg:col-span-5">
          <SectionHeading>Project Details</SectionHeading>
          <div className="sat-project-copy flex max-w-[520px] flex-col gap-2 pt-2">
            {data.projectDetailsText.map((text, i) => (
              <p
                key={i}
                className="text-xs font-normal leading-[1.45] sm:text-sm"
                style={{ color: "var(--color-text-light-secondary)" }}
              >
                {text}
              </p>
            ))}
          </div>
        </section>

        <section className="lg:col-span-7 pt-2 lg:pt-0">
          <SectionHeading>Key Features</SectionHeading>
          <div className="sat-features flex flex-col pt-2">
            {data.keyFeatures.map((feature) => (
              <KeyFeatureAccordionItem
                key={feature.id}
                id={feature.id}
                number={feature.number}
                title={feature.title}
                description={feature.description}
                isOpen={openFeatures.has(feature.id)}
                onToggle={handleFeatureToggle}
              />
            ))}
          </div>
        </section>

        <section
          className={techStackExpanded ? "lg:col-span-12 pt-2" : "lg:col-span-7 pt-2"}
        >
          <TechStackAccordion
            groups={data.techStack}
            allIcons={ALL_TECH_ICONS}
            isExpanded={techStackExpanded}
            onToggle={handleTechStackToggle}
          />
        </section>
      </div>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="flex items-center gap-3 text-base font-bold leading-[1.3] text-white sm:text-xl">
      <span
        aria-hidden="true"
        className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full border"
        style={{ borderColor: "var(--color-text-light-secondary)" }}
      >
        <svg width="13" height="13" viewBox="0 0 15 15" fill="none">
          <path
            d="M3 7.5H12M12 7.5L8.5 4M12 7.5L8.5 11"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {children}
    </h3>
  );
}
