# AI Agent Instructions

## Controlled Creative Freedom

AI may add small visual details when the exact implementation is not explicitly defined by Figma.

Allowed additions must:

1. Follow the existing editorial style.
2. Use approved design tokens.
3. Remain visually secondary.
4. Improve continuity, hierarchy, or motion.
5. Avoid changing approved content.
6. Avoid changing the main page composition.
7. Be documented in the completion report.

AI must not introduce a new visual direction, unapproved color, major layout element, or unrelated animation without approval.

## 1. Project Identity

This project is the personal portfolio website of Riki Andika Khusna Saputra.

The portfolio presents selected work in frontend development, Flutter mobile development, UI UX design, and software engineering.

The visual direction uses a minimal editorial style with large typography, controlled spacing, strong composition, and motion focused interactions.

The implementation must preserve the approved visual identity from Figma while remaining responsive, accessible, and maintainable.

## 2. Primary Objective

The current objective is to translate approved Figma frames into a production ready portfolio website.

The first frame to be implemented is the homepage frame displayed after the splash screen.

The first implementation phase must focus on static desktop accuracy before responsive behavior and animation are added.

The exported Figma frame is the primary visual reference.

Target desktop viewport:

1440 by 900 pixels

## 3. Required Reading

Before writing or changing code, read the following files when they are available:

1. `AGENTS.md`

2. `docs/PROJECT_CONTEXT.md`

3. `docs/DESIGN_SYSTEM.md`

4. `docs/UI_SPEC.md`

5. `docs/ANIMATION_SPEC.md`

6. `docs/CONTENT.md`

7. `docs/ARCHITECTURE.md`

8. `docs/DECISIONS.md`

9. `CURRENT_TASK.md`

When instructions conflict, follow this priority:

1. The latest user instruction

2. The exported Figma frame

3. `docs/DESIGN_SYSTEM.md`

4. `docs/UI_SPEC.md`

5. `AGENTS.md`

6. Existing project conventions

Do not invent content, visual elements, sections, or interactions that are not present in the approved design.

## 4. Technology

Use the following technology:

1. Next.js App Router

2. TypeScript

3. Tailwind CSS

4. GSAP

5. `@gsap/react`

6. Next Image

Use GSAP ScrollTrigger only for scroll based interactions.

Use GSAP SplitText only when the final text reveal requires line, word, or character splitting.

Do not install another animation library without approval.

Do not add a dependency when the same result can be achieved clearly with the existing stack.

## 5. Design System Rules

The Figma style guide and `docs/DESIGN_SYSTEM.md` are the sources of truth for typography, colors, spacing, and visual hierarchy.

Before implementing any visual interface:

1. Read `docs/DESIGN_SYSTEM.md`.

2. Use the approved typography tokens.

3. Use the approved color tokens.

4. Use the approved font weights and line heights.

5. Use the approved spacing values whenever possible.

6. Use semantic token names inside components.

Do not estimate design values from screenshots when an exact token exists.

Do not write raw hexadecimal values inside React components.

Do not create arbitrary font sizes when a matching typography token exists.

Large editorial headings may use responsive `clamp()` values, but the maximum size must match the approved Figma token.

Do not introduce new colors, type sizes, font weights, shadows, gradients, or radii without approval.

## 6. Asset Placement

Assets used by the website belong inside `public`.

Use this structure:

```text
public
  images
    profile
    projects

  icons
    navigation
    social

  logos
    technologies
```

Reference images used only for slicing and visual comparison belong inside `docs/references`.

Use this structure:

```text
docs
  references
    figma
      homepage
      works
      projects
```

Rules:

1. Do not render the exported Figma frame as the website.

2. Do not convert editable text into images.

3. Use WebP for photographic and screenshot assets when appropriate.

4. Use SVG for simple vector icons and technology logos.

5. Use Next Image for raster images.

6. Preserve the intended image aspect ratio.

7. Provide meaningful alternative text.

8. Do not stretch, distort, or blur important project images.

