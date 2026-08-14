"use client";

import { useEffect } from "react";
import { PROJECT_STACK_SKIP_SPLASH_KEY } from "@/lib/projectNavigation";

export default function WorksHashNavigation() {
  useEffect(() => {
    sessionStorage.removeItem(PROJECT_STACK_SKIP_SPLASH_KEY);

    const targetId = decodeURIComponent(window.location.hash.slice(1));
    if (!targetId) return;

    const frameId = requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView();
    });

    return () => cancelAnimationFrame(frameId);
  }, []);

  return null;
}
