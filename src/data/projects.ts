export interface ProjectIdentity {
  id: string;
  number: string;
  displayNumber: string;
  title: string;
  subtitle: string;
  description: string;
  route: string;
  thumbnail: string;
}

export interface ProjectData extends ProjectIdentity {
  laptopMockup: string;
  mobileMockup: string;
}

export const SUMBER_AGUNG_TRANS: ProjectData = {
  id: "sumber-agung-trans",
  number: "01/",
  displayNumber: "01",
  title: "SUMBER AGUNG TRANS",
  subtitle: "Fleet Reservation and Scheduling System",
  description:
    "An integrated web and mobile platform engineered to simplify fleet reservations, payment management, vehicle scheduling, and driver assignments for transport operators.",
  route: "/projects/sumber-agung-trans",
  laptopMockup: "/images/projects/sumber_agung_trans/overview/dashboard_laptop.webp",
  mobileMockup: "/images/projects/sumber_agung_trans/overview/dashboard_mobile.webp",
  thumbnail: "/images/projects/sumber_agung_trans/thumbnail/thumbnail.webp",
};

export const PERSONAL_PROJECTS: readonly ProjectIdentity[] = [
  {
    id: SUMBER_AGUNG_TRANS.id,
    number: SUMBER_AGUNG_TRANS.number,
    displayNumber: SUMBER_AGUNG_TRANS.displayNumber,
    title: SUMBER_AGUNG_TRANS.title,
    subtitle: SUMBER_AGUNG_TRANS.subtitle,
    description: SUMBER_AGUNG_TRANS.description,
    route: SUMBER_AGUNG_TRANS.route,
    thumbnail: SUMBER_AGUNG_TRANS.thumbnail,
  },
  {
    id: "32-bloc",
    number: "02/",
    displayNumber: "02",
    title: "32 BLOC",
    subtitle: "Point of Sale for Modern F&B",
    description:
      "A high-efficiency point of sale application built for modern food and beverage businesses, streamlining live ordering, kitchen ticketing, table management, and cashier reconciliations.",
    route: "/projects/32-bloc",
    thumbnail: "/images/projects/pos_cashier_app/thumbnail/thumbnail.webp",
  },
  {
    id: "moneylog",
    number: "03/",
    displayNumber: "03",
    title: "MONEYLOG",
    subtitle: "Personal Finance Tracking Web Application",
    description:
      "A clean personal finance tracking web application designed to help users log daily expenses, analyze income categories, set budgets, and visualize financial growth.",
    route: "/projects/moneylog",
    thumbnail: "/images/projects/moneylog/thumbnail/thumbnail.webp",
  },
];
