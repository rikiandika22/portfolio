import { Metadata } from "next";
import { POS_PROJECT_IDENTITY, POS_SLIDE_01 } from "@/data/posCashierAppSlides";
import ProjectDetailPage from "./ProjectDetailPage";

export const metadata: Metadata = {
  title: `${POS_PROJECT_IDENTITY.name} | Riki Andika Portfolio`,
  description: POS_SLIDE_01.leftDescription,
};

export default function PosCashierAppDetailPage() {
  return <ProjectDetailPage />;
}
