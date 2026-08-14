import Image from "next/image";

interface ProjectVisualProps {
  laptopMockup: string;
  mobileMockup: string;
  title: string;
  className?: string;
}

export default function ProjectVisual({
  laptopMockup,
  mobileMockup,
  title,
  className = "",
}: ProjectVisualProps) {
  return (
    <div
      className={`relative flex items-center justify-center gap-3 sm:gap-6 lg:gap-8 mx-auto w-full max-w-full ${className}`}
    >
      {/* Laptop Mockup Wrapper */}
      <div className="relative w-[180px] xs:w-[210px] sm:w-[280px] lg:w-auto lg:h-full lg:max-h-[380px] shrink-0 z-10 works-animate-laptop">
        <Image
          src={laptopMockup}
          alt={`${title} dashboard laptop mockup`}
          width={3436}
          height={2076}
          className="w-full h-auto lg:h-full lg:w-auto object-contain drop-shadow-md"
          priority
        />
      </div>

      {/* Smartphone Mockup Wrapper */}
      <div className="relative w-[55px] xs:w-[65px] sm:w-[85px] lg:w-auto lg:h-full lg:max-h-[380px] shrink-0 z-20 works-animate-mobile">
        <Image
          src={mobileMockup}
          alt={`${title} mobile app mockup`}
          width={604}
          height={1172}
          className="w-full h-auto lg:h-full lg:w-auto object-contain drop-shadow-lg"
          priority
        />
      </div>
    </div>
  );
}
