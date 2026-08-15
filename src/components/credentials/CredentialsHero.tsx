export default function CredentialsHero() {
  return (
    <header className="relative w-full min-h-[calc(100dvh-13rem)] flex flex-col justify-center pt-8 sm:pt-0 pb-16 sm:pb-24 lg:pb-32">
      {/* Top Section Marker — Positioned at top left */}
      <div className="sm:absolute sm:top-0 sm:left-0 mb-8 sm:mb-0 credentials-hero-item">
        <span className="text-xl sm:text-2xl font-semibold leading-none text-base-dark-active tracking-normal">
          05/
        </span>
      </div>

      {/* Main Editorial Headline Grid — Centered along the vertical axis */}
      <div className="w-full my-auto grid grid-cols-12 gap-y-8 lg:gap-x-12 items-end pt-4 sm:pt-12">
        {/* Dominant Headline (8 cols on desktop) */}
        <div className="col-span-12 lg:col-span-8">
          <h1
            className="font-bold uppercase tracking-tighter"
            style={{
              fontSize: "clamp(54px, 9vw, 136px)",
              lineHeight: "0.88",
              letterSpacing: "-0.035em",
            }}
          >
            <div className="overflow-hidden py-1">
              <span className="block text-text-primary credentials-headline-line">
                SKILLS,
              </span>
            </div>
            <div className="overflow-hidden py-1">
              <span className="block text-accent-primary credentials-headline-line">
                VALIDATED.
              </span>
            </div>
          </h1>
        </div>

        {/* Supporting Editorial Copy (4 cols on desktop, aligned to baseline) */}
        <div className="col-span-12 lg:col-span-4 lg:pb-3 credentials-hero-item">
          <p className="text-base sm:text-lg lg:text-xl font-medium leading-relaxed text-text-secondary max-w-[480px]">
            A collection of credentials documenting the skills, experiences, and
            achievements I have developed along the way.
          </p>
        </div>
      </div>
    </header>
  );
}
