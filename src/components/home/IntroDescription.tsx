export default function IntroDescription() {
  return (
    <div className="flex items-start gap-x-3 sm:gap-x-3.5 lg:gap-x-4 max-w-[370px] w-full">
      {/* Introduction Arrow */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 sm:w-6 sm:h-6 lg:w-[28px] lg:h-[28px] text-base-dark shrink-0 mt-0.5"
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
