"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type RfqEntry = {
  id?: string;
  createdAt?: string;
  projectName: string;
  company: string;
  email: string;
  quantity: number | null;
  material: string;
  stage: string;
  status?: string;

  vendorUnitPrice?: number | null;
  customerUnitPrice?: number | null;
  currency?: string;
};

type NdaEntry = {
  createdAt?: string;
  name: string;
  email: string;
  company: string;
  version?: string;
  ip?: string;
};

function formatMoney(amount?: number | null, currency?: string | null): string {
  if (typeof amount !== "number" || Number.isNaN(amount)) return "—";
  const cur = currency || "GBP";
  const symbol = cur === "GBP" ? "£" : cur === "USD" ? "$" : cur + " ";
  return `${symbol}${amount.toFixed(2)}`;
}

export default function AdminPage() {
  const [rfqs, setRfqs] = useState<RfqEntry[]>([]);
  const [ndas, setNdas] = useState<NdaEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkedAuth, setCheckedAuth] = useState(false);
  const [isAuthorised, setIsAuthorised] = useState(false);
  const [selectedRfq, setSelectedRfq] = useState<RfqEntry | null>(null);

  // Simple client-side "auth" check
  useEffect(() => {
    if (typeof window !== "undefined") {
      const flag = localStorage.getItem("osmStaffLoggedIn");
      setIsAuthorised(flag === "true");
      setCheckedAuth(true);
    }
  }, []);

  // Load RFQs + NDAs once authorised
  useEffect(() => {
    async function load() {
      if (!isAuthorised) return;

      try {
        setLoading(true);
        setError(null);

        const [rfqRes, ndaRes] = await Promise.all([
          fetch("/api/rfq"),
          fetch("/api/nda"),
        ]);

        if (!rfqRes.ok || !ndaRes.ok) {
          throw new Error("Failed to fetch admin data");
        }

        const rfqJson = await rfqRes.json();
        const ndaJson = await ndaRes.json();

        setRfqs(rfqJson.rfqs ?? []);
        setNdas(ndaJson.ndas ?? []);
      } catch (err) {
        console.error(err);
        setError("Could not load admin data. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [isAuthorised]);

  // While we haven't checked localStorage yet
  if (!checkedAuth) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-50">
        <div className="max-w-2xl mx-auto px-4 py-10">
          <p className="text-sm text-slate-300">Checking staff access…</p>
        </div>
      </main>
    );
  }

  // If not authorised, show a friendly login prompt
  if (!isAuthorised) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-50">
        <div className="max-w-2xl mx-auto px-4 py-10 space-y-4">
          <h1 className="text-2xl font-semibold">Staff area</h1>
          <p className="text-sm text-slate-300">
            This page is for internal use only. Please sign in with your staff
            credentials to view RFQs and NDA acceptances.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium bg-sky-500 hover:bg-sky-400 text-slate-950 transition"
          >
            Go to staff login
          </Link>
        </div>
      </main>
    );
  }

  // Quote helpers
  const quoteTotal =
    selectedRfq &&
    selectedRfq.quantity != null &&
    selectedRfq.customerUnitPrice != null
      ? selectedRfq.quantity * selectedRfq.customerUnitPrice
      : null;

  const quoteCurrency = selectedRfq?.currency ?? "GBP";

  const quoteDescription =
    selectedRfq && selectedRfq.id
      ? `${selectedRfq.material || "Microfluidic"} parts – ${
          selectedRfq.stage || "prototype"
        } run (${selectedRfq.id})`
      : "";

  // Authorised view
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        <header className="space-y-1">
          <h1 className="text-3xl font-semibold">
            One Stop Microfluidics Shop – Admin
          </h1>
          <p className="text-slate-300 text-sm">
            Internal view of recent RFQs, NDAs and quote preparation details.
          </p>
        </header>

        {loading && (
          <p className="text-slate-300 text-sm">Loading admin data…</p>
        )}

        {error && (
          <p className="text-sm text-rose-400 bg-rose-900/30 border border-rose-700 rounded-md px-3 py-2">
            {error}
          </p>
        )}

        {/* RFQs */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold">Recent RFQs</h2>
            <span className="text-xs text-slate-400">
              {rfqs.length} RFQ{rfqs.length === 1 ? "" : "s"}
            </span>
          </div>

          {rfqs.length === 0 ? (
            <p className="text-sm text-slate-400">
              No RFQs submitted yet in this session.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border-collapse">
                <thead className="bg-slate-900/80">
                  <tr>
                    <th className="text-left px-3 py-2 border-b border-slate-800">
                      When
                    </th>
                    <th className="text-left px-3 py-2 border-b border-slate-800">
                      Project
                    </th>
                    <th className="text-left px-3 py-2 border-b border-slate-800">
                      Company
                    </th>
                    <th className="text-left px-3 py-2 border-b border-slate-800">
                      Email
                    </th>
                    <th className="text-left px-3 py-2 border-b border-slate-800">
                      Qty
                    </th>
                    <th className="text-left px-3 py-2 border-b border-slate-800">
                      Material
                    </th>
                    <th className="text-left px-3 py-2 border-b border-slate-800">
                      Vendor £/part
                    </th>
                    <th className="text-left px-3 py-2 border-b border-slate-800">
                      Customer £/part (+45%)
                    </th>
                    <th className="text-left px-3 py-2 border-b border-slate-800">
                      Stage
                    </th>
                    <th className="text-left px-3 py-2 border-b border-slate-800">
                      Quote
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rfqs
                    .slice()
                    .reverse()
                    .map((rfq, idx) => {
                      const isSelected =
                        selectedRfq && selectedRfq.id === rfq.id;
                      return (
                        <tr
                          key={idx}
                          className={`odd:bg-slate-900/40 even:bg-slate-900/10 ${
                            isSelected ? "outline outline-1 outline-sky-500" : ""
                          }`}
                        >
                          <td className="px-3 py-2 border-b border-slate-900/60 text-slate-400">
                            {rfq.createdAt
                              ? new Date(rfq.createdAt).toLocaleString()
                              : "—"}
                          </td>
                          <td className="px-3 py-2 border-b border-slate-900/60">
                            {rfq.projectName}
                          </td>
                          <td className="px-3 py-2 border-b border-slate-900/60">
                            {rfq.company}
                          </td>
                          <td className="px-3 py-2 border-b border-slate-900/60">
                            {rfq.email}
                          </td>
                          <td className="px-3 py-2 border-b border-slate-900/60">
                            {rfq.quantity ?? "—"}
                          </td>
                          <td className="px-3 py-2 border-b border-slate-900/60">
                            {rfq.material}
                          </td>
                          <td className="px-3 py-2 border-b border-slate-900/60">
                            {formatMoney(
                              rfq.vendorUnitPrice ?? null,
                              rfq.currency ?? "GBP"
                            )}
                          </td>
                          <td className="px-3 py-2 border-b border-slate-900/60">
                            {formatMoney(
                              rfq.customerUnitPrice ?? null,
                              rfq.currency ?? "GBP"
                            )}
                          </td>
                          <td className="px-3 py-2 border-b border-slate-900/60">
                            {rfq.stage || "—"}
                          </td>
                          <td className="px-3 py-2 border-b border-slate-900/60">
                            <button
                              type="button"
                              onClick={() =>
                                setSelectedRfq(
                                  isSelected ? null : (rfq as RfqEntry)
                                )
                              }
                              className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium bg-sky-500 hover:bg-sky-400 text-slate-950 transition"
                            >
                              {isSelected ? "Clear" : "Prepare quote"}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          )}

          {/* Quote details panel */}
          {selectedRfq && (
            <div className="mt-6 rounded-lg border border-sky-700 bg-sky-900/20 p-4 space-y-3">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-semibold">
                  Quote details for {selectedRfq.id ?? "RFQ"}
                </h3>
                <span className="text-xs text-sky-200/80">
                  Copy these values into Xero as a draft quote.
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div>
                    <div className="text-slate-400 text-xs uppercase tracking-wide">
                      Customer (contact name)
                    </div>
                    <div className="font-medium">
                      {selectedRfq.company || "—"}
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-xs uppercase tracking-wide">
                      Customer email
                    </div>
                    <div className="font-medium">
                      {selectedRfq.email || "—"}
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-xs uppercase tracking-wide">
                      RFQ ID
                    </div>
                    <div className="font-mono text-xs">
                      {selectedRfq.id ?? "—"}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <div className="text-slate-400 text-xs uppercase tracking-wide">
                      Line description (for Xero)
                    </div>
                    <div className="font-medium">
                      {quoteDescription || "—"}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-2">
                    <div>
                      <div className="text-slate-400 text-xs uppercase tracking-wide">
                        Quantity
                      </div>
                      <div className="font-medium">
                        {selectedRfq.quantity ?? "—"}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-xs uppercase tracking-wide">
                        Unit price (customer)
                      </div>
                      <div className="font-medium">
                        {formatMoney(
                          selectedRfq.customerUnitPrice ?? null,
                          quoteCurrency
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-xs uppercase tracking-wide">
                        Line total
                      </div>
                      <div className="font-semibold">
                        {quoteTotal != null
                          ? formatMoney(quoteTotal, quoteCurrency)
                          : "—"}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-slate-400">
                    Xero will handle VAT/tax on top of this line total, based on
                    your chosen tax rate.
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* NDAs */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold">NDA Acceptances</h2>
            <span className="text-xs text-slate-400">
              {ndas.length} NDA{ndas.length === 1 ? "" : "s"}
            </span>
          </div>

          {ndas.length === 0 ? (
            <p className="text-sm text-slate-400">
              No NDA acceptances recorded yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border-collapse">
                <thead className="bg-slate-900/80">
                  <tr>
                    <th className="text-left px-3 py-2 border-b border-slate-800">
                      When
                    </th>
                    <th className="text-left px-3 py-2 border-b border-slate-800">
                      Name
                    </th>
                    <th className="text-left px-3 py-2 border-b border-slate-800">
                      Company
                    </th>
                    <th className="text-left px-3 py-2 border-b border-slate-800">
                      Email
                    </th>
                    <th className="text-left px-3 py-2 border-b border-slate-800">
                      Version
                    </th>
                    <th className="text-left px-3 py-2 border-b border-slate-800">
                      IP
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ndas
                    .slice()
                    .reverse()
                    .map((nda, idx) => (
                      <tr
                        key={idx}
                        className="odd:bg-slate-900/40 even:bg-slate-900/10"
                      >
                        <td className="px-3 py-2 border-b border-slate-900/60 text-slate-400">
                          {nda.createdAt
                            ? new Date(nda.createdAt).toLocaleString()
                            : "—"}
                        </td>
                        <td className="px-3 py-2 border-b border-slate-900/60">
                          {nda.name}
                        </td>
                        <td className="px-3 py-2 border-b border-slate-900/60">
                          {nda.company}
                        </td>
                        <td className="px-3 py-2 border-b border-slate-900/60">
                          {nda.email}
                        </td>
                        <td className="px-3 py-2 border-b border-slate-900/60">
                          {nda.version ?? "—"}
                        </td>
                        <td className="px-3 py-2 border-b border-slate-900/60 text-slate-400">
                          {nda.ip ?? "—"}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}