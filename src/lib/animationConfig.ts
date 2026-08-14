export const SPLASH_CONFIG = {
  // Desktop target total duration: ~4.7s
  desktopDuration: 4.7,
  // Mobile target total duration: ~2.8s
  mobileDuration: 2.8,

  sessionKey: "portfolio_splash_completed",
  reducedMotionDuration: 0.4,

  // Easing values per specification
  eases: {
    frame: "power3.inOut",
    headline: "power4.out",
    headlineExit: "power3.in",
    metadata: "power2.out",
    progress: "power2.inOut",
    transition: "power4.inOut",
    homepage: "power3.out",
  },
};
