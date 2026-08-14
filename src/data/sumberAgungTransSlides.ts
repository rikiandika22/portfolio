/** Content data for the Sumber Agung Trans project detail experience. */

export interface SlideImageSet {
  web: string;
  webWidth: number;
  webHeight: number;
  mobile: string;
  mobileWidth: number;
  mobileHeight: number;
}

export interface KeyFeature {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface TechStackIcon {
  name: string;
  src: string;
}

export interface TechStackGroup {
  id: string;
  category: string;
  icons: TechStackIcon[];
  description: string;
}

export interface ProjectSlideData {
  slideNumber: string;
  sectionTitle?: string;
  leftDescription?: string;
  rightDescription?: string;
  images?: SlideImageSet;
}

export interface TechnologySlideData {
  slideNumber: string;
  headline: string;
  projectDetailsText: string[];
  keyFeatures: KeyFeature[];
  techStack: TechStackGroup[];
}

// ---------------------------------------------------------------------------
// Shared identity
// ---------------------------------------------------------------------------

export const PROJECT_IDENTITY = {
  number: "01/",
  name: "Sumber Agung Trans",
  subtitle: "Fleet Reservation and Scheduling System",
};

// ---------------------------------------------------------------------------
// Icon base path
// ---------------------------------------------------------------------------

const ICON_BASE = "/icons/tech/works/detail";

// ---------------------------------------------------------------------------
// Slide 01 — Fleet Management (Overview)
// ---------------------------------------------------------------------------

export const SLIDE_01: ProjectSlideData = {
  slideNumber: "01",
  sectionTitle: "Fleet Management",
  leftDescription:
    "The web administration platform allows administrators to manage vehicle information, service categories, capacity, availability, and operational status from one centralized interface.",
  rightDescription:
    "The mobile application gives customers a clear view of available buses, Elf vehicles, and logistics trucks, including their capacity, facilities, service details, and current availability.",
  images: {
    web: "/images/projects/sumber_agung_trans/fleet_management/web.webp",
    webWidth: 3052,
    webHeight: 1696,
    mobile: "/images/projects/sumber_agung_trans/fleet_management/mobile.webp",
    mobileWidth: 840,
    mobileHeight: 1768,
  },
};

// ---------------------------------------------------------------------------
// Slide 02 — Reservation and Fleet Operations
// ---------------------------------------------------------------------------

export const SLIDE_02: ProjectSlideData = {
  slideNumber: "02",
  sectionTitle: "Reservation and Fleet Operations",
  leftDescription:
    "The web administration platform allows administrators to review reservations, validate payments, assign vehicles and drivers, and organize confirmed bookings into structured schedules.",
  rightDescription:
    "The mobile application guides customers through the reservation process, from selecting a vehicle and entering travel details to submitting payments and monitoring booking progress.",
  images: {
    web: "/images/projects/reservation_operations/web.webp",
    webWidth: 3052,
    webHeight: 1696,
    mobile: "/images/projects/reservation_operations/mobile.webp",
    mobileWidth: 848,
    mobileHeight: 1780,
  },
};

// ---------------------------------------------------------------------------
// Slide 03 — Technology Behind the System
// ---------------------------------------------------------------------------

export const SLIDE_03: TechnologySlideData = {
  slideNumber: "03",
  headline: "THE TECHNOLOGY\nBEHIND THE SYSTEM",
  projectDetailsText: [
    "Sumber Agung Trans is an integrated fleet reservation and scheduling system consisting of a Flutter mobile application, a React web administration dashboard, a Laravel REST API, and a centralized MySQL database.",
    "Both platforms share connected data for reservations, payments, vehicles, drivers, schedules, and operational activities.",
  ],
  keyFeatures: [
    {
      id: "kf-01",
      number: "/01",
      title: "Integrated Reservation Management",
      description:
        "Customers can check vehicle availability and submit reservations for buses, Elf vehicles, and logistics trucks through the mobile application. Administrators can review every request from one centralized web dashboard.",
    },
    {
      id: "kf-02",
      number: "/02",
      title: "Payment Verification and Status Tracking",
      description:
        "Customers can upload deposit and final payment evidence directly from their booking details. Administrators can verify each transaction while payment and reservation statuses remain synchronized across both platforms.",
    },
    {
      id: "kf-03",
      number: "/03",
      title: "Fleet Scheduling and Driver Assignment",
      description:
        "Confirmed reservations are converted into structured fleet schedules. Administrators can assign available vehicles and drivers while maintaining cleaner control over active journeys and reducing scheduling conflicts.",
    },
  ],
  techStack: [
    {
      id: "ts-mobile",
      category: "Mobile Application",
      icons: [
        { name: "Flutter", src: `${ICON_BASE}/flutter.svg` },
        { name: "Dart", src: `${ICON_BASE}/dart.svg` },
      ],
      description:
        "A customer mobile application for checking vehicle availability, submitting reservations, selecting locations, uploading payment evidence, and tracking booking progress.",
    },
    {
      id: "ts-web",
      category: "Web Frontend",
      icons: [
        { name: "React", src: `${ICON_BASE}/react.svg` },
        { name: "Tailwind CSS", src: `${ICON_BASE}/tailwind.svg` },
        { name: "Vite", src: `${ICON_BASE}/vite.svg` },
      ],
      description:
        "A responsive administration interface for managing reservations, vehicles, drivers, payments, reports, and daily operational activities.",
    },
    {
      id: "ts-backend",
      category: "Backend REST API",
      icons: [
        { name: "PHP", src: `${ICON_BASE}/php.svg` },
        { name: "Laravel", src: `${ICON_BASE}/laravel.svg` },
      ],
      description:
        "A centralized REST API that handles authentication, business logic, data validation, and communication between the web administration platform and mobile application.",
    },
    {
      id: "ts-database",
      category: "Database & Data Layer",
      icons: [
        { name: "MySQL", src: `${ICON_BASE}/mysql.svg` },
        { name: "Eloquent ORM", src: `${ICON_BASE}/laravel.svg` },
      ],
      description:
        "MySQL stores reservations, payments, vehicles, drivers, schedules, user data, and other operational records, while Eloquent ORM manages data access and relationships within the Laravel backend.",
    },
  ],
};

/** All tech icons in compact display order (left to right as in closed.png). */
export const ALL_TECH_ICONS: TechStackIcon[] = [
  ...SLIDE_03.techStack.flatMap((group) => group.icons),
];
