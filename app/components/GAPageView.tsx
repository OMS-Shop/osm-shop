"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function GAPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const gaId = process.env.NEXT_PUBLIC_GA_ID;
    if (!gaId) return;
    if (typeof window.gtag !== "function") return;

    const query = searchParams?.toString();
    const page_path = query ? `${pathname}?${query}` : pathname;

    window.gtag("config", gaId, {
      page_path,
      anonymize_ip: true,
    });
  }, [pathname, searchParams]);

  return null;
}