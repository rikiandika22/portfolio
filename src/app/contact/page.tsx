import type { Metadata } from "next";
import PersistentNavigation from "@/components/layout/PersistentNavigation";
import PersistentFooter from "@/components/layout/PersistentFooter";
import ContactPageClient from "@/components/contact/detail/ContactPageClient";

export const metadata: Metadata = {
  title: "Contacts | Riki Andika Portfolio",
  description:
    "Get in touch with Riki Andika Khusna Saputra. Open for frontend development, UI UX design, and collaboration opportunities.",
};

export default function ContactPage() {
  return (
    <div
      data-contact-page
      className="relative min-h-screen w-full overflow-x-hidden bg-page-background text-text-primary"
      style={{ backgroundColor: "var(--color-page-background, #F1EFE9)" }}
    >
      {/* Shared Persistent Topbar Navigation */}
      <PersistentNavigation />

      {/* Main Editorial Contact Content */}
      <ContactPageClient />

      {/* Shared Persistent Global Footer */}
      <PersistentFooter />
    </div>
  );
}
