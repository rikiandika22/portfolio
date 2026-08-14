import { PROJECT_IDENTITY } from "@/data/sumberAgungTransSlides";

/** Shared identity block used by every Sumber Agung Trans detail slide. */
export default function ProjectIdentity() {
  return (
    <header className="flex flex-col gap-0.5">
      <span
        className="text-sm font-semibold leading-[1.25] sm:text-base"
        style={{ color: "var(--color-text-light-secondary)" }}
      >
        {PROJECT_IDENTITY.number}
      </span>
      <span
        className="text-lg font-bold leading-[1.3] sm:text-xl"
        style={{ color: "var(--color-text-light-secondary)" }}
      >
        {PROJECT_IDENTITY.name}
      </span>
      <span className="text-lg font-bold leading-[1.3] text-white sm:text-xl">
        {PROJECT_IDENTITY.subtitle}
      </span>
    </header>
  );
}
