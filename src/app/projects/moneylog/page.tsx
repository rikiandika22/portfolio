import { Metadata } from "next";
import { MONEYLOG_PROJECT_IDENTITY, MONEYLOG_SLIDE_01 } from "@/data/moneyLogSlides";
import ProjectDetailPage from "./ProjectDetailPage";

export const metadata: Metadata = {
  title: `${MONEYLOG_PROJECT_IDENTITY.name} | Riki Andika Portfolio`,
  description: MONEYLOG_SLIDE_01.leftDescription,
};

export default function MoneyLogDetailPage() {
  return <ProjectDetailPage />;
}
