"use client";

import ContactCTAButton from "@/components/contact/ContactCTAButton";

/**
 * AboutDetailContactCTA — Full-width 100% edge-to-edge, viewport-dominant dark blue Contact section.
 * - Perfectly centered 2-line headline.
 * - Generous vertical breathing room between CTA headline and Back-to-Top button.
 * - Integrated "Back to Top" button with upward arrow and liquid ripple hover effect.
 */
export default function AboutDetailContactCTA() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const upwardArrowIcon = (
    <svg
      className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 ease-out group-hover:-translate-y-1.5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M 12 21 V 3 M 4 11 L 12 3 L 20 11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <section
      className="w-full text-white min-h-screen lg:min-h-[100dvh] flex flex-col items-center justify-center relative box-border"
      style={{ backgroundColor: "var(--color-surface-dark-blue, #104A7B)" }}
    >
      <div
        className="mx-auto w-full max-w-[1380px] flex flex-col items-center justify-center py-20 lg:py-24 box-border text-center"
        style={{ paddingInline: "var(--page-padding-inline)" }}
      >
        {/* Center Display Headline: GOT AN IDEA? LET'S BRING IT TO LIFE (Balanced 2 lines) */}
        <div
          className="max-w-[1280px] w-full"
          style={{ marginBottom: "clamp(56px, 10vh, 140px)" }}
        >
          <h2
            className="font-bold uppercase tracking-tighter text-center"
            style={{
              fontSize: "clamp(44px, 7.6vw, 126px)",
              lineHeight: "0.92",
              letterSpacing: "-0.03em",
            }}
          >
            <span
              className="block"
              style={{ color: "var(--color-surface-soft-blue, #4DABF5)" }}
            >
              GOT AN IDEA?
            </span>
            <span className="block text-white">LET&apos;S BRING IT TO LIFE</span>
          </h2>
        </div>

        {/* Back to Top Button with Upward Arrow & generous top separation */}
        <div className="pt-2 sm:pt-4">
          <ContactCTAButton
            as="button"
            onClick={scrollToTop}
            ariaLabel="Back to top"
            className="group"
          >
            <div className="flex items-center gap-4 sm:gap-6">
              {upwardArrowIcon}
              <span>Back to Top</span>
            </div>
          </ContactCTAButton>
        </div>
      </div>
    </section>
  );
}
