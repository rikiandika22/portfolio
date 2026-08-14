import { gsap } from "@/lib/gsap";

let activeTween: gsap.core.Tween | null = null;

/**
 * Programmatically animates horizontal scroller to a target panel offsetLeft.
 * Duration: 1.2s, Ease: power3.inOut.
 */
export function animateToPanel(scroller: HTMLElement, targetLeft: number) {
  killNavTween();

  activeTween = gsap.to(scroller, {
    scrollLeft: targetLeft,
    duration: 1.2,
    ease: "power3.inOut",
    onComplete: () => {
      activeTween = null;
    },
    onInterrupt: () => {
      activeTween = null;
    },
  });
}

/**
 * Immediately kills any active programmatic navigation animation.
 */
export function killNavTween() {
  if (activeTween) {
    activeTween.kill();
    activeTween = null;
  }
}
