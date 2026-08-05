# Portfolio Design System

## 1. Purpose

This document defines the visual rules for the portfolio website of Riki Andika Khusna Saputra.

The approved Figma style guide is the primary source of truth for typography, color, spacing, and visual hierarchy.

Every AI agent or developer must read this document before implementing or modifying the interface.

Do not estimate values from screenshots when an exact Figma value is available.

## 2. Source of Truth

Primary design source:

Figma style guide

Reference folder:

`docs/references/figma/style_guide`

Implementation files:

`src/app/globals.css`

`src/lib/fonts.ts`

Priority when values conflict:

1. Latest approved Figma value
2. This document
3. Existing implementation tokens
4. Framework defaults

## 3. Font Family

Primary font:

`Cohabited`

Fallback stack:

`Arial, Helvetica, sans-serif`

Load the font through `next/font/local` when licensed web font files are available.

Recommended location:

```text
src
  app
    fonts
      Cohabited_Thin.woff2
      Cohabited_Regular.woff2
      Cohabited_SemiBold.woff2
      Cohabited_Bold.woff2
      Cohabited_ExtraBold.woff2
```

Do not publish or commit font files unless the license allows web embedding and repository distribution.

## 4. Font Weights

| Token | Weight | Usage |
|---|---:|---|
| thin | 100 | Decorative and oversized editorial text |
| regular | 400 | Body copy, navigation, and standard headings |
| semibold | 600 | Metadata, labels, and emphasized interface text |
| bold | 700 | Strong headings and important actions |
| extrabold | 800 | High emphasis display text when approved in Figma |

Do not create or simulate additional font weights.

## 5. Typography Scale

| Token | Font Size | Line Height |
|---|---:|---:|
| xs | 12px | 125% |
| sm | 14px | 125% |
| base | 16px | 150% |
| lg | 18px | 150% |
| xl | 20px | 150% |
| 2xl | 24px | 150% |
| 3xl | 30px | 125% |
| 4xl | 36px | 125% |
| 5xl | 48px | 100% |
| 6xl | 60px | 100% |
| 7xl | 72px | 100% |
| 8xl | 96px | 100% |
| 9xl | 128px | 100% |

Letter spacing must follow the exact Figma text style.

Use `0em` only when Figma does not define a different value.

Do not use arbitrary font sizes when an existing token can represent the design.

## 6. Typography Roles

### Hero Display

Token:

`9xl`

Weight:

`regular`

Line height:

`100%`

Use for:

`DESIGN MINDED`

`DEVELOPER`

A responsive `clamp()` value is allowed, but the maximum desktop value must remain `128px`.

### Identity Display

Token:

`8xl`

Weight:

`regular`

Line height:

`100%`

Use for:

`RIKI`

`ANDIKA`

`KHUSNA`

`SAPUTRA`

### Navigation

Token:

`lg`

Weight:

`regular`

### Body Copy

Token:

`base`

Weight:

`regular`

Line height:

`150%`

### Metadata and Caption

Token:

`xs` or `sm`

Weight:

`regular` or `semibold`

The exact approved Figma frame remains authoritative.

## 7. Background Color

| Token | Hex | RGB |
|---|---|---|
| background_color | `#F1EFE9` | `rgb(241, 239, 233)` |

Use this color as the main page background.

## 8. Base Color Palette

| Token | Hex | RGB |
|---|---|---|
| base_lighter | `#B2BBC6` | `rgb(178, 187, 198)` |
| base_light_hover | `#A3ADBB` | `rgb(163, 173, 187)` |
| base_light_active | `#909DAD` | `rgb(144, 157, 173)` |
| base_normal | `#546881` | `rgb(84, 104, 129)` |
| base_normal_hover | `#47586E` | `rgb(71, 88, 110)` |
| base_normal_active | `#3D4C5E` | `rgb(61, 76, 94)` |
| base_dark | `#1D242D` | `rgb(29, 36, 45)` |
| base_dark_hover | `#151A20` | `rgb(21, 26, 32)` |
| base_dark_active | `#090B0E` | `rgb(9, 11, 14)` |

## 9. Main Blue Palette

| Token | Hex | RGB |
|---|---|---|
| main_blue_50 | `#E9F5FE` | `rgb(233, 245, 254)` |
| main_blue_100 | `#BADEFB` | `rgb(186, 222, 251)` |
| main_blue_200 | `#99CFF9` | `rgb(153, 207, 249)` |
| main_blue_300 | `#6AB9F7` | `rgb(106, 185, 247)` |
| main_blue_400 | `#4DABF5` | `rgb(77, 171, 245)` |
| main_blue_500 | `#2196F3` | `rgb(33, 150, 243)` |
| main_blue_600 | `#1E89DD` | `rgb(30, 137, 221)` |
| main_blue_700 | `#176BAD` | `rgb(23, 107, 173)` |
| main_blue_800 | `#125386` | `rgb(18, 83, 134)` |
| main_blue_900 | `#0E3F66` | `rgb(14, 63, 102)` |

