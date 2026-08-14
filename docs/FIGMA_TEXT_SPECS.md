# Figma Text Specifications

## 1. Purpose

This document defines the exact typography specifications for persistent navigation and footer elements in the portfolio website.

Use this document together with:

`AGENTS.md`

`docs/DESIGN_SYSTEM.md`

The Figma Design panel is the source of truth for the values recorded here.

Do not estimate typography values from screenshots when a value is already documented in this file.

## 2. Reference

Reference frame width:

`1440px`

Primary font family:

`Cohabited`

Primary dark color token:

`base_dark`

Primary dark color value:

`#1D242D`

Secondary navigation color token:

`base_normal`

Secondary navigation color value:

`#546881`

Default letter spacing:

`0px`

## 3. Navigation Brand

Content:

`Riki Andika`

Layer name:

`navigation.brand`

Font family:

`Cohabited`

Font style:

`SemiBold`

Font weight:

`600`

Font size:

`24px`

Line height:

`150%`

Calculated line height:

`36px`

Letter spacing:

`0px`

Text alignment:

`Left`

Color token:

`base_dark`

Color value:

`#1D242D`

Text box width:

`117px`

Text box height:

`36px`

Figma desktop position:

`X 30px`

`Y 15px`

Implementation note:

Use the Figma position only as a visual validation reference. Implement the navigation using a stable three column layout rather than absolute positioning.

## 4. Navigation Menu

Content:

`Works About Contacts`

Layer name:

`navigation.menu`

Font family:

`Cohabited`

Font style:

`SemiBold`

Font weight:

`600`

Font size:

`24px`

Line height:

`150%`

Calculated line height:

`36px`

Letter spacing:

`0px`

Text alignment:

`Center`

Color token:

`base_normal`

Color value:

`#546881`

Text box width:

`242px`

Text box height:

`36px`

Figma desktop position:

`X 578px`

`Y 15px`

Implementation note:

Keep the navigation group visually centered within the viewport. Do not center it only within the remaining space after the brand.

## 5. Navigation Social Links

Content:

`Github Linkedin Email`

Layer name:

`navigation.social`

Font family:

`Cohabited`

Font style:

`SemiBold`

Font weight:

`600`

Font size:

`20px`

Line height:

`150%`

Calculated line height:

`30px`

Letter spacing:

`0px`

Text alignment:

`Right`

Color token:

`base_dark`

Color value:

`#1D242D`

Text box width:

`188px`

Text box height:

`29px`

Figma desktop position:

`X 1222px`

`Y 15px`

Implementation note:

The Figma text box height is shown as `29px`, while the calculated line height is `30px`. Use `30px` or `1.5` line height in development.

## 6. Footer Copyright

Content:

`© 2026 Portfolio`

Layer name:

`footer.copyright`

Text style:

`Cohabited Bold XL`

Font family:

`Cohabited`

Font style:

`Bold`

Font weight:

`700`

Font size:

`20px`

Line height:

`150%`

Calculated line height:

`30px`

Letter spacing:

`0px`

Text alignment:

`Left`

Color token:

`base_dark`

Color value:

`#1D242D`

Text box width:

`158px`

Text box height:

`30px`

Implementation note:

Keep this text aligned to the left side of the persistent footer.

## 7. Footer Credit

Content:

`Design & Code by Riki Andika`

Layer name:

`footer.credit`

Text style:

`Cohabited Bold XL`

Font family:

`Cohabited`

Font style:

`Bold`

Font weight:

`700`

Font size:

`20px`

Line height:

`150%`

Calculated line height:

`30px`

Letter spacing:

`0px`

Text alignment:

`Right`

Color token:

`base_dark`

Color value:

`#1D242D`

Text box width:

`271px`

Text box height:

`30px`

Figma desktop position:

`X 1106px`

`Y 0px`

Implementation note:

Use the Figma position only for validation. Keep the footer credit aligned to the right through layout rules rather than absolute positioning.

