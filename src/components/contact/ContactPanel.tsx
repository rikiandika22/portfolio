"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import ContactHeadline from "./ContactHeadline";
import ContactCTAButton from "./ContactCTAButton";
import BackControl from "./BackControl";
import { ArrowRightIcon } from "@/components/icons/ArrowIcons";

export default function ContactPanel() {
  const panelRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const animatedElements = [
        ".contact-headline-line",
        ".contact-animate-copy",
        ".contact-animate-links",
        ".contact-animate-back",
      ];

      const isDesktop =
        window.innerWidth >= 1024 && !window.matchMedia("(pointer: coarse)").matches;

      if (!isDesktop || prefersReducedMotion) {
        gsap.set(animatedElements, { opacity: 1, y: 0, yPercent: 0 });
        return;
      }

      // Initial setup for GSAP reveal (Desktop only)
      gsap.set(".contact-headline-line", { yPercent: 110 });
      gsap.set(".contact-animate-copy", { opacity: 0, y: 16 });
      gsap.set(".contact-animate-links", { opacity: 0, y: 16 });
      gsap.set(".contact-animate-back", { opacity: 0, y: 12 });

      // ScrollTrigger horizontal reveal
      const scroller = document.querySelector<HTMLElement>("[data-horizontal-scroller]");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panelRef.current,
          scroller: scroller || window,
          horizontal: true,
          start: "left 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(".contact-headline-line", {
        yPercent: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
      })
        .to(
          ".contact-animate-copy",
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .to(
          ".contact-animate-links",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .to(
          ".contact-animate-back",
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.3"
        );
    },
    { scope: panelRef }
  );

  return (
    <div
      ref={panelRef}
      className="w-full h-full min-h-[100svh] flex flex-col justify-between box-border overflow-hidden text-white m-0 p-0 border-0 outline-0 rounded-none select-none"
      style={{
        background: "var(--color-surface-dark-blue, #104A7B)",
      }}
    >
      {/* Inner responsive layout wrapper owning content padding and full edge-to-edge alignment */}
      <div
        className="w-full h-full min-h-[100svh] flex flex-col justify-center lg:justify-between box-border overflow-hidden bg-transparent"
        style={{
          paddingInline: "var(--page-padding-inline)",
          paddingTop: "calc(var(--page-padding-block) + 3.5rem)",
          paddingBottom: "calc(var(--page-padding-block) + 5.5rem)",
        }}
      >
        {/* Semantic Hidden Heading */}
        <h2 className="sr-only">Contact Section</h2>

        {/* ========================================================= */}
        {/* DESKTOP COMPOSITION (lg: and above) — 100% Preserved       */}
        {/* ========================================================= */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full my-auto">
          {/* Left Column — 4-Line Editorial Headline */}
          <div className="lg:col-span-7">
            <ContactHeadline />
          </div>

          {/* Right Column — Directional Marker & Supporting Copy */}
          <div className="lg:col-span-5 flex flex-col gap-4 items-start lg:pl-8 contact-animate-copy">
            <p
              className="text-[20px] font-normal leading-[1.5] max-w-[420px]"
              style={{ color: "var(--color-text-light-secondary, #A5C2DE)" }}
            >
              <span className="font-semibold text-white mr-3 inline-flex items-center gap-1">
                ( <ArrowRightIcon className="inline-block w-4 h-4 text-white" /> )
              </span>
              Have an idea, opportunity, or project in mind? Let’s start a conversation and turn it into something real.
            </p>
          </div>
        </div>

        {/* Desktop Lower Row: Phone & Email Links (Left) & Back Control (Right) */}
        <div className="hidden lg:flex flex-row items-center justify-between gap-6 w-full pt-4">
          <div className="flex flex-wrap items-center gap-4 contact-animate-links">
            <ContactCTAButton
              href="tel:+62895412506326"
              ariaLabel="Call phone number +62 895-4125-06326"
            >
              +62 895-4125-06326
            </ContactCTAButton>
            <ContactCTAButton
              href="mailto:rkhusnasaputra@gmail.com"
              ariaLabel="Send email to rkhusnasaputra@gmail.com"
            >
              rkhusnasaputra@gmail.com
            </ContactCTAButton>
          </div>

          <div className="contact-animate-back">
            <BackControl />
          </div>
        </div>

        {/* ========================================================= */}
        {/* DEDICATED MOBILE COMPOSITION (< lg) — Balanced Rhythm     */}
        {/* ========================================================= */}
        <div className="lg:hidden flex flex-col justify-center h-full w-full gap-y-6 sm:gap-y-8 my-auto">
          {/* Intro Block: Headline & Description */}
          <div className="flex flex-col gap-y-3 w-full">
            <ContactHeadline />
            <div className="contact-animate-copy">
              <p
                className="text-xs sm:text-sm font-normal leading-relaxed max-w-[360px]"
                style={{ color: "var(--color-text-light-secondary, #A5C2DE)" }}
              >
                <span className="font-semibold text-white mr-1.5 inline-flex items-center gap-0.5">
                  ( <ArrowRightIcon className="inline-block w-3.5 h-3.5 text-white" /> )
                </span>
                Have an idea, opportunity, or project in mind? Let’s start a conversation and turn it into something real.
              </p>
            </div>
          </div>

          {/* Unified Action Buttons Stack: Phone, Email, and Back with identical shared spacing */}
          <div className="flex flex-col gap-y-3 w-full items-start">
            <div className="flex flex-col gap-y-3 w-full items-start contact-animate-links">
              <ContactCTAButton
                href="tel:+62895412506326"
                ariaLabel="Call phone number +62 895-4125-06326"
                className="w-full sm:w-auto text-center"
              >
                +62 895-4125-06326
              </ContactCTAButton>

              <ContactCTAButton
                href="mailto:rkhusnasaputra@gmail.com"
                ariaLabel="Send email to rkhusnasaputra@gmail.com"
                className="w-full sm:w-auto text-center"
              >
                rkhusnasaputra@gmail.com
              </ContactCTAButton>
            </div>

            <div className="w-full sm:w-auto contact-animate-back">
              <BackControl className="w-full sm:w-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
