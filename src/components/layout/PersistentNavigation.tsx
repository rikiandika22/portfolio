"use client";

import { useState } from "react";
import TransitionLink from "@/components/animation/TransitionLink";
import NavbarBrand from "./NavbarBrand";
import MobileMenuOverlay from "./MobileMenuOverlay";
import { socialLinks } from "@/data/socialLinks";

export default function PersistentNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header
        data-persistent-nav
        className="fixed top-0 left-0 right-0 z-50 w-full pointer-events-auto mix-blend-difference text-white"
        style={{
          paddingInline: "var(--page-padding-inline)",
          paddingTop: "var(--page-padding-block)",
        }}
      >
        {/*
         * Stable navigation bar:
         * Desktop: three-column grid (Brand, Center links, Social links)
         * Mobile: two-item layout (Brand on Left, Menu button on Right)
         */}
        <nav className="flex sm:grid sm:grid-cols-[1fr_auto_1fr] items-center justify-between w-full text-white">
          {/* Left — Brand name with hover reveal */}
          <div className="justify-self-start text-white">
            <NavbarBrand />
          </div>

          {/* Center — Desktop Navigation links */}
          <ul className="hidden sm:flex justify-self-center items-center gap-6 lg:gap-8 text-white">
            <li>
              <TransitionLink
                href="/works"
                customNumber="02/"
                customLabel="WORKS"
                className="text-2xl font-semibold leading-[1.5] tracking-normal text-white transition-opacity duration-200 hover:opacity-70"
              >
                Works
              </TransitionLink>
            </li>
            <li>
              <TransitionLink
                href="/about"
                customNumber="03/"
                customLabel="ABOUT"
                className="text-2xl font-semibold leading-[1.5] tracking-normal text-white transition-opacity duration-200 hover:opacity-70"
              >
                About
              </TransitionLink>
            </li>
            <li>
              <TransitionLink
                href="/credentials"
                customNumber="05/"
                customLabel="CREDENTIALS"
                className="text-2xl font-semibold leading-[1.5] tracking-normal text-white transition-opacity duration-200 hover:opacity-70"
              >
                Credentials
              </TransitionLink>
            </li>
            <li>
              <TransitionLink
                href="/contact"
                customNumber="04/"
                customLabel="CONTACTS"
                className="text-2xl font-semibold leading-[1.5] tracking-normal text-white transition-opacity duration-200 hover:opacity-70"
              >
                Contacts
              </TransitionLink>
            </li>
          </ul>

          {/* Right — Desktop Social links */}
          <ul className="hidden sm:flex justify-self-end items-center gap-6 text-white">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-xl font-semibold leading-[1.5] tracking-normal text-white transition-opacity duration-200 hover:opacity-70"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Right — Single Menu Button */}
          <div className="sm:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="fullscreen-mobile-menu"
              className="text-lg font-semibold leading-[1.5] text-white transition-opacity duration-200 hover:opacity-70 cursor-pointer py-1"
            >
              Menu
            </button>
          </div>
        </nav>
      </header>

      {/* Fullscreen Mobile Navigation Overlay */}
      <MobileMenuOverlay
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
