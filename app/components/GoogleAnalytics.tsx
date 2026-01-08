"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function GoogleAnalytics({ gaId }: { gaId?: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Send pageviews on route changes (App Router)
  useEffect(() => {
    if (!gaId) return;
    if (!window.gtag) return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams}` : "");
    window.gtag("event", "page_view", {
      page_location: window.location.href,
      page_path: url,
    });
  }, [gaId, pathname, searchParams]);

  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${gaId}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}