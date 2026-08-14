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
      className={`relative flex items-center justify-center gap-2.5 sm:gap-5 lg:gap-8 mx-auto w-full h-full max-h-[160px] xs:max-h-[185px] sm:max-h-[260px] md:max-h-[320px] lg:max-h-[400px] ${className}`}
    >
      {/* Laptop Mockup Wrapper */}
      <div className="relative h-full aspect-[3436/2076] max-w-[75%] shrink flex items-center justify-center z-10 works-animate-laptop">
        <Image
          src={laptopMockup}
          alt={`${title} dashboard laptop mockup`}
          width={3436}
          height={2076}
          className="w-full h-full object-contain drop-shadow-md"
          priority
        />
      </div>

      {/* Smartphone Mockup Wrapper */}
      <div className="relative h-full aspect-[604/1172] shrink-0 flex items-center justify-center z-20 works-animate-mobile">
        <Image
          src={mobileMockup}
          alt={`${title} mobile app mockup`}
          width={604}
          height={1172}
          className="w-full h-full object-contain drop-shadow-lg"
          priority
        />
      </div>
    </div>
  );
}
