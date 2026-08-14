export default function SplashHeadline() {
  return (
    <div className="relative w-full flex items-center justify-center min-h-[120px] sm:min-h-[180px] lg:min-h-[240px] overflow-hidden">
      {/* Phrase 1: TURNING IDEAS */}
      <div className="splash-headline-item absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none">
        <span
          className="splash-headline-text block font-normal text-white uppercase tracking-tight text-center select-none text-[32px] xs:text-[40px] sm:text-7xl md:text-8xl lg:text-9xl"
          style={{ lineHeight: "0.95" }}
        >
          Turning Ideas
        </span>
      </div>

      {/* Phrase 2: INTO DIGITAL */}
      <div className="splash-headline-item absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none">
        <span
          className="splash-headline-text block font-normal text-white uppercase tracking-tight text-center select-none text-[32px] xs:text-[40px] sm:text-7xl md:text-8xl lg:text-9xl"
          style={{ lineHeight: "0.95" }}
        >
          Into Digital
        </span>
      </div>

      {/* Phrase 3: EXPERIENCES */}
      <div className="splash-headline-item absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none">
        <span
          className="splash-headline-text block font-normal text-white uppercase tracking-tight text-center select-none text-[32px] xs:text-[40px] sm:text-7xl md:text-8xl lg:text-9xl"
          style={{ lineHeight: "0.95" }}
        >
          Experiences
        </span>
      </div>
    </div>
  );
}
