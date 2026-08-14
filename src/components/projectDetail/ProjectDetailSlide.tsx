import { ReactNode } from "react";

interface ProjectDetailSlideProps {
  index: number;
  children: ReactNode;
  className?: string;
}

/** One full-width panel inside the fixed blue project-detail card. */
export default function ProjectDetailSlide({
  index,
  children,
  className = "",
}: ProjectDetailSlideProps) {
  return (
    <article
      data-slide-index={index}
      aria-label={`Project detail slide ${index + 1}`}
      className={`relative h-full w-full flex-[0_0_100%] overflow-hidden ${className}`}
    >
      {children}
      <span
        className="pointer-events-none absolute bottom-2.5 right-4 z-20 min-w-8 text-right text-xs font-semibold tabular-nums sm:text-base sm:right-8 lg:right-11 lg:bottom-6"
        style={{ color: "var(--color-text-light-secondary)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
    </article>
  );
}
