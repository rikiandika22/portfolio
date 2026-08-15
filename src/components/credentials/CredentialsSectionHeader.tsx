import type { CSSProperties } from "react";

interface CredentialsSectionHeaderProps {
  eyebrow: string;
  countLabel: string;
  title: string;
  className?: string;
  style?: CSSProperties;
}

export default function CredentialsSectionHeader({
  eyebrow,
  countLabel,
  title,
  className = "",
  style,
}: CredentialsSectionHeaderProps) {
  return (
    <header className={`w-full ${className}`} style={style}>
      {/* Top Divider & Quiet Introduction Metadata Bar */}
      <div className="w-full border-t border-[rgba(29,36,45,0.12)] pt-8 sm:pt-10 lg:pt-12">
        <div className="flex flex-row items-center justify-between gap-4">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-text-secondary">
            {eyebrow}
          </span>
          <span className="inline-flex items-center justify-center text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] text-text-secondary border border-[rgba(29,36,45,0.16)] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full leading-none whitespace-nowrap select-none">
            {countLabel}
          </span>
        </div>
      </div>

      {/* Controlled Gap & Dominant Section Heading */}
      <div
        className="w-full"
        style={{
          marginTop: "var(--credential-header-gap)",
          marginBottom: "var(--credential-section-gap)",
        }}
      >
        <h2
          className="font-bold uppercase tracking-tight text-text-primary"
          style={{
            fontSize: "clamp(28px, 4.2vw, 56px)",
            lineHeight: "1.0",
            letterSpacing: "-0.025em",
          }}
        >
          {title}
        </h2>
      </div>
    </header>
  );
}
