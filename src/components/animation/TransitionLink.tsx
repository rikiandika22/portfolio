"use client";

import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { usePageTransition } from "@/context/PageTransitionContext";

export interface TransitionLinkProps
  extends Omit<ComponentPropsWithoutRef<"a">, "href"> {
  href: string;
  children: ReactNode;
  customLabel?: string;
  customNumber?: string;
}

/**
 * TransitionLink — sole entry point for animated internal navigation.
 *
 * Renders a plain <a> tag (NOT Next.js <Link>) so we have 100% control over
 * when navigation fires. Next.js <Link> attaches an internal click handler
 * that calls router.push immediately, racing the GSAP cover animation.
 *
 * usePathname() is called here (not in the Provider) so that pathname changes
 * only re-render TransitionLink instances, not the global Provider subtree.
 *
 * External links and modifier-key clicks pass through as normal browser navigation.
 *
 * forwardRef allows consumers to attach a ref to the underlying <a> element
 * for GSAP scoping or DOM measurements.
 */
const TransitionLink = forwardRef<HTMLAnchorElement, TransitionLinkProps>(
  function TransitionLink(
    { href, children, customLabel, customNumber, onClick, ...props },
    ref
  ) {
    const { requestTransition } = usePageTransition();
    const pathname = usePathname();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (onClick) onClick(e);

      // Modifier-key actions: let browser handle (new tab, etc.)
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const isExternal =
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        props.target === "_blank";

      if (!isExternal) {
        e.preventDefault();
        e.stopPropagation();
        // Pass current pathname so Provider can do the same-route guard
        // without calling usePathname() itself (which would cause Provider re-renders)
        requestTransition(pathname, href, customLabel, customNumber);
      }
    };

    return (
      <a ref={ref} href={href} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);

TransitionLink.displayName = "TransitionLink";

export default TransitionLink;