## 8. Typography Mapping Summary

| Element | Font style | Weight | Size | Line height | Color token |
|---|---|---:|---:|---:|---|
| Navigation brand | SemiBold | 600 | 24px | 150% | base_dark |
| Navigation menu | SemiBold | 600 | 24px | 150% | base_normal |
| Navigation social links | SemiBold | 600 | 20px | 150% | base_dark |
| Footer copyright | Bold | 700 | 20px | 150% | base_dark |
| Footer credit | Bold | 700 | 20px | 150% | base_dark |

## 9. Recommended Layout

Use the following grid structure for both navigation and footer:

```css
grid-template-columns: 1fr auto 1fr;
```

Navigation alignment:

```text
Brand: left

Menu: center

Social links: right
```

Footer alignment:

```text
Copyright: left

Progress indicator: center

Credit: right
```

Do not use the recorded X positions as fixed CSS coordinates.

## 10. Tailwind Mapping

Recommended classes for the navigation brand:

```text
font-semibold

text-2xl

leading-[1.5]

text-base-dark
```

Recommended classes for the navigation menu:

```text
font-semibold

text-2xl

leading-[1.5]

text-base-normal
```

Recommended classes for the social links:

```text
font-semibold

text-xl

leading-[1.5]

text-base-dark
```

Recommended classes for both footer text elements:

```text
font-bold

text-xl

leading-[1.5]

text-base-dark
```

The exact class names may differ depending on the token implementation in `globals.css`.

## 11. Validation Rules

Before declaring the navigation and footer complete:

1. Confirm that Cohabited is the computed font family.

2. Confirm that the brand and center menu render at `24px`.

3. Confirm that social links render at `20px`.

4. Confirm that footer text renders at `20px`.

5. Confirm that navigation uses weight `600`.

6. Confirm that footer text uses weight `700`.

7. Confirm that the center menu uses `base_normal`.

8. Confirm that other persistent text uses `base_dark`.

9. Confirm that the center navigation remains visually centered.

10. Confirm that the navigation and footer remain stationary during horizontal homepage scrolling.

11. Confirm that the persistent elements do not overlap panel content.

12. Confirm that no raw hexadecimal color is written inside React components.

## 12. Remaining Text Specifications

The following typography specifications still need to be documented separately:

1. Homepage section number

2. Homepage metadata

3. Homepage main headline

4. Homepage identity name

5. Homepage introduction

6. Works page title

7. Project card title and description

8. About page typography

9. Contact page typography

10. Project detail typography

## 13. Homepage Section Number

Content:

`01/`

Layer name:

`homepage.section_number`

Font family:

`Cohabited`

Font style:

`SemiBold`

Font weight:

`600`

Font size:

`24px`

Line height:

`150%`

Calculated line height:

`36px`

Letter spacing:

`0px`

Text alignment:

`Left`

Color token:

`base_dark_active`

Color value:

`#090B0E`

Reference text box width:

`27px`

Reference text box height:

`36px`

Implementation note:

Use the exact font weight and size above. The text box dimensions are references for visual validation and must not be used as fixed layout constraints when they cause clipping.

## 14. Homepage Location Metadata

Content:

`BASED IN YOGYAKARTA`

`BUILDING WITH LOVE`

Layer name:

`homepage.location_metadata`

Font family:

`Cohabited`

Font style:

`ExtraBold`

Font weight:

`800`

Font size:

`20px`

Line height:

`150%`

Calculated line height:

`30px`

Letter spacing:

`0px`

Text alignment:

`Left`

Color token:

`base_dark`

Color value:

`#1D242D`

Reference text box width:

`241px`

Reference text box height:

`54px`

Implementation note:

Preserve the two approved lines. Use normal document flow and an explicit line break. Do not reduce the font weight to simulate a smaller visual footprint.

## 15. Homepage Introduction Text

