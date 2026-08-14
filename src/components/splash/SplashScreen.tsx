"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import SplashFrame from "./SplashFrame";
import SplashHeadline from "./SplashHeadline";
import { SPLASH_CONFIG } from "@/lib/animationConfig";
import { PROJECT_STACK_SKIP_SPLASH_KEY, SPLASH_COMPLETED_KEY } from "@/lib/projectNavigation";

// Type declaration for dev window helpers
declare global {
  interface Window {
    splashTimeline?: gsap.core.Timeline;
    textTransitionTimeline?: gsap.core.Timeline;
    setSplashSpeed?: (speed: number) => void;
    replaySplash?: () => void;
  }
}

const emptySubscribe = () => () => {};

export default function SplashScreen() {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Always show splash screen on page mount/reload unless skipped
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    if (!isCompleted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Dev keyboard shortcut: Shift + R to replay splash
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase() === "r") {
        window.location.reload();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCompleted]);

  const finishSplash = () => {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
    const homeItems = document.querySelectorAll(".home-animate-item");
    if (homeItems.length > 0) {
      gsap.set(homeItems, { opacity: 1, y: 0 });
    }
    gsap.set(["header[data-persistent-nav]", "footer[data-persistent-footer]"], {
      opacity: 1,
      pointerEvents: "auto",
    });
    sessionStorage.setItem(SPLASH_COMPLETED_KEY, "true");
    setIsCompleted(true);
  };

  useGSAP(
    () => {
      if (!isClient || isCompleted) return;

      // Skip splash only when returning from project detail page to project stack
      if (
        sessionStorage.getItem(PROJECT_STACK_SKIP_SPLASH_KEY) === "true"
      ) {
        sessionStorage.removeItem(PROJECT_STACK_SKIP_SPLASH_KEY);
        finishSplash();
        return;
      }

      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

      if (mediaQuery.matches) {
        // Reduced Motion Fallback (< 500ms opacity fade)
        gsap.to(".splash-outer-container", {
          opacity: 0,
          duration: SPLASH_CONFIG.reducedMotionDuration,
          ease: "power2.out",
          onComplete: finishSplash,
        });
        return;
      }

      const isMobile = window.innerWidth < 768;

      const headlineItems = gsap.utils.toArray<HTMLElement>(".splash-headline-item");
      const headlineTexts = gsap.utils.toArray<HTMLElement>(".splash-headline-text");
      const homeAnimateItems = gsap.utils.toArray<HTMLElement>(".home-animate-item");

      // Calibrated timing values
      const frameDur = isMobile ? 0.6 : 0.75;
      const enterDur = isMobile ? 0.55 : 0.7;
      const holdDur = isMobile ? 0.35 : 0.5;
      const exitDur = isMobile ? 0.25 : 0.35;
      const stageGap = 0.05;

      const pauseDur = isMobile ? 0.15 : 0.25;
      const transitionDur = isMobile ? 0.9 : 1.1;
      const homepageDur = 0.8;

      // 1. Initial Setup: Hide Persistent Navbar & Footer completely during splash
      gsap.set(["header[data-persistent-nav]", "footer[data-persistent-footer]"], {
        opacity: 0,
        pointerEvents: "none",
      });

      gsap.set(".splash-outer-container", { opacity: 1, backgroundColor: "#1D242D" });
      gsap.set(".splash-surface", {
        yPercent: 0,
        borderRadius: "0% 0% 0% 0% / 0% 0% 0% 0%",
      });
      gsap.set(headlineItems, { opacity: 0 });
      gsap.set(headlineTexts, { yPercent: 120 });

      if (homeAnimateItems.length > 0) {
        gsap.set(homeAnimateItems, { opacity: 0, y: 15 });
      }

      // 2. Dedicated Text Transition Timeline
      const textTransitionTimeline = gsap.timeline();

      textTransitionTimeline
        .add("introText")
        // Stage 1: "TURNING IDEAS"
        .to(headlineItems[0], { opacity: 1, duration: 0.08 }, "introText")
        .to(
          headlineTexts[0],
          {
            yPercent: 0,
            duration: enterDur,
            ease: SPLASH_CONFIG.eases.headline,
          },
          "introText"
        )
        .add("firstTextExit", `introText+=${enterDur + holdDur}`)
        .to(
          headlineTexts[0],
          {
            yPercent: -120,
            duration: exitDur,
            ease: SPLASH_CONFIG.eases.headlineExit,
          },
          "firstTextExit"
        )
        .to(
          headlineItems[0],
          { opacity: 0, duration: 0.08 },
          `firstTextExit+=${exitDur}`
        )

        // Stage 2: "INTO DIGITAL"
        .add("secondTextEnter", `firstTextExit+=${exitDur + stageGap}`)
        .to(
          headlineItems[1],
          { opacity: 1, duration: 0.08 },
          "secondTextEnter"
        )
        .to(
          headlineTexts[1],
          {
            yPercent: 0,
            duration: enterDur,
            ease: SPLASH_CONFIG.eases.headline,
          },
          "secondTextEnter"
        )
        .add("secondTextExit", `secondTextEnter+=${enterDur + holdDur}`)
        .to(
          headlineTexts[1],
          {
            yPercent: -120,
            duration: exitDur,
            ease: SPLASH_CONFIG.eases.headlineExit,
          },
          "secondTextExit"
        )
        .to(
          headlineItems[1],
          { opacity: 0, duration: 0.08 },
          `secondTextExit+=${exitDur}`
        )

        // Stage 3: "EXPERIENCES"
        .add("thirdTextEnter", `secondTextExit+=${exitDur + stageGap}`)
        .to(
          headlineItems[2],
          { opacity: 1, duration: 0.08 },
          "thirdTextEnter"
        )
        .to(
          headlineTexts[2],
          {
            yPercent: 0,
            duration: enterDur,
            ease: SPLASH_CONFIG.eases.headline,
          },
          "thirdTextEnter"
        )
        .add("finalTextHold", `thirdTextEnter+=${enterDur + holdDur}`)
        .add("thirdTextExit", "finalTextHold")
        .to(
          headlineTexts[2],
          {
            yPercent: -120,
            duration: exitDur,
            ease: SPLASH_CONFIG.eases.headlineExit,
          },
          "thirdTextExit"
        )
        .to(
          headlineItems[2],
          { opacity: 0, duration: 0.08 },
          `thirdTextExit+=${exitDur}`
        );

      // 3. Primary Master Timeline
      const mainTimeline = gsap.timeline({
        onComplete: finishSplash,
      });

      // Expose development controls on window object
      if (typeof window !== "undefined") {
        window.splashTimeline = mainTimeline;
        window.textTransitionTimeline = textTransitionTimeline;
        window.setSplashSpeed = (speed: number) => {
          mainTimeline.timeScale(speed);
        };
        window.replaySplash = () => {
          window.location.reload();
        };
      }

      mainTimeline
        .add("intro")
        // frameReveal: Background & Frame reveal
        .add("frameReveal", "intro")
        .to(
          ".splash-outer-container",
          { opacity: 1, duration: 0.1 },
          "frameReveal"
        )
        .to(
          ".splash-surface",
          {
            duration: frameDur,
            ease: SPLASH_CONFIG.eases.frame,
          },
          "frameReveal"
        )

        // Add textTransitionTimeline
        .add(textTransitionTimeline, "frameReveal+=0.15")

        // compositionHold: Visual breathing space pause after text timeline completes
        .add("compositionHold")

        // transitionToHomepage: Upward Arch Wipe Reveal matching page-to-page transition
        .add("transitionToHomepage", `compositionHold+=${pauseDur}`)
        .set(
          ".splash-outer-container",
          { backgroundColor: "transparent", pointerEvents: "none" },
          "transitionToHomepage"
        )
        .to(
          ".splash-surface",
          {
            yPercent: -110,
            borderRadius: "0% 0% 50% 50% / 0% 0% 12% 12%",
            duration: transitionDur,
            ease: SPLASH_CONFIG.eases.transition,
          },
          "transitionToHomepage"
        )

        // homepageReveal: Seamless Homepage entrance overlap & Navbar/Footer reveal
        .add("homepageReveal", `transitionToHomepage+=${transitionDur * 0.35}`)
        .to(
          ["header[data-persistent-nav]", "footer[data-persistent-footer]"],
          {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => {
              gsap.set(["header[data-persistent-nav]", "footer[data-persistent-footer]"], {
                pointerEvents: "auto",
              });
            },
          },
          "homepageReveal"
        )
        .to(
          homeAnimateItems,
          {
            opacity: 1,
            y: 0,
            duration: homepageDur,
            stagger: 0.08,
            ease: SPLASH_CONFIG.eases.homepage,
          },
          "homepageReveal"
        );
    },
    { dependencies: [isClient, isCompleted] }
  );

  if (!isClient || isCompleted) {
    return null;
  }

  return (
    <SplashFrame>
      <div className="my-auto w-full flex items-center justify-center">
        <SplashHeadline />
      </div>
    </SplashFrame>
  );
}
