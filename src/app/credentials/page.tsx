import type { Metadata } from "next";
import PersistentNavigation from "@/components/layout/PersistentNavigation";
import PersistentFooter from "@/components/layout/PersistentFooter";
import CredentialsPageClient from "@/components/credentials/CredentialsPageClient";

export const metadata: Metadata = {
  title: "Credentials | Riki Andika Portfolio",
  description:
    "A collection of credentials documenting the skills, experiences, and achievements Riki Andika has developed.",
};

export default function CredentialsPage() {
  return (
    <div
      data-credentials-page
      className="relative min-h-screen w-full overflow-x-hidden bg-page-background text-text-primary"
      style={{ backgroundColor: "var(--color-page-background, #F1EFE9)" }}
    >
      {/* Shared Persistent Topbar Navigation */}
      <PersistentNavigation />

      {/* Main Credentials Content */}
      <CredentialsPageClient />

      {/* Shared Persistent Global Footer */}
      <PersistentFooter />
    </div>
  );
}
