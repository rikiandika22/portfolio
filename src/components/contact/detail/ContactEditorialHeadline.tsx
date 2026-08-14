export default function ContactEditorialHeadline() {
  return (
    <h1
      className="flex flex-col w-full uppercase font-normal select-none tracking-tight text-text-primary"
      style={{
        lineHeight: "0.88",
        letterSpacing: "-0.03em",
      }}
    >
      {/* Line 1: START */}
      <div className="contact-headline-mask overflow-hidden">
        <span className="contact-headline-line block text-[42px] xs:text-[54px] sm:text-7xl md:text-8xl lg:text-[clamp(72px,7.2vw,114px)] text-text-primary">
          Start
        </span>
      </div>

      {/* Line 2: A CONVERSATION (Asymmetric Indentation) */}
      <div className="contact-headline-mask overflow-hidden pl-[4vw] sm:pl-[8vw] lg:pl-[10vw] pt-1 sm:pt-2">
        <span className="contact-headline-line block text-[42px] xs:text-[54px] sm:text-7xl md:text-8xl lg:text-[clamp(72px,7.2vw,114px)] text-text-primary">
          A Conversation
        </span>
      </div>

      {/* Line 3: BUILD (Highlighted in Main Accent Blue) */}
      <div className="contact-headline-mask overflow-hidden pt-1 sm:pt-2">
        <span
          className="contact-headline-line block text-[42px] xs:text-[54px] sm:text-7xl md:text-8xl lg:text-[clamp(72px,7.2vw,114px)]"
          style={{ color: "var(--color-accent-primary, #2196F3)" }}
        >
          Build
        </span>
      </div>

      {/* Line 4: SOMETHING (Deep Asymmetric Indentation) */}
      <div className="contact-headline-mask overflow-hidden pl-[8vw] sm:pl-[14vw] lg:pl-[16vw] pt-1 sm:pt-2">
        <span className="contact-headline-line block text-[42px] xs:text-[54px] sm:text-7xl md:text-8xl lg:text-[clamp(72px,7.2vw,114px)] text-text-primary">
          Something
        </span>
      </div>

      {/* Line 5: MEANINGFUL (Deep Asymmetric Indentation) */}
      <div className="contact-headline-mask overflow-hidden pl-[8vw] sm:pl-[14vw] lg:pl-[16vw] pt-1 sm:pt-2">
        <span className="contact-headline-line block text-[42px] xs:text-[54px] sm:text-7xl md:text-8xl lg:text-[clamp(72px,7.2vw,114px)] text-text-primary">
          Meaningful
        </span>
      </div>
    </h1>
  );
}
