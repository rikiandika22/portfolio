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
  objectPosition: string;
}

const CARD_PALETTES: Record<string, CardPalette> = {
  "sumber-agung-trans": {
    backgroundColor: "var(--color-surface-dark-blue)",
    borderColor: "var(--color-surface-dark-blue)",
    color: "#FFFFFF",
    secondaryColor: "var(--color-text-light-secondary)",
    objectPosition: "center center",
  },
  "32-bloc": {
    backgroundColor: "var(--color-surface-dark-blue)",
    borderColor: "var(--color-surface-dark-blue)",
    color: "#FFFFFF",
    secondaryColor: "var(--color-surface-soft-blue)",
    objectPosition: "center center",
  },
  moneylog: {
    backgroundColor: "var(--color-surface-soft-blue)",
    borderColor: "var(--color-border-subtle)",
    color: "var(--color-text-primary)",
    secondaryColor: "var(--color-text-secondary)",
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
          className="relative z-20 grid h-[44px] sm:h-[52px] lg:h-[60px] min-h-[44px] sm:min-h-[52px] lg:min-h-[60px] grid-cols-[48px_minmax(0,1fr)] items-center border-b px-4 sm:grid-cols-[64px_minmax(0,0.8fr)_minmax(0,1.2fr)] sm:px-8 lg:px-10"
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

        {/* Full Card Body with Clean Mockup Thumbnail */}
        <div
          data-project-card-cover
          className="relative h-[calc(100%_-_44px)] sm:h-[calc(100%_-_52px)] lg:h-[calc(100%_-_60px)] w-full overflow-hidden"
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
        </div>
      </button>
    );
  }
);

export default ProjectStackCard;
