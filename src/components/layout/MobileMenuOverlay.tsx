"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { usePageTransition, normalizePath } from "@/context/PageTransitionContext";
import { socialLinks } from "@/data/socialLinks";
import { gsap } from "@/lib/gsap";

interface MobileMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  name: string;
  href: string;
  customLabel: string;
  customNumber: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: "HOME", href: "/", customLabel: "PORTFOLIO", customNumber: "01/" },
  { name: "WORKS", href: "/works", customLabel: "WORKS", customNumber: "02/" },
  { name: "ABOUT", href: "/about", customLabel: "ABOUT", customNumber: "03/" },
  { name: "CREDENTIALS", href: "/credentials", customLabel: "CREDENTIALS", customNumber: "05/" },
  { name: "CONTACT", href: "/contact", customLabel: "CONTACTS", customNumber: "04/" },
];

export default function MobileMenuOverlay({ isOpen, onClose }: MobileMenuOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const isClosingRef = useRef(false);
  const pathname = usePathname();
  const { requestTransition } = usePageTransition();

  // Scroll lock effect
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Smooth animated close handler matching In animation
  const handleAnimatedClose = useCallback(
    (onCompleteCallback?: () => void) => {
      if (isClosingRef.current) return;
      isClosingRef.current = true;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion || !overlayRef.current) {
        isClosingRef.current = false;
        onClose();
        onCompleteCallback?.();
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          isClosingRef.current = false;
          onClose();
          onCompleteCallback?.();
        },
      });

      tl.to(".mobile-nav-item", {
        opacity: 0,
        y: -12,
        duration: 0.26,
        stagger: -0.025,
        ease: "power2.inOut",
      })
        .to(
          [".mobile-menu-header", ".mobile-menu-footer"],
          {
            opacity: 0,
            duration: 0.22,
            ease: "power2.inOut",
          },
          0
        )
        .to(
          overlayRef.current,
          {
            opacity: 0,
            y: -16,
            duration: 0.32,
            ease: "power3.inOut",
          },
          "-=0.12"
        );
    },
    [onClose]
  );

  // Keyboard Escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleAnimatedClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleAnimatedClose]);

  // GSAP entrance animation on mount
  useEffect(() => {
    if (!isOpen || !overlayRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(overlayRef.current, { opacity: 1 });
      gsap.set(".mobile-nav-item", { opacity: 1, y: 0 });
      gsap.set([".mobile-menu-header", ".mobile-menu-footer"], { opacity: 1 });
      return;
    }

    const tl = gsap.timeline();

    tl.fromTo(
      overlayRef.current,
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }
    )
      .fromTo(
        [".mobile-menu-header", ".mobile-menu-footer"],
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" },
        0.05
      )
      .fromTo(
        ".mobile-nav-item",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: "power3.out",
        },
        0.08
      );
  }, [isOpen]);

  if (!isOpen) return null;

  const currentNormalized = normalizePath(pathname);

  const handleNavClick = (item: NavItem) => {
    const isSameRoute =
      (item.name === "HOME" && currentNormalized === "/") ||
      (item.name === "WORKS" && (currentNormalized === "/works" || pathname.startsWith("/projects/"))) ||
      (item.name === "ABOUT" && currentNormalized === "/about") ||
      (item.name === "CREDENTIALS" && currentNormalized === "/credentials") ||
      (item.name === "CONTACT" && (currentNormalized === "/contact" || currentNormalized === "/contacts"));

    if (isSameRoute) {
      handleAnimatedClose();
      return;
    }

    // Trigger page transition and smoothly close mobile overlay
    requestTransition(pathname, item.href, item.customLabel, item.customNumber);
    handleAnimatedClose();
  };

  const isSelected = (item: NavItem) => {
    if (item.name === "HOME") {
      return currentNormalized === "/";
    }
    if (item.name === "WORKS") {
      return currentNormalized === "/works" || pathname.startsWith("/projects/");
    }
    if (item.name === "ABOUT") {
      return currentNormalized === "/about";
    }
    if (item.name === "CREDENTIALS") {
      return currentNormalized === "/credentials";
    }
    if (item.name === "CONTACT") {
      return currentNormalized === "/contact" || currentNormalized === "/contacts";
    }
    return false;
  };

  return (
    <div
      ref={overlayRef}
      id="fullscreen-mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      className="fixed inset-0 z-[60] w-full h-[100dvh] flex flex-col justify-between box-border overflow-hidden select-none pointer-events-auto"
      style={{
        backgroundColor: "var(--color-base-dark, #1D242D)",
        paddingInline: "var(--page-padding-inline, 16px)",
        paddingTop: "var(--page-padding-block, 16px)",
        paddingBottom: "calc(var(--page-padding-block, 16px) + 0.5rem)",
      }}
    >
      {/* Menu Header: Riki Andika (Left) & Close (Right) */}
      <div className="mobile-menu-header flex items-center justify-between w-full text-white z-10">
        <span className="text-xl font-bold tracking-tight text-white">
          Riki Andika
        </span>

        <button
          type="button"
          onClick={() => handleAnimatedClose()}
          aria-label="Close navigation menu"
          className="text-lg font-semibold text-white/90 hover:text-white transition-opacity cursor-pointer px-3 py-1.5 active:scale-95 z-20"
        >
          Close
        </button>
      </div>

      {/* Large Navigation Links List */}
      <nav className="my-auto flex flex-col gap-4 sm:gap-6 w-full z-10">
        {NAV_ITEMS.map((item) => {
          const active = isSelected(item);
          return (
            <div key={item.name} className="mobile-nav-item flex items-baseline gap-4">
              <button
                type="button"
                onClick={() => handleNavClick(item)}
                className={`text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-left transition-colors duration-200 cursor-pointer ${
                  active
                    ? "text-[#4DABF5]"
                    : "text-white hover:text-[#4DABF5]"
                }`}
                style={{
                  lineHeight: "1",
                  letterSpacing: "-0.02em",
                }}
              >
                {item.name}
              </button>

              {active && (
                <span
                  className="text-xs sm:text-sm font-normal lowercase tracking-normal text-[#A5C2DE]"
                  aria-label="Current page"
                >
                  selected
                </span>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom Contact & Social Links Section */}
      <div className="mobile-menu-footer flex items-end justify-between w-full pt-6 border-t border-white/15 text-xs sm:text-sm z-10">
        {/* Left: Email & Phone */}
        <div className="flex flex-col gap-1.5 text-white/80">
          <a
            href="mailto:rkhusnasaputra@gmail.com"
            className="hover:text-white transition-colors"
          >
            rkhusnasaputra@gmail.com
          </a>
          <a
            href="tel:+62895412506326"
            className="hover:text-white transition-colors"
          >
            +62 895-4125-06326
          </a>
        </div>

        {/* Right: Github & Linkedin */}
        <div className="flex flex-col items-end gap-1.5 text-white/80">
          {socialLinks
            .filter((link) => link.label !== "Email")
            .map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
        </div>
      </div>
    </div>
  );
}
