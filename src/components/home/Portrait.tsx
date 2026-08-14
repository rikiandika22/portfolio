import Image from "next/image";

export default function Portrait() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Wrapper container for image and Figma selection-style overlay */}
      <div className="relative inline-block">
        {/* Profile image asset */}
        <Image
          src="/images/profile/profile_photo.webp"
          alt="Portrait of Riki Andika Khusna Saputra"
          width={240}
          height={360}
          className="block object-cover object-top w-[120px] sm:w-[160px] lg:w-[240px] h-auto"
          priority
        />

        {/* Figma Selection-Style Blue Outline Overlay (2px thickness with gap) */}
        <div
          className="absolute -inset-2 sm:-inset-2.5 lg:-inset-3 pointer-events-none z-10"
          style={{
            borderColor: "var(--color-accent-primary, #2196F3)",
            borderWidth: "2px",
            borderStyle: "solid",
          }}
        >
          {/* Top-left corner handle marker */}
          <div
            className="absolute -top-1.5 -left-1.5 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-page-background shadow-xs"
            style={{
              borderColor: "var(--color-accent-primary, #2196F3)",
              borderWidth: "2px",
              borderStyle: "solid",
            }}
          />

          {/* Top-right corner handle marker */}
          <div
            className="absolute -top-1.5 -right-1.5 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-page-background shadow-xs"
            style={{
              borderColor: "var(--color-accent-primary, #2196F3)",
              borderWidth: "2px",
              borderStyle: "solid",
            }}
          />

          {/* Bottom-left corner handle marker */}
          <div
            className="absolute -bottom-1.5 -left-1.5 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-page-background shadow-xs"
            style={{
              borderColor: "var(--color-accent-primary, #2196F3)",
              borderWidth: "2px",
              borderStyle: "solid",
            }}
          />

          {/* Bottom-right corner handle marker */}
          <div
            className="absolute -bottom-1.5 -right-1.5 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-page-background shadow-xs"
            style={{
              borderColor: "var(--color-accent-primary, #2196F3)",
              borderWidth: "2px",
              borderStyle: "solid",
            }}
          />
        </div>
      </div>
    </div>
  );
}
