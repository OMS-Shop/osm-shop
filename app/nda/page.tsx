"use client";

import { FormEvent, useState } from "react";

const DOCUSIGN_POWERFORM_URL =
  "https://eu.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=533ef708-2f22-4818-9aea-ae2e926352e0&env=eu&acct=89d0e3a5-c054-4928-b907-5616ef013803&v=2";

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#1d72ff] focus:ring-2 focus:ring-[#1d72ff]/20";

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
    <main className="min-h-screen bg-white text-slate-900">
      {/* Light ambient background (matches Home/Upload) */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -top-28 left-1/2 h-[520px] w-[980px] -translate-x-1/2 rounded-full bg-[#1d72ff]/10 blur-3xl" />
        <div className="absolute -bottom-48 right-[-180px] h-[520px] w-[520px] rounded-full bg-[#1d72ff]/08 blur-3xl" />
        <div className="absolute -bottom-48 left-[-180px] h-[520px] w-[520px] rounded-full bg-slate-200/60 blur-3xl" />
      </div>

      <div className="mx-auto max-w-3xl px-6 py-12 space-y-10">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Confidentiality - Sign our NDA
          </h1>
          <p className="text-slate-600">
            If you would like some piece of mind before submitting your designs, you can sign our mutual
            non-disclosure agreement (NDA). Though, this is not mandatory - the decision belongs to you.
          </p>
        </header>

        {/* Step 1 */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl space-y-4 md:p-8">
          <h2 className="text-xl font-semibold text-slate-900">
            Step 1 – Sign the NDA
          </h2>
          <p className="text-slate-600">
            Click the button below to open the NDA in DocuSign. You can review
            the terms and sign electronically. A signed PDF copy will be emailed
            to you for your records.
          </p>
          <button
            type="button"
            onClick={openDocuSign}
            className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold bg-[#1d72ff] hover:brightness-110 text-white transition"
          >
            Open DocuSign NDA
          </button>
        </section>

        {/* Step 2 */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl space-y-4 md:p-8">
          <h2 className="text-xl font-semibold text-slate-900">
            Step 2 – Confirm your details with OSMS
          </h2>
          <p className="text-slate-600">
            After signing in DocuSign, please confirm your details here so we
            can link your NDA to your future RFQs in the portal.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700">
                Your Name
              </label>
              <input
                className={inputClass}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="e.g. Jane Smith"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700">
                Email Address
              </label>
              <input
                type="email"
                className={inputClass}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="name@company.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700">
                Company Name / Organisation
              </label>
              <input
                className={inputClass}
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
                placeholder="Company / Organisation"
              />
            </div>

            <label className="flex items-start gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-[#1d72ff] focus:ring-[#1d72ff]/30"
              />
              <span>
                I confirm that I (or my organisation) have signed the GB-Tech NDA
                in DocuSign and agree to be bound by its terms.
              </span>
            </label>

            {message && (
              <p className="text-sm text-emerald-900 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">
                {message}
              </p>
            )}

            {error && (
              <p className="text-sm text-rose-900 bg-rose-50 border border-rose-200 rounded-xl px-3 py-2">
                {error}
              </p>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold bg-[#1d72ff] hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed text-white transition"
              >
                {isSubmitting ? "Submitting…" : "Confirm NDA & Continue"}
              </button>

              <a
                href="/upload"
                className="text-sm text-[#1d72ff] hover:underline underline-offset-4"
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