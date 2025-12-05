"use client";

import { FormEvent, useState } from "react";

type RfqEntry = {
  id?: string;
  createdAt?: string;
  projectName?: string;
  company?: string;
  email?: string;
  quantity?: string;
  primaryMaterial?: string;
  volumeBand?: string;
  status?: string;
};

type NdaEntry = {
  id?: string;
  createdAt?: string;
  name?: string;
  email?: string;
  company?: string;
  version?: string;
};

export default function CustomerPortalPage() {
  const [email, setEmail] = useState("");
  const [rfqs, setRfqs] = useState<RfqEntry[]>([]);
  const [ndas, setNdas] = useState<NdaEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [lookedUp, setLookedUp] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLookup(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLookedUp(false);

    const trimmed = email.trim().toLowerCase();
    if (!trimmed) {
      setError("Please enter an email address.");
      return;
    }

    setLoading(true);
    try {
      // Get *all* RFQs and NDAs then filter client-side by email
      const [rfqRes, ndaRes] = await Promise.all([
        fetch("/api/rfq"),
        fetch("/api/nda"),
      ]);

      if (!rfqRes.ok || !ndaRes.ok) {
        throw new Error("Failed to load data from the server.");
      }

      const rfqJson = await rfqRes.json();
      const ndaJson = await ndaRes.json();

      const allRfqs: RfqEntry[] = rfqJson.rfqs ?? [];
      const allNdas: NdaEntry[] = ndaJson.ndas ?? [];

      const filteredRfqs = allRfqs.filter(
        (r) => (r.email || "").toLowerCase() === trimmed
      );
      const filteredNdas = allNdas.filter(
        (n) => (n.email || "").toLowerCase() === trimmed
      );

      setRfqs(filteredRfqs);
      setNdas(filteredNdas);
      setLookedUp(true);
    } catch (err) {
      console.error(err);
      setError("Something went wrong looking up your details.");
    } finally {
      setLoading(false);
    }
  }

  function statusLabel(status?: string) {
    switch (status) {
      case "under_review":
        return "Under review";
      case "quoted":
        return "Quoted";
      case "waiting_payment":
        return "Waiting payment";
      case "in_production":
        return "In production";
      case "shipped":
        return "Shipped";
      case "complete":
        return "Complete";
      case "received":
      default:
        return "Received";
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        {/* Header */}
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold">
            One Stop Microfluidics Shop – Customer portal
          </h1>
          <p className="text-sm text-slate-300">
            Enter the email address you used when submitting an RFQ to see your
            requests and NDA status.
          </p>
        </header>

        {/* Lookup form */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <form onSubmit={handleLookup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Email address
              </label>
              <input
                type="email"
                className="w-full rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
              />
            </div>

            {error && (
              <p className="text-sm text-rose-400 bg-rose-900/30 border border-rose-700 rounded-md px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium bg-sky-500 hover:bg-sky-400 disabled:opacity-60 disabled:cursor-not-allowed text-slate-950 transition"
            >
              {loading ? "Looking up…" : "View my RFQs"}
            </button>
          </form>

          {lookedUp && !loading && !error && (
            <p className="text-xs text-slate-400">
              Showing results for: <span className="font-mono">{email}</span>
            </p>
          )}
        </section>

        {/* NDA status */}
        {lookedUp && (
          <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold">NDA status</h2>
              <span className="text-xs text-slate-400">
                {ndas.length} NDA{ndas.length === 1 ? "" : "s"} found
              </span>
            </div>

            {ndas.length === 0 ? (
              <p className="text-sm text-slate-300">
                We don&apos;t yet have an NDA on file for this email address.
                You can sign our NDA via DocuSign{" "}
                <a
                  href="/nda"
                  className="text-sky-400 underline underline-offset-4"
                >
                  on this page
                </a>
                .
              </p>
            ) : (
              <div className="space-y-2 text-sm">
                {ndas
                  .slice()
                  .reverse()
                  .map((nda, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-medium">
                          {nda.company || "—"}
                        </span>
                        <span className="text-xs text-slate-400">
                          {nda.createdAt
                            ? new Date(nda.createdAt).toLocaleString()
                            : "Date not recorded"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">
                        Name: {nda.name || "—"} · Version:{" "}
                        {nda.version || "v1"}
                      </p>
                    </div>
                  ))}
              </div>
            )}
          </section>
        )}

        {/* RFQs list */}
        {lookedUp && (
          <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold">Your RFQs</h2>
              <span className="text-xs text-slate-400">
                {rfqs.length} RFQ{rfqs.length === 1 ? "" : "s"} found
              </span>
            </div>

            {rfqs.length === 0 ? (
              <p className="text-sm text-slate-300">
                We haven&apos;t received any RFQs for this email yet. You can
                submit a new RFQ on the{" "}
                <a
                  href="/upload"
                  className="text-sky-400 underline underline-offset-4"
                >
                  upload page
                </a>
                .
              </p>
            ) : (
              <div className="space-y-3 text-sm">
                {rfqs
                  .slice()
                  .reverse()
                  .map((rfq, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 space-y-1.5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-medium">
                          {rfq.projectName || "Untitled project"}
                        </span>
                        <span className="text-xs text-slate-400">
                          {rfq.createdAt
                            ? new Date(rfq.createdAt).toLocaleString()
                            : "Date not recorded"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">
                        Company: {rfq.company || "—"}
                      </p>
                      <p className="text-xs text-slate-300">
                        Quantity: {rfq.quantity || "—"} · Stage:{" "}
                        {rfq.volumeBand || "—"} · Material:{" "}
                        {rfq.primaryMaterial || "—"}
                      </p>
                      <p className="text-xs text-slate-300">
                        Status:{" "}
                        <span className="font-semibold text-emerald-300">
                          {statusLabel(rfq.status)}
                        </span>
                      </p>
                    </div>
                  ))}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}