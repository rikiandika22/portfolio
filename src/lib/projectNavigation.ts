export const PROJECT_STACK_ID = "personal-projects";
export const PROJECT_STACK_PATH = `/works#${PROJECT_STACK_ID}`;

export const PROJECT_STACK_SEEN_KEY = "portfolio:project-stack-seen";
export const PROJECT_STACK_SKIP_SPLASH_KEY =
  "portfolio:skip-splash-on-project-return";

/**
 * Set in sessionStorage once the splash animation completes.
 * Prevents SplashScreen from replaying when the component remounts
 * (e.g. navigating away from "/" and back) within the same browser session.
 */
export const SPLASH_COMPLETED_KEY = "portfolio:splash-completed";
