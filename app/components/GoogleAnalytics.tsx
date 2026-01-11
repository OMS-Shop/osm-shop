"use client";

import Script from "next/script";
import { Suspense } from "react";
import GAPageView from "./GAPageView";

export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

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
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>

      {/* ✅ Suspense wrapper avoids not-found prerender error */}
      <Suspense fallback={null}>
        <GAPageView />
      </Suspense>
    </>
  );
}