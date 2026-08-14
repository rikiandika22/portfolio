interface ContactHeadlineProps {
  className?: string;
}

export default function ContactHeadline({ className = "" }: ContactHeadlineProps) {
  return (
    <div className={`flex flex-col gap-0.5 sm:gap-1 uppercase text-left ${className}`}>
      {/* Line 1: LET’S */}
      <div className="overflow-hidden py-0.5">
        <h2 className="contact-headline-line text-3xl sm:text-5xl lg:text-8xl xl:text-[124px] font-extrabold leading-[0.95] tracking-tight text-white">
          LET’S
        </h2>
      </div>

      {/* Line 2: CREATE */}
      <div className="overflow-hidden py-0.5">
        <h2 className="contact-headline-line text-3xl sm:text-5xl lg:text-8xl xl:text-[124px] font-extrabold leading-[0.95] tracking-tight text-white">
          CREATE
        </h2>
      </div>

      {/* Line 3: SOMETHING */}
      <div className="overflow-hidden py-0.5">
        <h2 className="contact-headline-line text-3xl sm:text-5xl lg:text-8xl xl:text-[124px] font-extrabold leading-[0.95] tracking-tight text-white">
          SOMETHING
        </h2>
      </div>

      {/* Line 4: MEANINGFUL. */}
      <div className="overflow-hidden py-0.5">
        <h2 className="contact-headline-line text-3xl sm:text-5xl lg:text-8xl xl:text-[124px] font-extrabold leading-[0.95] tracking-tight text-white">
          MEANINGFUL.
        </h2>
      </div>
    </div>
  );
}
