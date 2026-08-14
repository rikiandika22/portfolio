import TransitionLink from "@/components/animation/TransitionLink";

interface SeeMoreLinkProps {
  href: string;
  label?: string;
  customLabel?: string;
  customNumber?: string;
  className?: string;
}

export default function SeeMoreLink({
  href,
  label = "See More",
  customLabel,
  customNumber,
  className = "",
}: SeeMoreLinkProps) {
  return (
    <TransitionLink
      href={href}
      customLabel={customLabel}
      customNumber={customNumber}
      className={`group inline-flex items-center gap-2 text-lg sm:text-xl font-semibold leading-[1.5] text-base-dark border-b-2 border-base-dark pb-0.5 hover:text-accent-primary hover:border-accent-primary transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary rounded-sm ${className}`}
      aria-label={`${label} for project details`}
    >
      <span>{label}</span>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 transition-transform duration-300 ease-out group-hover:translate-x-1.5"
        aria-hidden="true"
      >
        <path
          d="M5 12H19M19 12L12 5M19 12L12 19"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </TransitionLink>
  );
}
