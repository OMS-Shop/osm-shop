"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function GAPageView() {
  const pathname = usePathname();

  useEffect(() => {
    const gaId = process.env.NEXT_PUBLIC_GA_ID;
    if (!gaId) return;

    // gtag is created by the GA script in GoogleAnalytics.tsx
    if (typeof window.gtag !== "function") return;

    const page_path = `${pathname}${window.location.search || ""}`;

    window.gtag("config", gaId, {
      page_path,
      anonymize_ip: true,
    });
  }, [pathname]);

  return null;
}