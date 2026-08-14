import type { TechStackGroup, TechStackIcon } from "@/data/sumberAgungTransSlides";

/** Content data for the MoneyLog project detail experience. */

export interface MoneyLogSlideImage {
  src: string;
  width: number;
  height: number;
}

export interface MoneyLogSlideData {
  slideNumber: string;
  sectionTitle: string;
  leftDescription: string;
  rightDescription: string;
  image: MoneyLogSlideImage;
}

export interface MoneyLogKeyFeature {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface MoneyLogTechnologySlideData {
  headline: string;
  projectDetailsText: string[];
  keyFeatures: MoneyLogKeyFeature[];
  techStack: TechStackGroup[];
}

// ---------------------------------------------------------------------------
// Shared identity
// ---------------------------------------------------------------------------

export const MONEYLOG_PROJECT_IDENTITY = {
  number: "03/",
  name: "MoneyLog",
  subtitle: "Personal Finance Tracking Web Application",
};

// ---------------------------------------------------------------------------
// Compact Tech Stack icons
// ---------------------------------------------------------------------------

export const MONEYLOG_ALL_TECH_ICONS: TechStackIcon[] = [
  { name: "Node.js", src: "/icons/tech/works/detail/nodejs.svg" },
  { name: "Express.js", src: "/icons/tech/works/detail/expressjs.svg" },
  { name: "Prisma", src: "/icons/tech/works/detail/prisma.svg" },
  { name: "JWT", src: "/icons/tech/works/detail/jwt.svg" },
  { name: "Swagger", src: "/icons/tech/works/detail/swagger.svg" },
];

// ---------------------------------------------------------------------------
// Slide 01 — Overview
// ---------------------------------------------------------------------------

export const MONEYLOG_SLIDE_01: MoneyLogSlideData = {
  slideNumber: "01",
  sectionTitle: "Overview",
  leftDescription:
    "MoneyLog is a personal finance tracking web application designed to help users record and organize their daily income and expenses in one simple workspace. Users can add transactions, categorize financial activities, and monitor their current balance without dealing with complicated financial tools.",
  rightDescription:
    "The dashboard provides a clear summary of total income, total expenses, and current balance while keeping transaction records easy to review and manage. Each user has their own account and financial data, allowing personal transaction histories to remain organized and accessible across sessions.",
  image: {
    src: "/images/projects/moneylog/moneylog-web.webp",
    width: 4000,
    height: 2160,
  },
};

// ---------------------------------------------------------------------------
// Slide 02 — Technology Behind the System
// ---------------------------------------------------------------------------

export const MONEYLOG_SLIDE_02: MoneyLogTechnologySlideData = {
  headline: "THE TECHNOLOGY\nBEHIND THE SYSTEM",
  projectDetailsText: [
    "MoneyLog is a personal finance tracking web application built around authenticated user accounts and a REST API architecture. The system separates the user interface from the backend service so transaction data, account information, and financial records can be managed through a structured application flow.",
    "Users can register, sign in, access their profile, and record income or expense transactions from one workspace. Financial records are processed through the backend API, allowing each account to maintain its own transaction history and financial information.",
  ],
  keyFeatures: [
    {
      id: "secure-auth",
      number: "/01",
      title: "Secure User Authentication",
      description:
        "Users can create an account and sign in securely before accessing their financial data. JWT based authentication protects private routes and ensures that account information and transaction records remain associated with the authenticated user.",
    },
    {
      id: "income-expense",
      number: "/02",
      title: "Income & Expense Tracking",
      description:
        "Users can record income and expense transactions with information such as title, amount, category, date, and optional notes. Each transaction contributes directly to the financial summary displayed on the dashboard.",
    },
    {
      id: "summary-calc",
      number: "/03",
      title: "Balance & Summary Calculation",
      description:
        "The dashboard calculates and presents the current balance, total income, and total expenses while keeping transaction history available for review and management. This gives users a clear overview of their financial activity from one interface.",
    },
  ],
  techStack: [
    {
      id: "backend-api",
      category: "Backend API",
      icons: [
        { name: "Node.js", src: "/icons/tech/works/detail/nodejs.svg" },
        { name: "Express.js", src: "/icons/tech/works/detail/expressjs.svg" },
      ],
      description:
        "Node.js and Express.js power the REST API responsible for authentication, profile management, transaction processing, and communication between the frontend and application data.",
    },
    {
      id: "database-access",
      category: "Database Access",
      icons: [
        { name: "Prisma", src: "/icons/tech/works/detail/prisma.svg" },
      ],
      description:
        "Prisma ORM provides a structured data access layer for managing users and financial transaction records while keeping database operations organized within the backend.",
    },
    {
      id: "authentication",
      category: "Authentication",
      icons: [
        { name: "JWT", src: "/icons/tech/works/detail/jwt.svg" },
      ],
      description:
        "JSON Web Tokens are used to maintain authenticated sessions and protect API endpoints that contain personal account and financial information.",
    },
    {
      id: "api-docs",
      category: "API Documentation",
      icons: [
        { name: "Swagger", src: "/icons/tech/works/detail/swagger.svg" },
      ],
      description:
        "Swagger provides interactive REST API documentation, making available endpoints, request structures, and responses easier to inspect and test during development.",
    },
  ],
};
