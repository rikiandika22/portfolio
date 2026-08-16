import HeroHeadline from "./HeroHeadline";
import IdentityName from "./IdentityName";
import Portrait from "./Portrait";
import IntroDescription from "./IntroDescription";
import Navigation from "./Navigation";
import PageFooter from "./PageFooter";

interface HomeFrameProps {
  embedded?: boolean;
}

export default function HomeFrame({ embedded = false }: HomeFrameProps) {
  if (embedded) {
    return (
      <div className="w-full h-full box-border overflow-hidden flex flex-col justify-between">
        {/* ========================================================= */}
        {/* DESKTOP COMPOSITION (lg: and above) — Preserved 100%       */}
        {/* ========================================================= */}
        <main className="hidden lg:grid lg:grid-cols-12 gap-x-5 gap-y-2 my-auto w-full items-start">
          {/* Left Column (Cols 1-4): Metadata introduction directly unified with large Name (24px-28px gap) */}
          <div className="col-start-1 col-span-4 row-start-1 row-span-2 flex flex-col justify-end gap-y-6 lg:gap-y-7 self-end home-animate-item">
            <SectionMetadata />
            <IdentityName />
          </div>

          {/* Right Top (Cols 4-12): Headline */}
          <div className="col-start-4 col-span-9 row-start-1 self-start home-animate-item">
            <HeroHeadline />
          </div>

          {/* Center (Cols 5-8): Portrait */}
          <div className="col-start-5 col-span-4 row-start-2 self-center flex items-center justify-center home-animate-item">
            <Portrait />
          </div>

          {/* Right Bottom (Cols 8-12): Supporting Intro Paragraph with 32px-36px breathing room */}
          <div className="col-start-8 col-span-5 row-start-2 self-start pt-8 lg:pt-9 home-animate-item flex justify-end">
            <IntroDescription />
          </div>
        </main>

        {/* ========================================================= */}
        {/* DEDICATED MOBILE COMPOSITION (< lg) — No Overlaps, Zero Overflow */}
        {/* ========================================================= */}
        <main className="lg:hidden flex flex-col justify-between w-full h-full my-auto gap-y-4 py-2">
          {/* Mobile Top Row: 01/ Metadata & Hero Headline */}
          <div className="flex flex-col gap-y-1.5 w-full home-animate-item">
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold leading-none text-base-dark-active">
                01/
              </span>
              <span className="text-[11px] sm:text-xs font-bold leading-none text-base-dark tracking-wide uppercase">
                BASED IN YOGYAKARTA • BUILDING WITH LOVE
              </span>
            </div>
            <HeroHeadline />
          </div>

          {/* Mobile Middle Row: Identity Name (Left) & Portrait (Right) side-by-side */}
          <div className="grid grid-cols-2 gap-x-2 items-center w-full home-animate-item my-auto">
            <div className="flex flex-col justify-center">
              <IdentityName />
            </div>
            <div className="flex justify-center items-center">
              <Portrait />
            </div>
          </div>

          {/* Mobile Bottom Row: Introduction Description */}
          <div className="w-full home-animate-item pt-1">
            <IntroDescription />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div
      className="w-full min-h-screen"
      style={{
        padding: "var(--page-frame-width)",
        backgroundColor: "var(--color-page-frame)",
      }}
    >
      {/* Inner page surface */}
      <div
        className="w-full min-h-[calc(100vh-2*var(--page-frame-width))] bg-page-background grid"
        style={{
          paddingInline: "var(--page-padding-inline)",
          paddingBlock: "var(--page-padding-block)",
          gridTemplateRows: "auto 1fr auto",
        }}
      >
        {/* Navigation */}
        <header className="home-animate-item">
          <Navigation />
        </header>

        {/* Main content area */}
        <main
          className="grid grid-cols-12 gap-x-5 my-2 items-start"
          style={{ gridTemplateRows: "auto 1fr" }}
        >
          <div className="col-start-1 col-span-4 row-start-1 row-span-2 flex flex-col justify-end gap-y-6 lg:gap-y-7 self-end home-animate-item">
            <SectionMetadata />
            <IdentityName />
          </div>

          <div className="col-start-4 col-span-9 row-start-1 self-start home-animate-item">
            <HeroHeadline />
          </div>

          <div className="col-start-5 col-span-4 row-start-2 self-center flex items-center justify-center home-animate-item">
            <Portrait />
          </div>

          <div className="col-start-8 col-span-5 row-start-2 self-start pt-8 lg:pt-9 home-animate-item flex justify-end">
            <IntroDescription />
          </div>
        </main>

        {/* Footer */}
        <footer className="home-animate-item">
          <PageFooter />
        </footer>
      </div>
    </div>
  );
}

/** Section metadata: 01/, BASED IN YOGYAKARTA, BUILDING WITH LOVE */
function SectionMetadata() {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-2xl font-semibold leading-[1.5] tracking-normal text-base-dark-active">
        01/
      </span>
      <div className="flex flex-col">
        <span className="text-xl font-extrabold leading-[1.4] tracking-normal text-base-dark uppercase">
          BASED IN YOGYAKARTA
        </span>
        <span className="text-xl font-extrabold leading-[1.4] tracking-normal text-base-dark uppercase">
          BUILDING WITH LOVE
        </span>
      </div>
    </div>
  );
}
