"use client";

import { useSearchParams } from "next/navigation";

export default function EnquiryAlert() {
  const sp = useSearchParams();
  const enquiry = sp.get("enquiry");

  if (enquiry === "sent") {
    return (
      <div className="rounded-md border border-emerald-900/40 bg-emerald-950/30 px-3 py-2 text-xs text-emerald-200">
        Enquiry submitted successfully — we’ll reply by email shortly.
      </div>
    );
  }

  if (enquiry === "error") {
    return (
      <div className="rounded-md border border-red-900/40 bg-red-950/30 px-3 py-2 text-xs text-red-200">
        Something went wrong — please try again.
      </div>
    );
  }

  return null;
}