## 7. Homepage Initial Frame Content

### Navigation

Left:

`Riki Andika`

Center:

`Works`

`About`

`Contacts`

Right:

`Github`

`Linkedin`

`Email`

### Section Metadata

`01/`

`BASED IN YOGYAKARTA`

`BUILDING WITH LOVE`

### Main Headline

`DESIGN MINDED`

`DEVELOPER`

### Full Name

`RIKI`

`ANDIKA`

`KHUSNA`

`SAPUTRA`

### Introduction

`BASED IN SLEMAN, YOGYAKARTA.`

`PASSIONATE IN FRONTEND, UI UX, AND GRAPHIC DESIGN`


### Footer

Left:

`© 2026 Portfolio`

Center:

Scroll indicator

Right:

`Design & Code by Riki Andika`

Do not rewrite approved content unless the user explicitly asks for a copywriting revision.

## 8. Layout Rules

1. Build a full viewport editorial homepage.

2. Use the approved warm cream background.

3. Use the approved soft pink page frame.

4. Use CSS Grid for the primary page composition.

5. Use Flexbox inside smaller interface groups.

6. Use a stable three column navigation so the center navigation remains visually centered.

7. Use a twelve column grid for the main identity area.

8. Place the full name on the left.

9. Place the portrait near the center.

10. Place the introduction on the right.

11. Keep the large headline in the upper right area.

12. Keep the footer aligned to the lower area of the frame.

13. Do not use absolute positioning for the entire page layout.

14. Use absolute positioning only for small decorative elements or precise overlays that cannot be achieved with Grid or Flexbox.

15. Do not create horizontal overflow.

16. Keep all text editable in HTML.

17. Preserve approved headline and name line breaks.

18. Preserve the portrait aspect ratio.

19. Do not add visual decoration that is absent from the Figma reference.

20. Do not add a generic card layout to an editorial composition.

## 9. Responsive Rules

Complete and validate the desktop version before creating tablet and mobile layouts.

Responsive behavior must follow these rules:

1. Do not simply shrink the desktop frame.

2. Recompose the layout for readability on smaller screens.

3. Preserve the same content hierarchy.

4. Use fluid typography where appropriate.

5. Keep navigation usable.

6. Maintain appropriate touch target sizes.

7. Prevent horizontal scrolling.

8. Keep essential content visible without requiring animation.

9. Test desktop, tablet, and mobile viewports.

10. Do not force the desktop text wrapping when it reduces mobile readability.

## 10. Component Rules

Separate page composition from reusable components.

Recommended structure:

```text
src
  app
    page.tsx

  components
    home
      HomeFrame.tsx
      Navigation.tsx
      HeroHeadline.tsx
      IdentityName.tsx
      Portrait.tsx
      IntroDescription.tsx
      PageFooter.tsx
      ScrollIndicator.tsx

    animation
      TextReveal.tsx
      MaskReveal.tsx
      PageTransition.tsx

  data
    navigation.ts
    socialLinks.ts

  lib
    gsap.ts
    animationConfig.ts

  hooks
    useReducedMotion.ts
```

Rules:

1. Keep component responsibilities small and clear.

2. Store navigation and social link data separately from presentation components.

3. Store repeated project content inside data files.

4. Use semantic HTML.

5. Use client components only when interaction or GSAP requires them.

6. Avoid duplicated content.

7. Do not place the entire homepage inside one oversized component.

8. Do not mix content data, animation configuration, and presentation logic in one file.

9. Prefer typed props and explicit TypeScript interfaces.

10. Avoid unnecessary abstraction for elements that are used only once.

## 11. GSAP Rules

GSAP is the primary and only animation engine.

Before adding animation:

1. Finish the static layout.

2. Compare it with the Figma reference.

3. Receive approval for the visual structure.

Implementation rules:

1. Use `useGSAP` inside React client components.

2. Scope animations to a component container.

3. Register plugins before using them.

4. Use GSAP timelines for ordered sequences.

5. Do not use `setTimeout` to coordinate animation timing.

