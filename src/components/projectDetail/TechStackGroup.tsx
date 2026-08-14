import TechIcon from "./TechIcon";
import type { TechStackIcon } from "@/data/sumberAgungTransSlides";

interface TechStackGroupProps {
  category: string;
  icons: TechStackIcon[];
  description: string;
  className?: string;
}

/**
 * Individual tech category group in the expanded Tech Stack layout.
 * Shows category heading, icon row, and description.
 */
export default function TechStackGroup({
  category,
  icons,
  description,
  className = "",
}: TechStackGroupProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <h4 className="tech-group-copy text-lg font-bold leading-[1.3] text-white">
        {category}
      </h4>
      <div className="flex items-center gap-3">
        {icons.map((icon) => (
          <TechIcon key={icon.name} name={icon.name} src={icon.src} size={56} />
        ))}
      </div>
      <p
        className="tech-group-copy max-w-[300px] text-sm font-normal leading-[1.45]"
        style={{ color: "var(--color-text-light-secondary)" }}
      >
        {description}
      </p>
    </div>
  );
}
