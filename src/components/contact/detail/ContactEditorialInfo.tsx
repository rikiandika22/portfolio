import { socialLinks } from "@/data/socialLinks";
import { ArrowUpRightIcon } from "@/components/icons/ArrowIcons";

export default function ContactEditorialInfo() {
  return (
    <div className="contact-editorial-info flex flex-col justify-between h-full gap-8 lg:gap-10 w-full max-w-[480px]">
      {/* 1. Status Badge Indicator */}
      <div className="contact-animate-item flex items-center gap-2.5">
        <span
          className="h-2 w-2 rounded-full shrink-0"
          style={{ backgroundColor: "var(--color-accent-primary, #2196F3)" }}
          aria-hidden="true"
        />
        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-text-secondary">
          Available For New Ideas
        </span>
      </div>

      {/* 2. Supporting Editorial Message */}
      <div className="contact-animate-item flex flex-col gap-2">
        <span
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: "var(--color-accent-primary, #2196F3)" }}
        >
          Let’s Talk
        </span>
        <p className="text-sm sm:text-base md:text-lg font-normal leading-relaxed text-text-primary">
          Have an idea, opportunity, or project in mind? Let’s start a conversation and turn it into something real.
        </p>
      </div>

      {/* 3. Editorial Contact Information List */}
      <div className="contact-animate-item flex flex-col gap-6 pt-2 border-t border-text-primary/10">
        {/* Email Block */}
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-bold uppercase tracking-widest text-text-secondary">
            Email
          </span>
          <a
            href="mailto:rkhusnasaputra@gmail.com"
            className="group flex items-center gap-1.5 text-base sm:text-lg lg:text-xl font-medium text-text-primary hover:text-[#2196F3] transition-colors duration-200"
          >
            <span className="border-b border-text-primary/30 group-hover:border-[#2196F3] transition-colors pb-0.5">
              rkhusnasaputra@gmail.com
            </span>
            <ArrowUpRightIcon className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
          </a>
        </div>

        {/* Phone Block */}
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-bold uppercase tracking-widest text-text-secondary">
            Phone
          </span>
          <a
            href="tel:+62895412506326"
            className="group flex items-center gap-1.5 text-base sm:text-lg lg:text-xl font-medium text-text-primary hover:text-[#2196F3] transition-colors duration-200"
          >
            <span className="border-b border-text-primary/30 group-hover:border-[#2196F3] transition-colors pb-0.5">
              +62 895-4125-06326
            </span>
            <ArrowUpRightIcon className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
          </a>
        </div>

        {/* Social Links Block */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-bold uppercase tracking-widest text-text-secondary">
            Social
          </span>
          <div className="flex items-center gap-6">
            {socialLinks
              .filter((l) => l.label !== "Email")
              .map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1 text-sm sm:text-base font-semibold text-text-primary hover:text-[#2196F3] transition-colors duration-200"
                >
                  <span className="border-b border-text-primary/30 group-hover:border-[#2196F3] transition-colors pb-0.5">
                    {link.label}
                  </span>
                  <ArrowUpRightIcon className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                </a>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
