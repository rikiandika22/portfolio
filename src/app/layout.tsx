import type { Metadata } from "next";
import { cohabited } from "@/lib/fonts";
import "./globals.css";
import { PageTransitionProvider } from "@/context/PageTransitionContext";
import PageTransitionOverlay from "@/components/animation/PageTransitionOverlay";
import SplashScreen from "@/components/splash/SplashScreen";

export const metadata: Metadata = {
  title: "Riki Andika — Design Minded Developer",
  description:
    "Portfolio of Riki Andika Khusna Saputra. Frontend developer, Flutter mobile developer, and UI UX designer based in Yogyakarta.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cohabited.variable}>
      <body>
        <PageTransitionProvider>
          {/*
           * SplashScreen lives here in the root layout so it is a stable
           * singleton across all routes. It must NOT be in a page component
           * because page components unmount/remount during client-side routing,
           * which would replay the splash animation on every visit to "/".
           *
           * The sessionStorage SPLASH_COMPLETED_KEY flag inside SplashScreen
           * ensures the animation runs exactly once per browser session even
           * if the component ever re-renders.
           */}
          <SplashScreen />
          {children}
          <PageTransitionOverlay />
        </PageTransitionProvider>
      </body>
    </html>
  );
}
