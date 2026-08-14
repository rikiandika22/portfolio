export interface ProjectIdentity {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  route: string | null;
  thumbnail: string;
}

export interface ProjectData extends Omit<ProjectIdentity, "route"> {
  description: string;
  route: string;
  laptopMockup: string;
  mobileMockup: string;
}

export const SUMBER_AGUNG_TRANS: ProjectData = {
  id: "sumber-agung-trans",
  number: "01/",
  title: "SUMBER AGUNG TRANS",
  subtitle: "Fleet Reservation and Scheduling System",
  description:
    "Sumber Agung Trans is an integrated web and mobile system designed to simplify fleet reservations, payment management, vehicle scheduling, and driver assignments. The platform helps customers book transportation services more easily while supporting administrators in managing daily operations efficiently.",
  route: "/projects/sumber-agung-trans",
  laptopMockup: "/images/projects/sumber_agung_trans/overview/dashboard_laptop.webp",
  mobileMockup: "/images/projects/sumber_agung_trans/overview/dashboard_mobile.webp",
  thumbnail: "/images/projects/sumber_agung_trans/thumbnail.webp",
};

export const PERSONAL_PROJECTS: readonly ProjectIdentity[] = [
  {
    id: SUMBER_AGUNG_TRANS.id,
    number: SUMBER_AGUNG_TRANS.number,
    title: SUMBER_AGUNG_TRANS.title,
    subtitle: SUMBER_AGUNG_TRANS.subtitle,
    route: SUMBER_AGUNG_TRANS.route,
    thumbnail: SUMBER_AGUNG_TRANS.thumbnail,
  },
  {
    id: "32-bloc",
    number: "02/",
    title: "32 BLOC",
    subtitle: "Point of Sale for Modern F&B",
    route: "/projects/32-bloc",
    thumbnail: "/images/projects/pos_cashier_app/thumbnail/thumbnail.webp",
  },
  {
    id: "moneylog",
    number: "03/",
    title: "MONEYLOG",
    subtitle: "Personal Finance Tracking Web Application",
    route: "/projects/moneylog",
    thumbnail: "/images/projects/moneylog/thumbnail.webp",
  },
];
