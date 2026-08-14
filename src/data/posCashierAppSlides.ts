import type { TechStackGroup, TechStackIcon } from "@/data/sumberAgungTransSlides";

/** Content data for the POS Cashier App (32 BLOC) project detail experience. */

export interface PosSlideImage {
  src: string;
  width: number;
  height: number;
}

export interface PosSlideData {
  slideNumber: string;
  sectionTitle: string;
  leftDescription: string;
  rightDescription: string;
  image: PosSlideImage;
}

export interface PosKeyFeature {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface PosTechnologySlideData {
  headline: string;
  projectDetailsText: string[];
  keyFeatures: PosKeyFeature[];
  techStack: TechStackGroup[];
}

// ---------------------------------------------------------------------------
// Shared identity
// ---------------------------------------------------------------------------

export const POS_PROJECT_IDENTITY = {
  number: "02/",
  name: "32 BLOC",
  subtitle: "Point of Sale for Modern F&B",
};

// ---------------------------------------------------------------------------
// Compact Tech Stack icons
// ---------------------------------------------------------------------------

export const POS_ALL_TECH_ICONS: TechStackIcon[] = [
  { name: "Flutter", src: "/icons/tech/works/detail/flutter.svg" },
  { name: "Dart", src: "/icons/tech/works/detail/dart.svg" },
  { name: "Firebase", src: "/icons/tech/works/detail/firebase.svg" },
  { name: "Cloudinary", src: "/icons/tech/works/detail/claudinary.svg" },
  { name: "SQLite", src: "/icons/tech/works/detail/sqlite.svg" },
];

// ---------------------------------------------------------------------------
// Slide 01 — Overview
// ---------------------------------------------------------------------------

export const POS_SLIDE_01: PosSlideData = {
  slideNumber: "01",
  sectionTitle: "Overview",
  leftDescription:
    "32 BLOC POS is a tablet based cashier application designed for modern coffee shop operations. It brings product selection, order customization, cart management, payment processing, and transaction confirmation into one clear and connected workspace.",
  rightDescription:
    "The interface is designed to help cashiers process detailed orders quickly while keeping every product preference visible. Customers can request different sizes, sugar levels, ice levels, toppings, and additional notes without making the transaction flow feel complicated.",
  image: {
    src: "/images/projects/pos_cashier_app/poscashierapp-tab.webp",
    width: 3592,
    height: 2228,
  },
};

// ---------------------------------------------------------------------------
// Slide 02 — Technology Behind the System
// ---------------------------------------------------------------------------

export const POS_SLIDE_02: PosTechnologySlideData = {
  headline: "THE TECHNOLOGY\nBEHIND THE SYSTEM",
  projectDetailsText: [
    "32 BLOC POS was created to address the complexity of modern food and beverage transactions, where a single order may include different sizes, sugar levels, ice levels, toppings, and additional preparation notes.",
    "The system was designed to reduce unnecessary navigation, maintain pricing accuracy, and keep cashier operations running even when the internet connection becomes unstable.",
  ],
  keyFeatures: [
    {
      id: "smart-modifier",
      number: "/01",
      title: "Smart Modifier System",
      description:
        "A one screen modifier flow for configuring size, sugar level, ice level, toppings, and additional notes with automatic price adjustments.",
    },
    {
      id: "smart-cart",
      number: "/02",
      title: "Reactive Smart Cart",
      description:
        "Real time calculation for quantities, discounts, PB1 tax, payment totals, and cash change through structured state management.",
    },
    {
      id: "offline-first",
      number: "/03",
      title: "Offline First Architecture",
      description:
        "Local data storage keeps product catalogues, modifier rules, and transactions available without requiring a continuous internet connection.",
    },
  ],
  techStack: [
    {
      id: "mobile-app",
      category: "Mobile Application",
      icons: [
        { name: "Flutter", src: "/icons/tech/works/detail/flutter.svg" },
        { name: "Dart", src: "/icons/tech/works/detail/dart.svg" },
      ],
      description:
        "Built with Flutter and Dart to deliver a responsive tablet based POS interface optimized for fast paced F&B transactions.",
    },
    {
      id: "authentication",
      category: "Authentication",
      icons: [
        { name: "Firebase", src: "/icons/tech/works/detail/firebase.svg" },
      ],
      description:
        "Firebase Authentication manages user access and authentication securely while maintaining account based access to the POS application.",
    },
    {
      id: "media-storage",
      category: "Media Storage",
      icons: [
        { name: "Cloudinary", src: "/icons/tech/works/detail/claudinary.svg" },
      ],
      description:
        "Cloudinary is used to store and deliver product images, keeping media management separate from the application while providing reliable image access.",
    },
    {
      id: "local-data",
      category: "Local Data & Offline First",
      icons: [
        { name: "SQLite", src: "/icons/tech/works/detail/sqlite.svg" },
      ],
      description:
        "Local storage keeps essential product, modifier, and transaction data available locally, allowing the application to remain usable when connectivity is limited.",
    },
  ],
};
