"use client";

import { useState } from "react";
import Image from "next/image";
import { CREDENTIALS, Credential } from "@/data/credentials";
import CredentialsSectionHeader from "./CredentialsSectionHeader";
import { ArrowUpRightIcon } from "@/components/icons/ArrowIcons";

export default function MoreCredentialsSection() {
  const supportingCredentials = CREDENTIALS.filter((item) => !item.featured);
  const [activeCredential, setActiveCredential] = useState<Credential>(
    supportingCredentials[0]
  );

  return (
    <section
      data-more-credentials
      aria-label="More Supporting Credentials"
      className="w-full"
      style={{
        marginTop: "var(--credential-major-gap)",
        paddingBottom: "var(--credential-bottom-space)",
      }}
    >
      <CredentialsSectionHeader
        eyebrow="Additional Certifications & Roles"
        countLabel="04 Supporting Records"
        title="MORE CREDENTIALS"
      />

      {/* ========================================================================= */}
      {/* DESKTOP LAYOUT (>= lg): Interactive Editorial Row List with Side Preview */}
      {/* ========================================================================= */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-12 xl:gap-16 items-start">
        {/* Left Column (7 cols): Compact Editorial List */}
        <div className="lg:col-span-7 flex flex-col border-b border-[rgba(29,36,45,0.12)]">
          {supportingCredentials.map((item) => {
            const isSelected = activeCredential.id === item.id;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveCredential(item)}
                onFocus={() => setActiveCredential(item)}
                className={`group relative flex items-center justify-between py-5 xl:py-6 px-4 border-t border-[rgba(29,36,45,0.12)] transition-colors duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-black/[0.025]"
                    : "hover:bg-black/[0.015]"
                }`}
              >
                {/* Number */}
                <div className="w-12 shrink-0">
                  <span
                    className={`text-base font-semibold leading-none transition-colors duration-300 ${
                      isSelected
                        ? "text-accent-primary font-bold"
                        : "text-base-dark-active group-hover:text-text-primary"
                    }`}
                  >
                    {item.number}
                  </span>
                </div>

                {/* Title & Issuer */}
                <div className="flex-1 pr-6">
                  <h3
                    className={`text-lg xl:text-xl font-bold uppercase tracking-tight transition-colors duration-300 ${
                      isSelected
                        ? "text-accent-primary"
                        : "text-text-primary group-hover:text-accent-primary"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary mt-1">
                    {item.issuer}
                  </p>
                </div>

                {/* Category Badge */}
                <div className="w-32 shrink-0 text-left">
                  <span className="inline-block text-xs font-semibold uppercase tracking-wider text-text-secondary">
                    {item.category}
                  </span>
                </div>

                {/* Year */}
                <div className="w-16 shrink-0 text-right pr-4">
                  <span className="text-sm font-semibold text-text-secondary">
                    {item.year || "—"}
                  </span>
                </div>

                {/* Action Link: View */}
                <div className="shrink-0">
                  <a
                    href={item.document}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Open ${item.title} PDF certificate in new tab`}
                    className="group/btn inline-flex items-center gap-1.5 text-sm font-bold text-text-primary hover:text-accent-primary transition-colors duration-300 py-1 px-2.5 rounded border border-transparent hover:border-[rgba(29,36,45,0.12)]"
                  >
                    <span className="relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-left after:scale-x-0 after:bg-accent-primary after:transition-transform after:duration-300 after:ease-out group-hover/btn:after:scale-x-100">
                      View
                    </span>
                    <ArrowUpRightIcon className="w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column (5 cols): Live Interactive Certificate Preview */}
        <div className="lg:col-span-5 sticky top-32 lg:top-36">
          <div className="w-full flex flex-col gap-4">
            <a
              href={activeCredential.document}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${activeCredential.title} certificate PDF`}
              className="group/preview block relative w-full overflow-hidden border border-[rgba(29,36,45,0.08)] bg-white/40 shadow-sm transition-all duration-500 hover:border-[rgba(29,36,45,0.18)] hover:shadow-md"
            >
              <div className="relative w-full aspect-[1.414/1] overflow-hidden flex items-center justify-center bg-white/40">
                <Image
                  key={activeCredential.id}
                  src={activeCredential.preview}
                  alt={`${activeCredential.title} certificate preview`}
                  fill
                  sizes="(max-width: 1440px) 40vw, 540px"
                  className="object-contain transition-all duration-500 ease-out group-hover/preview:scale-[1.02]"
                  priority
                />
              </div>
            </a>

            {/* Active Preview Metadata Caption */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-text-primary">
                  {activeCredential.title}
                </p>
                <p className="text-xs text-text-secondary mt-0.5">
                  {activeCredential.issuer}
                </p>
              </div>
              <a
                href={activeCredential.document}
                target="_blank"
                rel="noopener noreferrer"
                className="group/pdflink text-xs font-bold uppercase tracking-wider text-accent-primary inline-flex items-center gap-1 shrink-0 ml-4"
              >
                <span className="relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-left after:scale-x-0 after:bg-accent-primary after:transition-transform after:duration-300 after:ease-out group-hover/pdflink:after:scale-x-100">
                  View Full PDF
                </span>
                <ArrowUpRightIcon className="w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover/pdflink:translate-x-0.5 group-hover/pdflink:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE LAYOUT (< lg): Compact Vertically Stacked Editorial Cards          */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 divide-y divide-[rgba(29,36,45,0.12)] border-b border-[rgba(29,36,45,0.12)] lg:hidden">
        {supportingCredentials.map((item) => (
          <article
            key={item.id}
            data-credential-id={item.id}
            className="w-full flex flex-col gap-4 py-8 sm:py-10 first:pt-2"
          >
            {/* Row 1: Number & Year */}
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold leading-none text-base-dark-active">
                {item.number}
              </span>
              {item.year && (
                <span className="text-sm font-semibold leading-none text-text-secondary">
                  {item.year}
                </span>
              )}
            </div>

            {/* Row 2: Title */}
            <h3 className="text-xl font-bold uppercase tracking-tight text-text-primary">
              {item.title}
            </h3>

            {/* Row 3: Issuer & Category */}
            <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary">
              <span>{item.issuer}</span>
              <span>·</span>
              <span className="text-accent-primary">{item.category}</span>
            </div>

            {/* Row 4: Certificate Preview */}
            <a
              href={item.document}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${item.title} certificate PDF`}
              tabIndex={-1}
              className="block relative w-full overflow-hidden border border-[rgba(29,36,45,0.08)] bg-white/40 my-2"
            >
              <div className="relative w-full aspect-[1.414/1] overflow-hidden flex items-center justify-center">
                <Image
                  src={item.preview}
                  alt={`${item.title} certificate preview`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
            </a>

            {/* Row 5: View Action */}
            <div className="pt-2">
              <a
                href={item.document}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${item.title} certificate PDF (opens in new tab)`}
                className="group/link inline-flex items-center gap-1.5 text-base font-semibold text-text-primary hover:text-accent-primary transition-colors duration-300 py-1"
              >
                <span className="relative pb-0.5 text-text-primary group-hover/link:text-accent-primary transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:origin-left after:scale-x-0 after:bg-accent-primary after:transition-transform after:duration-300 after:ease-out group-hover/link:after:scale-x-100">
                  View Credential
                </span>
                <ArrowUpRightIcon className="w-4 h-4 transition-transform duration-300 ease-out group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
