import { Metadata } from "next";
import { SUMBER_AGUNG_TRANS } from "@/data/projects";
import ProjectDetailPage from "./ProjectDetailPage";

export const metadata: Metadata = {
  title: `${SUMBER_AGUNG_TRANS.title} | Riki Andika Portfolio`,
  description: SUMBER_AGUNG_TRANS.description,
};

export default function SumberAgungTransDetailPage() {
  return <ProjectDetailPage />;
}
