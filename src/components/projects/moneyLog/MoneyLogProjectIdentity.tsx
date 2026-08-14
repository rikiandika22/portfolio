import { MONEYLOG_PROJECT_IDENTITY } from "@/data/moneyLogSlides";

/** Shared identity header block for MoneyLog project detail slides. */
export default function MoneyLogProjectIdentity() {
  return (
    <header className="flex flex-col gap-0.5">
      <span
        className="text-sm font-semibold leading-[1.25] sm:text-base"
        style={{ color: "var(--color-text-light-secondary)" }}
      >
        {MONEYLOG_PROJECT_IDENTITY.number}
      </span>
      <span
        className="text-lg font-bold leading-[1.3] sm:text-xl"
        style={{ color: "var(--color-text-light-secondary)" }}
      >
        {MONEYLOG_PROJECT_IDENTITY.name}
      </span>
      <span className="text-lg font-bold leading-[1.3] text-white sm:text-xl">
        {MONEYLOG_PROJECT_IDENTITY.subtitle}
      </span>
    </header>
  );
}
