import Image from "next/image";

/**
 * AboutDetailHero — Section 01/ Identity & Biography Block for the About detail page.
 * Row 1 (HeroMainRow): Metadata 01/ (Col 1), Profile Image (Col 2-6), Name Typography (Col 7-12).
 * Row 2 (HeroBiographyRow): HELLO MATE! (Col 2-6) aligned on the exact visual row as Biography Paragraph 1 (Col 7-12).
 * Matches: docs/references/figma/about/detail/detail.png
 */
export default function AboutDetailHero() {
  return (
    <section
      className="relative w-full pt-4 sm:pt-6 lg:pt-8"
      style={{ paddingBottom: "108px" }}
    >
      {/* =================================================== */}
      {/* ROW 1: Hero Main Row — Profile Image & Identity Name */}
      {/* =================================================== */}
      <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16 items-center">
        {/* Left Metadata Column — 01/ */}
        <div className="lg:col-span-1 self-start pt-1">
          <span
            className="text-xl font-bold leading-none tracking-normal sm:text-2xl"
            style={{ color: "var(--color-text-primary)" }}
          >
            01/
          </span>
        </div>

        {/* Profile Image Column (5 cols) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-start">
          <div className="relative w-full max-w-[420px] aspect-[3/4] overflow-hidden rounded-2xl border border-[rgba(29,36,45,0.08)] shadow-sm">
            <Image
              src="/images/profile/about-profile.webp"
              alt="Riki Andika Khusna Saputra portrait"
              fill
              sizes="(max-width: 639px) 90vw, (max-width: 1023px) 420px, 420px"
              priority
              className="object-cover object-top"
            />
          </div>
        </div>

        {/* Name Headline Column (6 cols) */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <h1
            className="font-bold uppercase tracking-tighter"
            style={{
              color: "var(--color-text-primary)",
              fontSize: "clamp(52px, 7.5vw, 120px)",
              lineHeight: "0.88",
              letterSpacing: "-0.03em",
            }}
          >
            <div>RIKI</div>
            <div>ANDIKA</div>
            <div>KHUSNA</div>
            <div>SAPUTRA</div>
          </h1>
        </div>
      </div>

      {/* =================================================== */}
      {/* VERTICAL BREATHING SPACE BELOW HERO MAIN ROW        */}
      {/* =================================================== */}
      <div className="h-16 sm:h-20 lg:h-28" aria-hidden="true" />

      {/* =================================================== */}
      {/* ROW 2: Hero Biography Row — HELLO MATE! & Paragraphs */}
      {/* =================================================== */}
      <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16 items-start">
        {/* Left Metadata Column Spacer (Col 1) */}
        <div className="hidden lg:block lg:col-span-1" />

        {/* Left Biography Column — HELLO MATE! (5 cols) */}
        <div className="lg:col-span-5 pt-1">
          <h2
            className="text-xl font-bold uppercase tracking-wider sm:text-2xl"
            style={{ color: "var(--color-text-primary)" }}
          >
            HELLO MATE!
          </h2>
        </div>

        {/* Right Biography Column — Paragraph 1 & Paragraph 2 (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-6 sm:gap-8 max-w-[680px]">
          <p
            className="text-base font-normal leading-[1.65] sm:text-lg lg:text-xl"
            style={{ color: "var(--color-text-secondary)" }}
          >
            I&apos;m Riki Andika. I enjoy working at the intersection of design
            and development, especially in frontend, mobile applications, and UI
            UX. I like exploring how an idea can grow into a digital product
            that feels clear, useful, and enjoyable to use.
          </p>

          <p
            className="text-base font-normal leading-[1.65] sm:text-lg lg:text-xl"
            style={{ color: "var(--color-text-secondary)" }}
          >
            For me, building a product is not only about writing code or creating
            an attractive interface. It is also about understanding the problem,
            organizing the user flow, and making sure every feature has a clear
            purpose. I am always interested in learning new approaches and
            turning each project into a better experience than the one before.
          </p>
        </div>
      </div>
    </section>
  );
}
