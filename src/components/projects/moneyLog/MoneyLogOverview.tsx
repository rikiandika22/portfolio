import Image from "next/image";
import type { MoneyLogSlideData } from "@/data/moneyLogSlides";
import MoneyLogProjectIdentity from "./MoneyLogProjectIdentity";

interface MoneyLogOverviewProps {
  data: MoneyLogSlideData;
}

/**
 * Slide 01 — MoneyLog Overview.
 * Displays web dashboard interface screenshot, project identity, and overview copy.
 * Matches: docs/references/figma/works/moneylog/overview.png
 */
export default function MoneyLogOverview({ data }: MoneyLogOverviewProps) {
  return (
    <div className="moneylog-overview flex flex-col justify-between h-full min-h-0 overflow-y-auto overflow-x-hidden gap-y-3 px-4 pt-4 pb-10 sm:px-8 sm:pt-6 sm:pb-12 lg:grid lg:grid-rows-[auto_minmax(0,1fr)_auto] lg:gap-y-3 lg:px-11 lg:pt-8 lg:pb-14 lg:overflow-hidden box-border">
      {/* Top Project Identity */}
      <div className="shrink-0">
        <MoneyLogProjectIdentity />
      </div>

      {/* Main Production Visual: MoneyLog Web Dashboard Interface */}
      <div className="moneylog-showcase-media shrink-0 flex items-center justify-center py-2 my-auto w-full">
        <div className="flex items-center justify-center max-w-full">
          <Image
            src={data.image.src}
            alt="MoneyLog personal finance tracking web application dashboard interface"
            width={data.image.width}
            height={data.image.height}
            sizes="(max-width: 639px) 88vw, (max-width: 1279px) 80vw, 860px"
            priority
            className="w-auto h-auto max-h-[160px] xs:max-h-[185px] sm:max-h-[260px] lg:max-h-[410px] max-w-full rounded-lg object-contain drop-shadow-md"
          />
        </div>
      </div>

      {/* Overview Details Section */}
      <div className="moneylog-showcase-details shrink-0 w-full pt-1">
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
