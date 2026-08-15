import Image from "next/image";
import type { Credential } from "@/data/credentials";
import { ArrowUpRightIcon } from "@/components/icons/ArrowIcons";

interface FeaturedCredentialItemProps {
  credential: Credential;
  index: number;
}

export default function FeaturedCredentialItem({
  credential,
  index,
}: FeaturedCredentialItemProps) {
  return (
    <article
      data-credential-id={credential.id}
      data-credential-item
      className="group w-full border-t border-[rgba(29,36,45,0.12)]"
      style={{
        paddingTop: "var(--credential-featured-gap)",
        paddingBottom: "var(--credential-featured-gap)",
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-stretch">
        {/* Left Side: Editorial Information Column (5 cols, full height flex layout) */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full">
          {/* Top Metadata Stack */}
          <div className="flex flex-col">
            {/* Row 1: Number & Year */}
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <span className="text-lg sm:text-xl font-semibold leading-none text-base-dark-active tracking-normal">
                {credential.number}
              </span>
              {credential.year && (
                <span className="text-base sm:text-lg font-semibold leading-none text-text-secondary">
                  {credential.year}
                </span>
              )}
            </div>

            {/* Row 2: Issuer */}
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] text-text-secondary mb-3">
              {credential.issuer}
            </p>

            {/* Row 3: Title */}
            <h3
              className="font-bold uppercase tracking-tight text-text-primary mb-4 sm:mb-5"
              style={{
                fontSize: "clamp(26px, 3.2vw, 42px)",
                lineHeight: "1.05",
                letterSpacing: "-0.025em",
              }}
            >
              {credential.title}
            </h3>

            {/* Row 4: Category Badge */}
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-accent-primary bg-accent-primary/10 px-3 py-1 rounded-sm">
                {credential.category}
              </span>
            </div>
          </div>

          {/* Bottom Action: View Credential (Desktop only — anchored to bottom edge of row) */}
          <div className="hidden lg:block pt-8 mt-auto">
            <a
              href={credential.document}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${credential.title} certificate PDF (opens in new tab)`}
              className="group/link inline-flex items-center gap-1.5 text-base sm:text-lg font-semibold text-text-primary transition-colors duration-300 hover:text-accent-primary py-1"
            >
              <span className="relative pb-0.5 text-text-primary group-hover/link:text-accent-primary transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:origin-left after:scale-x-0 after:bg-accent-primary after:transition-transform after:duration-300 after:ease-out group-hover/link:after:scale-x-100">
                View Credential
              </span>
              <ArrowUpRightIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-300 ease-out group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Right Side: Certificate Preview (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-start">
          <a
            href={credential.document}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open full certificate for ${credential.title}`}
            tabIndex={-1}
            className="block relative w-full overflow-hidden border border-[rgba(29,36,45,0.08)] bg-white/40 transition-all duration-500 ease-out group-hover:border-[rgba(29,36,45,0.18)] group-hover:shadow-sm"
          >
            <div className="relative w-full aspect-[1.414/1] overflow-hidden flex items-center justify-center">
              <Image
                src={credential.preview}
                alt={`${credential.title} certificate preview`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1440px) 55vw, 760px"
                className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                priority={index < 2}
              />
            </div>
          </a>

          {/* Action Link: View Credential (Mobile only — appears after preview with clear gap) */}
          <div className="block lg:hidden pt-5 sm:pt-6">
            <a
              href={credential.document}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${credential.title} certificate PDF (opens in new tab)`}
              className="group/link inline-flex items-center gap-1.5 text-base sm:text-lg font-semibold text-text-primary transition-colors duration-300 hover:text-accent-primary py-1"
            >
              <span className="relative pb-0.5 text-text-primary group-hover/link:text-accent-primary transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:origin-left after:scale-x-0 after:bg-accent-primary after:transition-transform after:duration-300 after:ease-out group-hover/link:after:scale-x-100">
                View Credential
              </span>
              <ArrowUpRightIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-300 ease-out group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
