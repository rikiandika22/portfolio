import { forwardRef } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import type { ProjectIdentity } from "@/data/projects";

interface ProjectStackCardProps {
  project: ProjectIdentity;
  layer: number;
  onActivate: (project: ProjectIdentity) => void;
  onPreviewEnd: (project: ProjectIdentity, layer: number) => void;
  onPreviewStart: (project: ProjectIdentity) => void;
}

interface CardPalette {
  backgroundColor: string;
  borderColor: string;
  color: string;
  secondaryColor: string;
  overlayGradient: string;
  objectPosition: string;
}

const CARD_PALETTES: Record<string, CardPalette> = {
  "sumber-agung-trans": {
    backgroundColor: "var(--color-surface-dark-blue)",
    borderColor: "var(--color-surface-dark-blue)",
    color: "#FFFFFF",
    secondaryColor: "var(--color-text-light-secondary)",
    overlayGradient:
      "linear-gradient(to top, rgba(16, 74, 123, 0.94) 0%, rgba(16, 74, 123, 0.65) 45%, rgba(16, 74, 123, 0.25) 100%)",
    objectPosition: "center top",
  },
  "32-bloc": {
    backgroundColor: "var(--color-surface-dark-blue)",
    borderColor: "var(--color-surface-dark-blue)",
    color: "#FFFFFF",
    secondaryColor: "var(--color-surface-soft-blue)",
    overlayGradient:
      "linear-gradient(to top, rgba(16, 74, 123, 0.94) 0%, rgba(16, 74, 123, 0.5) 50%, rgba(16, 74, 123, 0.15) 100%)",
    objectPosition: "center center",
  },
  moneylog: {
    backgroundColor: "var(--color-surface-soft-blue)",
    borderColor: "var(--color-border-subtle)",
    color: "var(--color-text-primary)",
    secondaryColor: "var(--color-text-secondary)",
    overlayGradient:
      "linear-gradient(to top, rgba(233, 245, 254, 0.94) 0%, rgba(233, 245, 254, 0.65) 50%, rgba(233, 245, 254, 0.2) 100%)",
    objectPosition: "center center",
  },
};

const ProjectStackCard = forwardRef<HTMLButtonElement, ProjectStackCardProps>(
  function ProjectStackCard(
    {
      project,
      layer,
      onActivate,
      onPreviewEnd,
      onPreviewStart,
    },
    ref
  ) {
    const palette = CARD_PALETTES[project.id] ?? CARD_PALETTES.moneylog;
    const focusRingClass =
      project.id === "moneylog"
        ? "focus-visible:ring-text-primary"
        : "focus-visible:ring-surface-soft-blue";
    const accessibleLabel = project.route
      ? `Open ${project.title} project`
      : `Select ${project.title} project; detail route is not available yet`;

    return (
      <button
        ref={ref}
        type="button"
        data-project-stack-card
        data-project-id={project.id}
        aria-label={accessibleLabel}
        onClick={() => onActivate(project)}
        onFocus={() => onPreviewStart(project)}
        onBlur={() => onPreviewEnd(project, layer)}
        onPointerEnter={() => onPreviewStart(project)}
        onPointerLeave={() => onPreviewEnd(project, layer)}
        className={`group absolute inset-x-0 top-0 w-full overflow-hidden rounded-2xl border text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset ${focusRingClass}`}
        style={
          {
            "--stack-layer": layer,
            zIndex: (layer + 1) * 10,
            backgroundColor: palette.backgroundColor,
            borderColor: palette.borderColor,
            color: palette.color,
          } as CSSProperties
        }
      >
        {/* Top Spine (Exposed when cards stack) */}
        <span
          data-project-card-spine
          className="relative z-20 grid min-h-[54px] grid-cols-[48px_minmax(0,1fr)] items-center border-b px-4 sm:min-h-16 sm:grid-cols-[64px_minmax(0,0.8fr)_minmax(0,1.2fr)] sm:px-8 lg:px-10"
          style={{ borderColor: palette.borderColor }}
        >
          <span className="row-span-2 text-xl font-semibold leading-none sm:row-span-1 sm:text-2xl">
            {project.number}
          </span>
          <span className="truncate text-lg font-semibold leading-tight sm:text-2xl">
            {project.title}
          </span>
          <span
            className="col-start-2 truncate pb-1 text-xs font-semibold leading-tight opacity-85 sm:col-auto sm:pb-0 sm:text-lg"
            style={{ color: palette.secondaryColor }}
          >
            {project.subtitle}
          </span>
        </span>

        {/* Full Card Body with Thumbnail & Layered Text */}
        <div
          data-project-card-cover
          className="relative h-[calc(100%_-_54px)] w-full overflow-hidden sm:h-[calc(100%_-_64px)]"
        >
          {/* Thumbnail Background Image */}
          <div className="absolute inset-0 h-full w-full overflow-hidden">
            <Image
              src={project.thumbnail}
              alt={`${project.title} mockup preview`}
              fill
              sizes="(max-width: 1440px) 100vw, 1380px"
              priority={layer === 0}
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              style={{ objectPosition: palette.objectPosition }}
            />
          </div>

          {/* Restrained Gradient Overlay for Contrast */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: palette.overlayGradient }}
          />

          {/* Layered Content Overlay */}
          <div className="relative z-10 flex h-full w-full flex-col justify-between p-5 sm:p-8 lg:p-10">
            <div className="flex items-center">
              <span className="text-sm font-semibold tracking-wider opacity-90 sm:text-base">
                {project.number}
              </span>
            </div>

            <div className="grid grid-cols-12 items-end gap-x-4 gap-y-2 sm:gap-x-6">
              <h3 className="col-span-12 font-normal uppercase leading-[0.88] tracking-[-0.035em] text-[clamp(32px,5.2vw,72px)] sm:col-span-8">
                {project.title}
              </h3>
              <p
                className="col-span-12 text-sm font-semibold leading-[1.25] sm:col-span-4 sm:text-xl lg:text-2xl"
                style={{ color: palette.secondaryColor }}
              >
                {project.subtitle}
              </p>
            </div>
          </div>
        </div>
      </button>
    );
  }
);

export default ProjectStackCard;
