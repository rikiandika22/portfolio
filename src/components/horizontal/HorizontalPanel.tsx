import { CSSProperties, ReactNode } from "react";

interface HorizontalPanelProps {
  id: string;
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
  style?: CSSProperties;
}

export default function HorizontalPanel({
  id,
  children,
  className = "",
  noPadding = false,
  style = {},
}: HorizontalPanelProps) {
  // Mobile specific padding and min-height (100svh)
  const mobileStyle: CSSProperties = noPadding
    ? {
        minHeight: "100svh",
      }
    : id === "home"
    ? {
        paddingTop: "calc(var(--page-padding-block) + 3.5rem)",
        paddingBottom: "calc(var(--page-padding-block) + 2.5rem)",
        paddingInline: "var(--page-padding-inline)",
        minHeight: "100svh",
      }
    : id === "works"
    ? {
        paddingTop: "calc(var(--page-padding-block) + 3.5rem)",
        paddingBottom: "calc(var(--page-padding-block) + 3.5rem)",
        paddingInline: "var(--page-padding-inline)",
        minHeight: "100svh",
        height: "auto",
      }
    : id === "about"
    ? {
        paddingTop: "calc(var(--page-padding-block) + 3.5rem)",
        paddingBottom: "calc(var(--page-padding-block) + 3.5rem)",
        paddingInline: "var(--page-padding-inline)",
        minHeight: "100svh",
      }
    : id === "contacts"
    ? {
        paddingTop: "calc(var(--page-padding-block) + 3.5rem)",
        paddingBottom: "calc(var(--page-padding-block) + 5.5rem)",
        paddingInline: "var(--page-padding-inline)",
        minHeight: "100svh",
      }
    : {
        paddingTop: "calc(var(--page-padding-block) + 3rem)",
        paddingBottom: "calc(var(--page-padding-block) + 3rem)",
        paddingInline: "var(--page-padding-inline)",
        minHeight: "100svh",
      };

  const desktopPadClass = noPadding ? "" : "horizontal-panel-desktop-pad";

  return (
    <section
      id={id}
      data-panel-id={id}
      className={`w-full max-w-full min-w-0 h-auto flex-shrink-0 relative box-border overflow-hidden bg-page-background lg:w-screen lg:min-w-[100vw] lg:h-full flex flex-col justify-between ${desktopPadClass} ${className}`}
      style={{
        background:
          id === "contacts"
            ? "var(--color-surface-dark-blue, #104A7B)"
            : "var(--color-page-background, #F1EFE9)",
        ...mobileStyle,
        ...style,
      }}
    >
      {children}
    </section>
  );
}
