import Image from "next/image";
import type { ProjectSlideData } from "@/data/sumberAgungTransSlides";
import ProjectIdentity from "./ProjectIdentity";

interface ProjectShowcaseProps {
  data: ProjectSlideData;
  webAlt: string;
  mobileAlt: string;
  preloadWebImage?: boolean;
}

/** Shared visual shell for the first two project-detail slides. */
export default function ProjectShowcase({
  data,
  webAlt,
  mobileAlt,
  preloadWebImage = false,
}: ProjectShowcaseProps) {
  return (
    <div className="sat-showcase flex flex-col justify-between h-full min-h-0 overflow-y-auto overflow-x-hidden gap-y-3 px-4 pt-4 pb-10 sm:px-8 sm:pt-6 sm:pb-12 lg:grid lg:grid-rows-[auto_minmax(0,1fr)_auto] lg:gap-y-3 lg:px-11 lg:pt-8 lg:pb-14 lg:overflow-hidden box-border">
      <div className="shrink-0">
        <ProjectIdentity />
      </div>

      {data.images ? (
        <div className="sat-showcase-media shrink-0 flex items-center justify-center gap-3 sm:gap-6 lg:gap-10 py-2 my-auto w-full">
          <div className="flex items-center justify-end max-w-[65%] sm:max-w-full">
            <Image
              src={data.images.web}
              alt={webAlt}
              width={data.images.webWidth}
              height={data.images.webHeight}
              sizes="(max-width: 639px) 60vw, (max-width: 1279px) 56vw, 760px"
              className="w-auto h-auto max-h-[150px] xs:max-h-[175px] sm:max-h-[250px] lg:max-h-[390px] object-contain drop-shadow-md"
              preload={preloadWebImage}
            />
          </div>
          <div className="flex items-center justify-start shrink-0">
            <Image
              src={data.images.mobile}
              alt={mobileAlt}
              width={data.images.mobileWidth}
              height={data.images.mobileHeight}
              sizes="(max-width: 639px) 22vw, 190px"
              className="w-auto h-auto max-h-[140px] xs:max-h-[165px] sm:max-h-[240px] lg:max-h-[360px] max-w-[22vw] sm:max-w-[190px] object-contain drop-shadow-md"
            />
          </div>
        </div>
      ) : null}

      <div className="sat-showcase-details shrink-0 w-full pt-1">
        <h2 className="mb-1.5 text-sm font-bold uppercase leading-[1.3] text-white sm:text-lg lg:text-xl">
          {data.sectionTitle}
        </h2>
        <div className="grid grid-cols-1 gap-y-2 sm:grid-cols-2 sm:gap-x-10 xl:gap-x-24">
          <p
            className="max-w-[570px] text-xs font-normal leading-[1.5] sm:text-sm"
            style={{ color: "var(--color-text-light-secondary)" }}
          >
            {data.leftDescription}
          </p>
          <p
            className="max-w-[570px] text-xs font-normal leading-[1.5] sm:text-sm"
            style={{ color: "var(--color-text-light-secondary)" }}
          >
            {data.rightDescription}
          </p>
        </div>
      </div>
    </div>
  );
}