6. Clean up animations when components unmount.

7. Prefer transform, opacity, and clip path.

8. Avoid animating width, height, top, and left unless required.

9. Do not allow multiple timelines to control the same property on the same element.

10. Keep essential content readable when JavaScript is unavailable.

11. Respect `prefers-reduced-motion`.

12. Replace large movement with short opacity transitions when reduced motion is enabled.

13. Do not block navigation while decorative animations are running.

14. Keep the primary homepage entrance sequence below three seconds.

## 12. Planned Homepage Entrance Sequence

Do not implement this sequence until the static frame has been approved.

The planned order is:

1. Reveal the page frame.

2. Reveal navigation and footer.

3. Reveal section metadata.

4. Reveal the main headline line by line.

5. Reveal the full name line by line.

6. Reveal the portrait using a mask or clip path.

7. Reveal the introduction.

8. Reveal the scroll indicator.

The transition from the splash screen must feel continuous rather than like two unrelated pages.

Do not replay the full splash sequence during internal navigation within the same session.

## 13. Accessibility Rules

1. Use semantic landmarks.

2. Provide visible keyboard focus states.

3. Ensure links are keyboard accessible.

4. Provide descriptive alternative text.

5. Maintain readable contrast.

6. Do not hide essential information behind hover.

7. Respect reduced motion preferences.

8. Avoid motion that may cause discomfort.

9. Keep text selectable.

10. Use buttons for actions and links for navigation.

## 14. Performance Rules

1. Use optimized image formats.

2. Provide explicit image dimensions.

3. Avoid oversized source images when smaller versions are sufficient.

4. Avoid unnecessary client components.

5. Avoid unnecessary state.

6. Avoid repeated animation calculations on every render.

7. Do not load animation plugins on pages that do not use them.

8. Do not add autoplay video without approval.

9. Prevent layout shift during font and image loading.

10. Use production builds to verify implementation when possible.

## 15. Code Quality Rules

1. Use TypeScript consistently.

2. Keep naming clear and descriptive.

3. Remove unused imports and dead code.

4. Do not suppress TypeScript errors without a documented reason.

5. Do not disable lint rules to bypass a problem.

6. Add comments only where intent is not obvious.

7. Keep formatting consistent.

8. Do not duplicate utility class groups unnecessarily.

9. Do not create deeply nested component trees without a clear need.

10. Do not modify unrelated files during a focused task.

## 16. Current Static Slicing Acceptance Criteria

The initial desktop slicing is complete only when all of the following are true:

1. The implementation closely matches the exported Figma frame.

2. The target viewport is 1440 by 900 pixels.

3. Navigation alignment matches the reference.

4. Headline size, line breaks, and position match the reference.

5. Full name size, line breaks, and position match the reference.

6. Portrait placement and proportions match the reference.

7. Introduction placement matches the reference.

8. Footer alignment matches the reference.

9. The page frame is visually consistent on all sides.

10. Typography and colors use approved design tokens.

11. There is no horizontal overflow.

12. The browser console contains no errors.

13. Linting passes.

14. No animation is added during the static slicing task.

15. Remaining visual differences are reported honestly.

## 17. Validation Process

After implementation:

1. Run the development server.

2. Open the page at the target viewport.

3. Capture a browser screenshot.

4. Compare it with the exported Figma frame.

5. Check typography.

6. Check line breaks.

7. Check spacing.

8. Check image proportions.

9. Check border thickness.

10. Check alignment.

11. Check horizontal and vertical overflow.

12. Check the browser console.

13. Run linting.

14. Run a production build when the environment supports it.

15. Correct visible differences before declaring the task complete.

Do not claim pixel accuracy unless the result was actually compared at the same viewport.

## 18. Completion Report

After completing a task, report:

1. Files created

2. Files modified

3. Components implemented

4. Commands executed

5. Viewports tested

6. Validation results

7. Remaining differences from Figma

8. Known limitations

9. Recommended next task

Do not claim that a test passed unless it was actually executed.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
