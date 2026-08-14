import localFont from "next/font/local";

export const cohabited = localFont({
  src: [
    {
      path: "../app/fonts/Cohabited/Cohabited-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../app/fonts/Cohabited/Cohabited-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../app/fonts/Cohabited/Cohabited-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../app/fonts/Cohabited/Cohabited-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../app/fonts/Cohabited/Cohabited-ExtraBold.otf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-cohabited",
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});
