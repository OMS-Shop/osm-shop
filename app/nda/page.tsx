"use client";

import { FormEvent, useState } from "react";

const DOCUSIGN_POWERFORM_URL =
  "https://eu.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=533ef708-2f22-4818-9aea-ae2e926352e0&env=eu&acct=89d0e3a5-c054-4928-b907-5616ef013803&v=2";

export default function NdaPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!accepted) {
      setError("Please tick the box to confirm you accept the NDA.");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch("/api/nda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          version: "v1",
        }),
      });

      if (!res.ok) {
        throw new Error("NDA submission failed");
      }

      setMessage(
        "Thanks – your NDA acceptance has been recorded. You can now upload your designs."
      );
      setName("");
      setEmail("");
      setCompany("");
      setAccepted(false);
    } catch (err) {
      console.error(err);
      setError("Something went wrong submitting your NDA. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function openDocuSign() {
    window.open(DOCUSIGN_POWERFORM_URL, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-10">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold">
            One Stop Microfluidics Shop – NDA
          </h1>
          <p className="text-slate-300">
            Before we review your designs, we ask that you sign our mutual
            non-disclosure agreement (NDA). This protects both your IP and
            ours.
          </p>
        </header>

        {/* DocuSign section */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <h2 className="text-xl font-semibold">Step 1 – Sign the NDA</h2>
          <p className="text-slate-300">
            Click the button below to open the NDA in DocuSign. You can review
            the terms and sign electronically. A signed PDF copy will be emailed
            to you for your records.
          </p>
          <button
            type="button"
            onClick={openDocuSign}
            className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium bg-sky-500 hover:bg-sky-400 text-slate-950 transition"
          >
            Open DocuSign NDA
          </button>
        </section>

        {/* Portal logging section */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <h2 className="text-xl font-semibold">
            Step 2 – Confirm your details with OSM
          </h2>
          <p className="text-slate-300">
            After signing in DocuSign, please confirm your details here so we
            can link your NDA to your future RFQs in the portal.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Your name
              </label>
              <input
                className="w-full rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Email address
              </label>
              <input
                type="email"
                className="w-full rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Company name
              </label>
              <input
                className="w-full rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </div>

            <label className="flex items-start gap-2 text-sm text-slate-200">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="mt-1"
              />
              <span>
                I confirm that I (or my organisation) have signed the GB-Tech
                NDA in DocuSign and agree to be bound by its terms.
              </span>
            </label>

            {message && (
              <p className="text-sm text-emerald-400 bg-emerald-900/30 border border-emerald-700 rounded-md px-3 py-2">
                {message}
              </p>
            )}

            {error && (
              <p className="text-sm text-rose-400 bg-rose-900/30 border border-rose-700 rounded-md px-3 py-2">
                {error}
              </p>
            )}

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium bg-sky-500 hover:bg-sky-400 disabled:opacity-60 disabled:cursor-not-allowed text-slate-950 transition"
              >
                {isSubmitting ? "Submitting…" : "Confirm NDA & Continue"}
              </button>

              <a
                href="/upload"
                className="text-sm text-sky-300 hover:text-sky-200 underline underline-offset-4"
              >
                Go straight to upload page
              </a>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}