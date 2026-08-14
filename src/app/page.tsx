import { Metadata } from "next";
import HorizontalExperience from "@/components/horizontal/HorizontalExperience";

export const metadata: Metadata = {
  title: "Riki Andika — Design Minded Developer",
  description:
    "Portfolio of Riki Andika Khusna Saputra. Frontend developer, Flutter developer, and UI UX designer based in Yogyakarta.",
};

export default function Home() {
  return (
    <>
      <HorizontalExperience />
    </>
  );
}
