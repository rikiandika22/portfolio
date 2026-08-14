export default function WorksIntro() {
  return (
    <div
      data-works-intro
      className="grid h-full w-full grid-rows-[auto_1fr_auto] overflow-hidden"
    >
      <p className="text-2xl font-semibold leading-[1.5] tracking-normal text-base-dark-active">
        01/
      </p>

      <div className="grid grid-cols-12 items-start gap-x-5 pt-2 sm:items-center sm:pb-16 sm:pt-3 lg:pb-20">
        <h2
          className="col-[1/span_12] flex flex-col font-semibold uppercase leading-none tracking-normal text-text-primary sm:col-[4/span_7] lg:col-[5/span_5]"
          style={{ fontSize: "clamp(60px, 8.9vw, 128px)" }}
        >
          <span>Things</span>
          <span>I Have</span>
          <span className="text-accent-primary">Built</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 items-end gap-4 pb-6 sm:grid-cols-12 sm:gap-x-5 sm:pb-8">
        <h2
          data-works-overview-label
          className="text-xl font-semibold uppercase leading-[1.25] tracking-normal text-text-primary sm:col-[1/span_3] sm:text-2xl"
        >
          Project Overview
        </h2>
        <p
          data-works-overview-copy
          className="max-w-[650px] text-base font-semibold leading-[1.5] tracking-normal text-text-secondary sm:col-[4/span_6] sm:text-xl"
        >
          A closer look at the ideas, challenges, and decisions behind
          <br className="hidden lg:block" /> the digital products I have designed
          and developed.
        </p>
      </div>

      <style>{`
        @media (min-width: 640px) {
          [data-works-overview-label] { padding-left: 80px; }
          [data-works-overview-copy] { padding-left: 64px; }
        }

        @media (min-width: 640px) and (max-width: 1399px) {
          [data-works-overview-label] { padding-left: 64px; }
        }
      `}</style>
    </div>
  );
}
