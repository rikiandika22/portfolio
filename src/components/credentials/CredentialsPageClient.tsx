"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import CredentialsHero from "./CredentialsHero";
import CredentialsArchiveIntro from "./CredentialsArchiveIntro";
import FeaturedCredentialsList from "./FeaturedCredentialsList";
import MoreCredentialsSection from "./MoreCredentialsSection";

export default function CredentialsPageClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(".credentials-headline-line", { yPercent: 0 });
        gsap.set(".credentials-hero-item", { opacity: 1, y: 0 });
        gsap.set("[data-credential-item]", { opacity: 1, y: 0 });
        gsap.set("[data-more-credentials]", { opacity: 1, y: 0 });
        return;
      }

      // Initial hero entrance
      gsap.set(".credentials-headline-line", { yPercent: 115 });
      gsap.set(".credentials-hero-item", { opacity: 0, y: 20 });

      const heroTl = gsap.timeline({ delay: 0.1 });
      heroTl
        .to(".credentials-headline-line", {
          yPercent: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
        })
        .to(
          ".credentials-hero-item",
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.45"
        );

      // Viewport reveal for featured credential items with ScrollTrigger
      const credentialItems = gsap.utils.toArray<HTMLElement>(
        "[data-credential-item]"
      );
      credentialItems.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });

      // Viewport reveal for More Credentials section
      const moreSection = document.querySelector<HTMLElement>(
        "[data-more-credentials]"
      );
      if (moreSection) {
        gsap.fromTo(
          moreSection,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: moreSection,
              start: "top 88%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[100dvh] flex flex-col box-border overflow-x-hidden"
      style={{
        backgroundColor: "var(--color-page-background, #F1EFE9)",
        paddingInline: "var(--page-padding-inline)",
        paddingTop: "calc(var(--page-padding-block) + 5rem)",
        paddingBottom: "calc(var(--page-padding-block) + 6rem)",
      }}
    >
      <main className="w-full max-w-[1380px] mx-auto box-border flex-1 flex flex-col">
        <CredentialsHero />
        <CredentialsArchiveIntro />
        <FeaturedCredentialsList />
        <MoreCredentialsSection />
      </main>
    </div>
  );
}
