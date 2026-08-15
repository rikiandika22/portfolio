"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
} from "react";
import type { ReactNode } from "react";

// ─── Public types ─────────────────────────────────────────────────────────────

export interface DestinationInfo {
  number: string;
  label: string;
  href: string;
  /** Canonical pathname (no hash/query), used for same-route guard & route commit detection */
  targetPath: string;
}

interface PageTransitionContextType {
  /**
   * Request an animated internal navigation.
   * No-op if already transitioning or href === current pathname.
   *
   * The caller provides the current pathname so the Provider does NOT
   * need to call usePathname() — eliminating re-renders of the entire
   * Provider subtree when the route changes.
   */
  requestTransition: (
    currentPathname: string,
    href: string,
    customLabel?: string,
    customNumber?: string
  ) => void;
  /**
   * Subscribe to transition requests. The overlay calls this once on mount
   * to register its handler. Returns an unsubscribe fn.
   */
  subscribe: (handler: (dest: DestinationInfo) => void) => () => void;
  /**
   * True while any transition is active — the overlay maintains this via refs.
   * Exposed so callers can skip duplicate requests.
   */
  isActiveRef: React.MutableRefObject<boolean>;
}

// ─── Route label map ──────────────────────────────────────────────────────────

const ROUTE_LABELS: Record<string, { number: string; label: string }> = {
  "/": { number: "01/", label: "PORTFOLIO" },
  "/works": { number: "02/", label: "WORKS" },
  "/about": { number: "03/", label: "ABOUT" },
  "/contact": { number: "04/", label: "CONTACTS" },
  "/contacts": { number: "04/", label: "CONTACTS" },
  "/credentials": { number: "05/", label: "CREDENTIALS" },
  "/projects/sumber-agung-trans": { number: "01/", label: "SUMBER AGUNG TRANS" },
  "/projects/32-bloc": { number: "02/", label: "32 BLOC" },
  "/projects/moneylog": { number: "03/", label: "MONEYLOG" },
};

/** Strip hash/query and trailing slash (except root) */
export function normalizePath(p: string): string {
  const clean = p.split("#")[0].split("?")[0] || "/";
  return clean !== "/" ? clean.replace(/\/$/, "") : clean;
}

function resolveDestination(
  href: string,
  customLabel?: string,
  customNumber?: string
): DestinationInfo {
  const targetPath = normalizePath(href);
  const matched = ROUTE_LABELS[targetPath];

  if (customLabel) {
    return {
      number: customNumber ?? "01/",
      label: customLabel.toUpperCase(),
      href,
      targetPath,
    };
  }
  if (matched) return { ...matched, href, targetPath };

  const segment = targetPath.replace(/^\//, "").split("/").pop() ?? "";
  return {
    number: "01/",
    label: segment.replace(/-/g, " ").toUpperCase() || "PORTFOLIO",
    href,
    targetPath,
  };
}

// ─── Context ──────────────────────────────────────────────────────────────────

const PageTransitionContext = createContext<PageTransitionContextType | null>(
  null
);

/**
 * PageTransitionProvider
 *
 * Intentionally minimal — it does NOT call usePathname() or useState().
 * This means NO re-renders of the Provider subtree happen when the route
 * changes, which was the root cause of the double-initialization bug.
 *
 * All GSAP lifecycle ownership lives in PageTransitionOverlay, which uses
 * refs to stay stable across re-renders.
 *
 * Communication model: publish/subscribe with a single handler slot.
 */
export function PageTransitionProvider({ children }: { children: ReactNode }) {
  // Single handler slot — PageTransitionOverlay registers here on mount
  const handlerRef = useRef<((dest: DestinationInfo) => void) | null>(null);

  // Active flag owned by the overlay; stored here so requestTransition can guard
  const isActiveRef = useRef(false);

  const subscribe = useCallback((handler: (dest: DestinationInfo) => void) => {
    handlerRef.current = handler;
    return () => {
      handlerRef.current = null;
    };
  }, []);

  const requestTransition = useCallback(
    (
      currentPathname: string,
      href: string,
      customLabel?: string,
      customNumber?: string
    ) => {
      // Ignore external / mailto
      if (href.startsWith("http") || href.startsWith("mailto:")) return;

      // Block while active
      if (isActiveRef.current) return;

      // Same-route guard — caller passes current pathname (from usePathname in
      // TransitionLink), so the Provider never needs usePathname() itself
      const targetPath = normalizePath(href);
      const currentPath = normalizePath(currentPathname);
      if (targetPath === currentPath) return;

      const dest = resolveDestination(href, customLabel, customNumber);
      isActiveRef.current = true;
      handlerRef.current?.(dest);
    },
    [isActiveRef]
  );

  return (
    <PageTransitionContext.Provider
      value={{ requestTransition, subscribe, isActiveRef }}
    >
      {children}
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) {
    throw new Error(
      "usePageTransition must be used within a PageTransitionProvider"
    );
  }
  return ctx;
}
