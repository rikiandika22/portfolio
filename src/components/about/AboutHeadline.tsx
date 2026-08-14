interface AboutHeadlineProps {
  className?: string;
}

export default function AboutHeadline({ className = "" }: AboutHeadlineProps) {
  return (
    <div className={`flex flex-col gap-0.5 sm:gap-1.5 uppercase text-left ${className}`}>
      {/* Line 1: DESIGN, CODE, */}
      <div className="overflow-hidden py-0.5 sm:py-1">
        <h2 className="about-headline-line text-3xl sm:text-5xl lg:text-8xl xl:text-[108px] font-extrabold leading-[1.05] tracking-tight text-text-primary">
          <span>DESIGN, </span>
          <span className="text-accent-primary about-blue-word">CODE,</span>
        </h2>
      </div>

      {/* Line 2: AND BUILD */}
      <div className="overflow-hidden py-0.5 sm:py-1">
        <h2 className="about-headline-line text-3xl sm:text-5xl lg:text-8xl xl:text-[108px] font-extrabold leading-[1.05] tracking-tight text-text-primary">
          AND BUILD
        </h2>
      </div>

      {/* Line 3: BETTER */}
      <div className="overflow-hidden py-0.5 sm:py-1">
        <h2 className="about-headline-line text-3xl sm:text-5xl lg:text-8xl xl:text-[108px] font-extrabold leading-[1.05] tracking-tight text-accent-primary about-blue-word">
          BETTER
        </h2>
      </div>

      {/* Line 4: EXPERIENCE */}
      <div className="overflow-hidden py-0.5 sm:py-1">
        <h2 className="about-headline-line text-3xl sm:text-5xl lg:text-8xl xl:text-[108px] font-extrabold leading-[1.05] tracking-tight text-text-primary">
          EXPERIENCE
        </h2>
      </div>
    </div>
  );
}
