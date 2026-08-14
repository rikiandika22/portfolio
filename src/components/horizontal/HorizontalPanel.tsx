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
  const defaultPadding = noPadding
    ? {}
    : {
        paddingInline: "var(--page-padding-inline)",
        paddingTop: "calc(var(--page-padding-block) + 3.5rem)",
        paddingBottom: "calc(var(--page-padding-block) + 3.5rem)",
      };

  return (
    <section
      id={id}
      data-panel-id={id}
      className={`w-screen min-w-[100vw] h-full flex-shrink-0 relative box-border overflow-hidden bg-page-background ${className}`}
      style={{
        background: "var(--color-page-background, #F1EFE9)",
        ...defaultPadding,
        ...style,
      }}
    >
      {children}
    </section>
  );
}
