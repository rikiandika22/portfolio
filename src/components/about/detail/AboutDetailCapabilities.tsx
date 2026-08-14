interface CapabilityItem {
  number: string;
  title: string;
  description: string;
}

const CAPABILITIES: CapabilityItem[] = [
  {
    number: "01",
    title: "UI UX DESIGN",
    description:
      "I design intuitive interfaces by organizing user flows, creating wireframes, developing interactive prototypes, and maintaining a consistent visual system. Every design decision is made to help users understand and navigate the product more easily.",
  },
  {
    number: "02",
    title: "FRONT END DEVELOPMENT",
    description:
      "I build responsive and interactive websites with attention to structure, accessibility, animation, and visual detail. I focus on translating designs into interfaces that remain consistent across desktop, tablet, and mobile devices.",
  },
  {
    number: "03",
    title: "MOBILE DEVELOPMENT",
    description:
      "I develop mobile applications using Flutter, from interface implementation and navigation to API integration and local data management. My focus is creating applications that feel smooth, practical, and comfortable to use.",
  },
  {
    number: "04",
    title: "GRAPHIC DESIGN",
    description:
      "I create visual elements that support a clear and consistent identity, including social media content, promotional materials, interface assets, and presentation designs. I aim to keep every visual purposeful rather than purely decorative.",
  },
];

/**
 * AboutDetailCapabilities — Section 02/ Capabilities list for the About detail page.
 * Uses 12-column grid aligned with the Hero Biography description column (Col 7-12).
 * Spacing before capabilities: 108px from Hero + generous internal card spacing.
 * Matches: docs/references/figma/about/detail/detail.png
 */
export default function AboutDetailCapabilities() {
  return (
    <section
      className="relative w-full"
      style={{
        paddingTop: "40px",
        paddingBottom: "120px",
      }}
    >
      <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
        {/* Left Metadata Column — 02/ */}
        <div className="lg:col-span-1 pt-1">
          <span
            className="text-xl font-bold leading-none tracking-normal sm:text-2xl"
            style={{ color: "var(--color-text-primary)" }}
          >
            02/
          </span>
        </div>

        {/* Left Spacer (Col 2-6 / 5 cols) under HELLO MATE! */}
        <div className="hidden lg:block lg:col-span-5" />

        {/* Right Content Area (Col 7-12 / 6 cols) — Aligned directly with the biography description */}
        <div className="lg:col-span-6 flex flex-col w-full">
          {/* Display Title CAPABILITIES */}
          <h2
            className="text-left font-bold uppercase tracking-tight w-full"
            style={{
              color: "var(--color-text-primary)",
              fontSize: "clamp(36px, 5.2vw, 84px)",
              lineHeight: "0.95",
              letterSpacing: "-0.02em",
              marginBottom: "48px",
            }}
          >
            CAPABILITIES
          </h2>

          {/* Capabilities List — Aligned within the Col 7-12 description column */}
          <div className="w-full flex flex-col divide-y divide-[rgba(29,36,45,0.18)] border-t border-b border-[rgba(29,36,45,0.18)]">
            {CAPABILITIES.map((cap) => (
              <article
                key={cap.number}
                className="w-full"
                style={{
                  paddingTop: "36px",
                  paddingBottom: "36px",
                }}
              >
                {/* Circle Badge + Title */}
                <div
                  className="flex items-center gap-4"
                  style={{ marginBottom: "20px" }}
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[var(--color-text-primary)] text-sm font-bold sm:h-10 sm:w-10 sm:text-base"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {cap.number}
                  </span>
                  <h3
                    className="text-lg font-bold uppercase tracking-wider sm:text-xl lg:text-2xl"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {cap.title}
                  </h3>
                </div>

                {/* Description */}
                <p
                  className="pl-13 text-base font-normal sm:pl-14 sm:text-lg lg:text-xl"
                  style={{
                    color: "var(--color-text-secondary)",
                    lineHeight: "1.75",
                  }}
                >
                  {cap.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
