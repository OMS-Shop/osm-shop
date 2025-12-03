"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type RFQRecord = {
  id: string;
  submittedAt: string;
  data: Record<string, any>;
};

export default function AdminPage() {
  const [rfqs, setRfqs] = useState<RFQRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/rfq", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load RFQs");
        const json = await res.json();
        setRfqs(json.rfqs ?? []);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Error loading RFQs");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-sky-950 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-sky-300/40 bg-white/5 text-[0.6rem] font-semibold tracking-[0.18em]">
              OSM
            </div>
            <div className="flex flex-col">
              <span className="text-base md:text-lg font-semibold tracking-wide">
                One Stop Microfludics Shop
              </span>
              <span className="text-xs md:text-sm text-sky-200">
                Internal RFQ dashboard
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-5 text-xs md:flex">
            <Link href="/" className="hover:text-sky-200">
              Home
            </Link>
            <Link href="/upload" className="hover:text-sky-200">
              Upload
            </Link>
          </nav>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-xl font-semibold md:text-2xl">
          RFQ submissions
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          RFQs received since the server last started. This reads from
          <code className="ml-1 rounded bg-slate-100 px-1.5 py-[1px] text-[0.7rem]">
            /api/rfq
          </code>{" "}
          which is currently using in-memory storage.
        </p>

        {loading && (
          <p className="mt-6 text-sm text-slate-600">Loading RFQs…</p>
        )}

        {error && (
          <p className="mt-6 text-sm text-red-600">Error: {error}</p>
        )}

        {!loading && !error && rfqs.length === 0 && (
          <p className="mt-6 text-sm text-slate-500">
            No RFQs yet. Submit one via the{" "}
            <Link href="/upload" className="text-sky-700 underline">
              upload form
            </Link>
            .
          </p>
        )}

        {!loading && !error && rfqs.length > 0 && (
          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-md">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Submitted</th>
                  <th className="px-4 py-3">Project</th>
                  <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Quantity</th>
                  <th className="px-4 py-3">Stage</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rfqs
                  .slice()
                  .reverse()
                  .map((rfq) => {
                    const d = rfq.data || {};
                    const isOpen = expandedId === rfq.id;
                    const submitted = new Date(
                      rfq.submittedAt
                    ).toLocaleString();
                    return (
                      <tr
                        key={rfq.id}
                        className="border-t border-slate-100 align-top hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-4 py-3 text-xs text-slate-500">
                          {rfq.id}
                        </td>
                        <td className="px-4 py-3 text-xs">{submitted}</td>
                        <td className="px-4 py-3">
                          {String(d.project_name || "—")}
                        </td>
                        <td className="px-4 py-3">
                          {String(d.company || "—")}
                        </td>
                        <td className="px-4 py-3 text-xs">
                          <div>{String(d.contact_name || "—")}</div>
                          <div className="text-slate-500">
                            {String(d.email || "")}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs">
                          {String(d.quantity || "—")}
                        </td>
                        <td className="px-4 py-3 text-xs">
                          {String(d.volume_band || "—")}
                        </td>
                        <td className="px-4 py-3 text-xs">
                          <button
                            onClick={() =>
                              setExpandedId(isOpen ? null : rfq.id)
                            }
                            className="rounded-full border border-slate-300 px-3 py-1 text-[0.7rem] hover:border-sky-500 hover:bg-slate-50 transition"
                          >
                            {isOpen ? "Hide details" : "View details"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}

        {/* Expanded details */}
        {!loading && !error && expandedId && (
          <ExpandedDetails rfq={rfqs.find((r) => r.id === expandedId)!} />
        )}
      </main>
    </div>
  );
}

function ExpandedDetails({ rfq }: { rfq: RFQRecord }) {
  const d = rfq.data || {};
  return (
    <section className="mx-auto mt-6 max-w-6xl rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-sm">
      <h2 className="text-sm font-semibold text-slate-900">
        RFQ {rfq.id} – full details
      </h2>
      <div className="mt-2 grid gap-4 md:grid-cols-3">
        <Detail label="Project name" value={d.project_name} />
        <Detail label="Company" value={d.company} />
        <Detail label="Application" value={d.application} />
        <Detail label="Contact name" value={d.contact_name} />
        <Detail label="Email" value={d.email} />
        <Detail label="Phone" value={d.phone} />
        <Detail label="Quantity" value={d.quantity} />
        <Detail label="Stage" value={d.volume_band} />
        <Detail label="Primary material" value={d.primary_material} />
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Detail label="Technical notes" value={d.technical_notes} />
        <Detail label="Extra notes" value={d.extra_notes} />
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Detail label="Processes" value={d.processes} />
        <Detail label="Material notes" value={d.material_notes} />
      </div>
      <p className="mt-4 text-[0.7rem] text-slate-500">
        File uploads are not yet surfaced in this UI – they are available in
        the server logs for now. Later we&apos;ll store them in proper object
        storage.
      </p>
    </section>
  );
}

function Detail({ label, value }: { label: string; value: unknown }) {
  const text = value ? String(value) : "—";
  return (
    <div>
      <div className="text-[0.7rem] font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className="mt-1 whitespace-pre-wrap text-sm text-slate-900">
        {text}
      </div>
    </div>
  );
}