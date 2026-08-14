"use client";

import ContactCTAButton from "./ContactCTAButton";

interface ContactLinksProps {
  className?: string;
}

export default function ContactLinks({ className = "" }: ContactLinksProps) {
  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      {/* Phone Link */}
      <ContactCTAButton
        href="tel:+62895412506326"
        ariaLabel="Call phone number +62 895-4125-06326"
      >
        +62 895-4125-06326
      </ContactCTAButton>

      {/* Email Link */}
      <ContactCTAButton
        href="mailto:rkhusnasaputra@gmail.com"
        ariaLabel="Send email to rkhusnasaputra@gmail.com"
      >
        rkhusnasaputra@gmail.com
      </ContactCTAButton>
    </div>
  );
}
