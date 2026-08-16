"use client";

import { animateToPanel } from "@/lib/navigationScroll";
import ContactCTAButton from "./ContactCTAButton";

interface BackControlProps {
  className?: string;
}

export default function BackControl({ className = "" }: BackControlProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
    const isDesktop =
      window.innerWidth >= 1024 && !window.matchMedia("(pointer: coarse)").matches;
    const scroller = document.querySelector<HTMLElement>("[data-horizontal-scroller]");

    if (isDesktop && scroller) {
      // Desktop: Scroll back to the very beginning — the Homepage panel
      animateToPanel(scroller, 0);
    } else {
      // Mobile: Scroll to top of vertical document
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const arrowIcon = (
    <svg
      className="w-[110px] sm:w-[170px] h-4 transition-transform duration-300 ease-out group-hover:-translate-x-1.5"
      viewBox="0 0 170 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M 9 1 L 1 8 L 9 15 M 2 8 H 169"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <ContactCTAButton
      as="button"
      onClick={handleClick}
      ariaLabel="Back to About section"
      className={className}
    >
      <div className="flex items-center gap-6 sm:gap-8">
        {arrowIcon}
        <span>Back</span>
      </div>
    </ContactCTAButton>
  );
}
