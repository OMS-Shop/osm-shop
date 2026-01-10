"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function GAPageView({ gaId }: { gaId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!gaId) return;

    const qs = searchParams?.toString();
    const page_path = qs ? `${pathname}?${qs}` : pathname;

    // Send a GA4 page_view on client-side route changes
    // @ts-ignore
    window.gtag?.("event", "page_view", { page_path });
  }, [pathname, searchParams, gaId]);

  return null;
}