Content shown in the Figma reference:

`I BASED IN SLEMAN, YOGYAKRTA.`

`PASSIONATE IN FRONTEND, UI UX,`

`AND GRAPHIC DESIGN`

Approved website content may differ according to `AGENTS.md`.

Layer name:

`homepage.introduction`

Font family:

`Cohabited`

Font style:

`Bold`

Font weight:

`700`

Font size:

`20px`

Line height:

`150%`

Calculated line height:

`30px`

Letter spacing:

`0px`

Text alignment:

`Left`

Color token:

`base_dark`

Color value:

`#1D242D`

Reference text box width:

`322px`

Reference text box height:

`89px`

Implementation note:

Use the approved copy from `AGENTS.md`, but preserve this typography specification. The final text wrapping may differ when the approved copy is longer. Control wrapping through the text container width rather than decreasing font size.

## 16. Homepage Introduction Arrow

Element:

Arrow pointing upward and to the right

Layer name:

`homepage.introduction_arrow`

Recommended implementation:

Custom inline SVG or a configurable icon component

Recommended icon box:

`32px × 32px`

Recommended stroke width:

`3.2px`

Recommended stroke line cap:

`Square`

Recommended stroke line join:

`Miter`

Color token:

`base_dark`

Color value:

`#1D242D`

Alignment:

Align the arrow with the first line of the introduction text.

Implementation note:

An icon does not use CSS font weight. Match the visual weight of the `700` introduction text through the SVG stroke width.

Start with a `32px` icon and `3.2px` stroke. If browser comparison shows that the icon appears heavier than the text, reduce the stroke to `3px`. If it appears lighter, increase it to `3.4px`.

Do not use a thin default icon stroke such as `1.5px` or `2px`.

Do not use a text glyph when its weight cannot be controlled consistently across browsers.

Recommended layout:

```css
display: grid;
grid-template-columns: 32px minmax(0, 322px);
column-gap: 20px;
align-items: start;
```

Recommended SVG principle:

```tsx
<svg
  width="32"
  height="32"
  viewBox="0 0 32 32"
  fill="none"
  aria-hidden="true"
>
  <path
    d="M8 24L24 8M12 8H24V20"
    stroke="currentColor"
    strokeWidth="3.2"
    strokeLinecap="square"
    strokeLinejoin="miter"
  />
</svg>
```

## 17. Updated Homepage Typography Mapping

| Element | Font style | Weight | Size | Line height | Color token |
|---|---|---:|---:|---:|---|
| Section number | SemiBold | 600 | 24px | 150% | base_dark_active |
| Location metadata | ExtraBold | 800 | 20px | 150% | base_dark |
| Introduction text | Bold | 700 | 20px | 150% | base_dark |
| Introduction arrow | SVG stroke | Visual match to 700 | 32px box | Not applicable | base_dark |

## 18. Homepage Validation Rules

Before declaring these homepage elements complete:

1. Confirm that the section number renders with Cohabited SemiBold at `24px`.

2. Confirm that the location metadata renders with Cohabited ExtraBold at `20px`.

3. Confirm that the introduction renders with Cohabited Bold at `20px`.

4. Confirm that every text element uses a `150%` line height.

5. Confirm that the approved website copy is used even when the Figma reference contains an older sentence.

6. Confirm that the arrow uses the same `base_dark` color as the introduction.

7. Confirm that the arrow visually matches the weight of the Bold introduction text.

8. Confirm that the arrow is aligned with the first text line.

9. Confirm that the arrow and introduction remain grouped during horizontal scrolling.

10. Confirm that no thin default icon stroke remains.

11. Compare the result with Figma at the same desktop viewport.

12. Report any remaining visual weight difference between the arrow and text.

## 19. Remaining Homepage Text Specifications

The following values are still not documented from an exact selected Figma layer:

1. Main headline typography

2. Full identity name typography

3. Final approved introduction text box width after copy replacement
