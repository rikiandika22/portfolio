import { POS_PROJECT_IDENTITY } from "@/data/posCashierAppSlides";

/** Shared identity header block for 32 BLOC project detail slides. */
export default function PosProjectIdentity() {
  return (
    <header className="flex flex-col gap-0.5">
      <span
        className="text-sm font-semibold leading-[1.25] sm:text-base"
        style={{ color: "var(--color-text-light-secondary)" }}
      >
        {POS_PROJECT_IDENTITY.number}
      </span>
      <span
        className="text-lg font-bold leading-[1.3] sm:text-xl"
        style={{ color: "var(--color-text-light-secondary)" }}
      >
        {POS_PROJECT_IDENTITY.name}
      </span>
      <span className="text-lg font-bold leading-[1.3] text-white sm:text-xl">
        {POS_PROJECT_IDENTITY.subtitle}
      </span>
    </header>
  );
}
