import Image from "next/image";

interface TechIconProps {
  name: string;
  src: string;
  /** Size of the white container in px (default 48). */
  size?: number;
  className?: string;
}

/**
 * White rounded icon container with technology logo inside.
 * Matches the Figma icon treatment: white bg, rounded-xl, centered SVG.
 */
export default function TechIcon({
  name,
  src,
  size = 48,
  className = "",
}: TechIconProps) {
  const iconSize = Math.round(size * 0.58);

  return (
    <div
      className={`flex items-center justify-center bg-white rounded-xl shrink-0 ${className}`}
      style={{ width: size, height: size }}
      title={name}
      data-tech-icon={name}
    >
      <Image
        src={src}
        alt={name}
        width={iconSize}
        height={iconSize}
        className="object-contain"
        style={{ width: iconSize, height: iconSize }}
      />
    </div>
  );
}
