interface ProjectSummaryProps {
  category: string;
  description: string;
  className?: string;
}

export default function ProjectSummary({
  category,
  description,
  className = "",
}: ProjectSummaryProps) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-y-2 sm:gap-y-4 gap-x-8 items-start w-full ${className}`}>
      {/* Lower Left Area — Project Category */}
      <div className="lg:col-span-4 works-animate-category">
        <h3 className="text-sm sm:text-xl lg:text-2xl font-bold leading-tight text-base-dark tracking-normal uppercase whitespace-pre-line">
          {category}
        </h3>
      </div>

      {/* Lower Right Area — Project Description */}
      <div className="lg:col-span-8 works-animate-description">
        <p className="text-xs sm:text-base lg:text-lg font-normal leading-relaxed text-base-normal tracking-normal max-w-2xl">
          {description}
        </p>
      </div>
    </div>
  );
}
