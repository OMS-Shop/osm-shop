"use client";

import * as React from "react";

function GreenTick() {
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-900/40 text-emerald-200">
      <svg
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <path
          d="M20 6L9 17l-5-5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-slate-200">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-slate-700/60 bg-slate-950/50 px-3 py-2 text-slate-100 placeholder:text-slate-500 outline-none focus:border-[#0f6fff] focus:ring-2 focus:ring-[#0f6fff]/25";

const textareaClass =
  "w-full rounded-xl border border-slate-700/60 bg-slate-950/50 px-3 py-2 text-slate-100 placeholder:text-slate-500 outline-none focus:border-[#0f6fff] focus:ring-2 focus:ring-[#0f6fff]/25";

export default function UploadPage() {
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  const formRef = React.useRef<HTMLFormElement | null>(null);
  const fileRef = React.useRef<HTMLInputElement | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!formRef.current) return;

    const fd = new FormData(formRef.current);
    const files = fileRef.current?.files;

    const email = String(fd.get("email") || "").trim();
    const contactName = String(fd.get("contactName") || "").trim();

    if (!contactName || !email) {
      setError("Please fill in required fields (customer name and email).");
      return;
    }
    if (!files || files.length === 0) {
      setError("Please attach at least one file.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/rfq", {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(txt || "Failed to submit RFQ.");
      }

      setSuccess(true);
      formRef.current.reset();
      if (fileRef.current) fileRef.current.value = "";
    } catch (err: any) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* Hard-override background (prevents any white page bleed from layouts) */}
      <div className="fixed inset-0 -z-10 bg-[#020617]" aria-hidden />

      {/* Ambient glow like the homepage */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="absolute -top-24 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[#0f6fff]/14 blur-3xl" />
        <div className="absolute -bottom-40 right-[-140px] h-[520px] w-[520px] rounded-full bg-slate-400/10 blur-3xl" />
        <div className="absolute -bottom-40 left-[-160px] h-[520px] w-[520px] rounded-full bg-[#0f6fff]/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-900/50 bg-emerald-950/30 px-3 py-1 text-xs text-emerald-100">
            <GreenTick />
            Upload & request a quote · Response typically within 1 working day
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Request a Quote (RFQ)
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            Upload your design files and key requirements. We’ll confirm feasibility and return a clear quote by email.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-rose-900/50 bg-rose-950/30 px-4 py-3 text-sm text-rose-100">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-xl border border-emerald-900/50 bg-emerald-950/30 px-4 py-3 text-sm text-emerald-100">
            Thanks — your RFQ has been submitted.
          </div>
        )}

        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="rounded-3xl border border-slate-700/60 bg-slate-900/55 p-6 shadow-[0_0_0_1px_rgba(148,163,184,0.10),0_40px_90px_-50px_rgba(15,111,255,0.45)] md:p-8"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Customer name *">
              <input
                name="contactName"
                required
                className={inputClass}
                placeholder="e.g. Jane Smith"
              />
            </Field>

            <Field label="Email *">
              <input
                type="email"
                name="email"
                required
                className={inputClass}
                placeholder="name@company.com"
              />
            </Field>

            <Field label="Company">
              <input
                name="company"
                className={inputClass}
                placeholder="Company / organisation"
              />
            </Field>

            <Field label="Project name">
              <input
                name="projectName"
                className={inputClass}
                placeholder="Optional"
              />
            </Field>

            <Field label="Country">
              <input name="country" className={inputClass} placeholder="Optional" />
            </Field>

            <Field label="Application">
              <input
                name="application"
                className={inputClass}
                placeholder="Diagnostics, research, etc."
              />
            </Field>

            <Field label="Quantity">
              <input
                name="quantity"
                className={inputClass}
                placeholder="e.g. 10, 100, 1000"
              />
            </Field>

            <Field label="Primary material">
              <input
                name="primaryMaterial"
                className={inputClass}
                placeholder="COC, COP, PC, PMMA, etc."
              />
            </Field>

            <div className="md:col-span-2">
              <Field label="Stage (optional)">
                <input
                  name="stage"
                  className={inputClass}
                  placeholder="Prototype / pilot / scale-up"
                />
              </Field>
            </div>
          </div>

          <div className="mt-6">
            <Field label="Notes">
              <textarea
                name="notes"
                rows={4}
                className={textareaClass}
                placeholder="Key tolerances, timelines, bonding/sealing needs, preferred route, etc."
              />
            </Field>
          </div>

          <div className="mt-6">
            <Field label="Upload files *">
              <div className="rounded-2xl border border-slate-700/60 bg-slate-950/40 p-4">
                <input
                  ref={fileRef}
                  type="file"
                  name="files"
                  multiple
                  required
                  className="block w-full text-sm text-slate-200 file:mr-4 file:rounded-full file:border-0 file:bg-[#0f6fff] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#1d72ff]"
                />
                <p className="mt-2 text-xs text-slate-400">
                  Upload CAD (STEP/STL), drawings (PDF), and any supporting notes.
                </p>
              </div>
            </Field>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-7 w-full rounded-full bg-[#0f6fff] px-5 py-3 text-sm font-semibold text-white shadow hover:bg-[#1d72ff] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit RFQ"}
          </button>
        </form>
      </div>
    </>
  );
}