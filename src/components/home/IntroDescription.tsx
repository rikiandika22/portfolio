export default function IntroDescription() {
  return (
    <div className="flex items-start gap-x-2.5 sm:gap-x-4 lg:grid lg:grid-cols-[32px_minmax(0,322px)] lg:gap-x-[20px] w-full">
      {/* Introduction Arrow */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 sm:w-6 sm:h-6 lg:w-[32px] lg:h-[32px] text-base-dark shrink-0 mt-0.5"
        aria-hidden="true"
      >
        <path
          d="M8 24L24 8M12 8H24V20"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>

      {/* Introduction text matching AGENTS.md Rule 7 */}
      <p className="text-xs sm:text-sm lg:text-xl font-bold leading-snug sm:leading-normal lg:leading-[1.5] tracking-normal text-base-dark uppercase">
        BASED IN SLEMAN, YOGYAKARTA.
        <br />
        I DESIGN AND BUILD WEB AND MOBILE EXPERIENCES WITH A FOCUS ON FRONTEND, FLUTTER, AND UI UX.
      </p>
    </div>
  );
}