## 10. Semantic Color Tokens

| Semantic Token | Value | Purpose |
|---|---|---|
| page_background | `#F1EFE9` | Main page surface |
| text_primary | `#1D242D` | Main headline, full name, and primary body copy |
| text_secondary | `#546881` | Navigation and secondary text |
| text_muted | `#909DAD` | Supporting information |
| accent_primary | `#2196F3` | Highlighted text and primary accent |
| accent_hover | `#1E89DD` | Hover state |
| accent_active | `#176BAD` | Active state |
| border_subtle | `#B2BBC6` | Subtle dividers and borders |
| surface_soft_blue | `#E9F5FE` | Light accent surface |
| page_frame | `FILL_FROM_FIGMA` | Soft pink outer frame |

The exact `page_frame` value must still be copied from the approved Figma frame.

## 11. Color Usage Rules

1. Use `page_background` for the main page surface.
2. Use `text_primary` for the main headline and full name.
3. Use `text_secondary` for secondary navigation and descriptive content.
4. Use `text_muted` only for supporting information.
5. Use `accent_primary` only where the approved design applies emphasis.
6. Use `page_frame` for the soft pink outer border.
7. Do not create additional blue shades.
8. Do not write raw hexadecimal values inside React components.
9. Do not add gradients unless an approved frame contains them.
10. Maintain readable contrast.

## 12. Layout Foundation

Desktop reference viewport:

`1440px by 900px`

Primary layout:

`12 column CSS Grid`

Use Grid for major composition.

Use Flexbox for local alignment.

Complete these values from Figma before the final slicing pass:

| Layout Token | Exact Value |
|---|---|
| page_frame_width | `FILL_FROM_FIGMA` |
| page_padding_inline | `FILL_FROM_FIGMA` |
| page_padding_block | `FILL_FROM_FIGMA` |
| grid_gap | `FILL_FROM_FIGMA` |
| section_gap | `FILL_FROM_FIGMA` |
| content_max_width | `FILL_FROM_FIGMA` |

Do not use absolute positioning for the complete page layout.

## 13. Spacing Scale

| Token | Value |
|---|---:|
| space_1 | 4px |
| space_2 | 8px |
| space_3 | 12px |
| space_4 | 16px |
| space_5 | 20px |
| space_6 | 24px |
| space_8 | 32px |
| space_10 | 40px |
| space_12 | 48px |
| space_16 | 64px |
| space_20 | 80px |
| space_24 | 96px |

Use this scale unless the approved Figma frame requires a documented exception.

## 14. Border and Radius Rules

The portfolio uses an editorial layout rather than a generic card based interface.

Default radius:

`0px`

Use rounded corners only where they exist in Figma.

Do not add generic shadows, borders, or rounded containers.

## 15. Image Rules

1. Use WebP for photographs and project screenshots when appropriate.
2. Use SVG for icons and technology logos.
3. Use Next Image for raster assets.
4. Preserve crop and aspect ratio.
5. Provide explicit width and height.
6. Do not stretch images.
7. Provide meaningful alternative text.
8. Do not render the exported Figma frame as the page.

## 16. Motion Rules

GSAP is the only animation engine.

Do not add animation before the static implementation matches the approved Figma frame.

Preferred properties:

`transform`

`opacity`

`clip-path`

Respect `prefers-reduced-motion`.

Reduced motion must replace large movement with short opacity transitions.

## 17. Token Implementation

Expose tokens through global CSS variables and Tailwind utilities.

Recommended semantic variables:

```text
font_cohabited

color_page_background

color_text_primary

color_text_secondary

color_text_muted

color_accent_primary

color_accent_hover

color_accent_active

color_border_subtle

color_surface_soft_blue

color_page_frame
```

React components must use token based classes.

Avoid arbitrary values such as:

```text
text_[73px]

bg_[#123456]

p_[27px]
```

Use arbitrary values only when an approved Figma measurement cannot be represented by an existing token.

## 18. Validation Checklist

Before declaring a visual task complete:

1. Confirm the font family.
2. Confirm font license.
3. Confirm font weights.
4. Confirm font sizes.
5. Confirm line heights.
6. Confirm letter spacing.
7. Confirm exact colors.
8. Confirm semantic color mappings.
9. Confirm spacing and grid values.
10. Confirm image proportions.
11. Confirm page frame thickness.
12. Compare the browser result with Figma at the same viewport.
13. Confirm that no raw hexadecimal value appears inside components.
14. Confirm that no arbitrary typography value was added without reason.
15. Report remaining differences honestly.

## 19. Remaining Figma Values

The following values still need to be copied from Figma:

1. Exact soft pink `page_frame` color
2. Exact letter spacing for every text style
3. Exact homepage frame border width
4. Exact horizontal page padding
5. Exact vertical page padding
6. Exact primary grid gap
7. Exact portrait dimensions
8. Exact homepage typography assignment
9. Confirmation that the Cohabited font license allows web use
