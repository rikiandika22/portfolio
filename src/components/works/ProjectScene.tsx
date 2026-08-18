"use client";

import Image from "next/image";
import type { ProjectIdentity } from "@/data/projects";
import TransitionLink from "@/components/animation/TransitionLink";
import { ArrowUpRightIcon } from "@/components/icons/ArrowIcons";

interface ProjectSceneProps {
  project: ProjectIdentity;
  index: number;
  priority?: boolean;
}

export default function ProjectScene({
  project,
  index,
  priority = false,
}: ProjectSceneProps) {
  // Variations for editorial balance:
  // Project 01 (index 0): Info Left, Thumbnail Right
  // Project 02 (index 1): Thumbnail Left, Info Right
  // Project 03 (index 2): Info Left, Thumbnail Right
  const isReversed = index === 1;

  return (
    <article
      data-project-scene={project.id}
      className="relative flex h-full min-h-[100svh] w-full flex-col justify-center bg-page-background pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-24 lg:pb-20 select-none box-border"
    >
      {/*
       * Shared editorial container — identical outer boundary for all three projects.
       * width: min(100% - clamp(120px, 12vw, 280px), 1600px)
       *   at 1440px: 12vw = 172.8px → container = 1440 - 172.8 = 1267px (≤1600 so no cap)
       *   at 1600px: 12vw = 192px   → container = 1408px
       *   at 1920px: 12vw = 230.4px → container = 1689px → capped at 1600px
       * mx-auto distributes remaining space equally left/right.
       * px-6/sm:px-8 adds inner breathing room on mobile/small viewports.
       */}
      <div
        data-project-content
        className="flex-1 flex flex-col justify-center px-6 sm:px-8 lg:px-0"
        style={{
          width: "min(calc(100% - clamp(80px, 8vw, 240px)), 1600px)",
          marginInline: "auto",
          willChange: "transform",
        }}
      >
        <div className="grid w-full grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
          {/* Text & Metadata Column */}
          <div
            className={`flex flex-col justify-center gap-y-3 sm:gap-y-5 ${
              isReversed
                ? "lg:col-span-6 lg:col-start-7 lg:order-2"
                : "lg:col-span-6 lg:order-1"
            }`}
          >
            {/* Large Editorial Project Number */}
            <div className="project-scene-number overflow-hidden">
              <span
                className="block font-normal leading-none tracking-tighter text-text-primary select-none opacity-90"
                style={{
                  fontSize: "clamp(56px, 8.5vw, 128px)",
                }}
              >
                {project.displayNumber}
              </span>
            </div>

            {/* Project Title, Subtitle, Description */}
            <div className="project-scene-content flex flex-col gap-y-2 sm:gap-y-3">
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-accent-primary">
                {project.subtitle}
              </span>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold uppercase leading-[1.05] tracking-tight text-text-primary">
                {project.title}
              </h3>

              <p className="max-w-xl text-sm sm:text-base lg:text-lg font-normal leading-relaxed text-text-secondary pt-1">
                {project.description}
              </p>

              {/* View Project CTA with SVG Arrow */}
              <div className="pt-2 sm:pt-4">
                <TransitionLink
                  href={project.route}
                  customLabel={project.title}
                  customNumber={project.number}
                  className="group inline-flex items-center gap-2.5 text-base sm:text-lg font-semibold uppercase tracking-normal text-text-primary border-b-2 border-text-primary pb-1 transition-all duration-300 hover:text-accent-primary hover:border-accent-primary cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary rounded-xs"
                  aria-label={`View ${project.title} project details`}
                >
                  <span>View Project</span>
                  <ArrowUpRightIcon className="w-5 h-5 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1" />
                </TransitionLink>
              </div>
            </div>
          </div>

          {/* Visual Thumbnail Column */}
          <div
            className={`project-scene-thumbnail flex items-center justify-center ${
              isReversed
                ? "lg:col-span-6 lg:col-start-1 lg:order-1"
                : "lg:col-span-6 lg:order-2"
            }`}
          >
            <TransitionLink
              href={project.route}
              customLabel={project.title}
              customNumber={project.number}
              className="group relative block w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary rounded-xl"
              aria-label={`Open ${project.title} thumbnail preview`}
            >
              {/*
               * Shared thumbnail frame — fixed height so all three projects occupy
               * the same visual bounding area regardless of source aspect ratio.
               *   16:9 (Sumber Agung Trans, 32 BLOC): fills width naturally.
               *   1:1  (MoneyLog):                    contained with side whitespace.
               * clamp(300px, 38vh, 520px) scales with viewport height.
               */}
              <div
                className="relative w-full overflow-hidden rounded-xl bg-surface-soft-blue/20 transition-transform duration-500 group-hover:scale-[1.01]"
                style={{ height: "clamp(300px, 38vh, 520px)" }}
              >
                <Image
                  src={project.thumbnail}
                  alt={`${project.title} project visual preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 680px"
                  priority={priority}
                  className="object-contain object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
            </TransitionLink>
          </div>
        </div>
      </div>
    </article>
  );
}
