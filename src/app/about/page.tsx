import type { Metadata } from "next";
import PersistentNavigation from "@/components/layout/PersistentNavigation";
import PersistentFooter from "@/components/layout/PersistentFooter";
import AboutDetailHero from "@/components/about/detail/AboutDetailHero";
import AboutDetailCapabilities from "@/components/about/detail/AboutDetailCapabilities";
import AboutDetailContactCTA from "@/components/about/detail/AboutDetailContactCTA";

export const metadata: Metadata = {
  title: "About | Riki Andika Portfolio",
  description:
    "I'm Riki Andika, a developer and designer based in Yogyakarta passionate about frontend development, UI UX design, mobile development, and graphic design.",
};

export default function AboutDetailPage() {
  return (
    <div
      data-about-detail-page
      className="relative min-h-screen w-full overflow-x-hidden bg-page-background text-text-primary"
      style={{ backgroundColor: "var(--color-page-background, #F1EFE9)" }}
    >
      <PersistentNavigation />

      <main className="w-full box-border">
        {/* Main Content Container — Hero & Capabilities */}
        <div
          className="mx-auto w-full max-w-[1380px] box-border"
          style={{
            paddingInline: "var(--page-padding-inline)",
            paddingTop: "calc(var(--page-padding-block) + 4rem)",
          }}
        >
          <AboutDetailHero />
          <AboutDetailCapabilities />
        </div>

        {/* Full-Width Blue CTA Section — 100% Edge-to-Edge & Viewport-Dominant */}
        <AboutDetailContactCTA />
      </main>

      <PersistentFooter />
    </div>
  );
}
