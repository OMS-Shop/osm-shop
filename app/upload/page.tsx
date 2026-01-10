"use client";

import * as React from "react";

function GreenTick() {
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200">
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
      <label className="text-sm font-medium text-slate-700">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#1d72ff] focus:ring-2 focus:ring-[#1d72ff]/20";

const textareaClass =
  "w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#1d72ff] focus:ring-2 focus:ring-[#1d72ff]/20";

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
      {/* Light ambient background (matches new site theme) */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-white" aria-hidden>
        <div className="absolute -top-28 left-1/2 h-[520px] w-[980px] -translate-x-1/2 rounded-full bg-[#1d72ff]/10 blur-3xl" />
        <div className="absolute -bottom-48 right-[-180px] h-[520px] w-[520px] rounded-full bg-[#1d72ff]/08 blur-3xl" />
        <div className="absolute -bottom-48 left-[-180px] h-[520px] w-[520px] rounded-full bg-slate-200/60 blur-3xl" />
      </div>

      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs text-emerald-900">
            <GreenTick />
            Upload &amp; request a quote · Response typically within 1 working day
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Request a Quote (RFQ)
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Upload your design files and key requirements. We’ll confirm feasibility and return a clear quote by email.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            Thanks — your RFQ has been submitted.
          </div>
        )}

        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl md:p-8"
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
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <input
                  ref={fileRef}
                  type="file"
                  name="files"
                  multiple
                  required
                  className="block w-full text-sm text-slate-700 file:mr-4 file:rounded-full file:border-0 file:bg-[#1d72ff] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:brightness-110"
                />
                <p className="mt-2 text-xs text-slate-500">
                  Upload CAD (STEP/STL), drawings (PDF), and any supporting notes.
                </p>
              </div>
            </Field>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-7 w-full rounded-full bg-[#1d72ff] px-5 py-3 text-sm font-semibold text-white shadow hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit RFQ"}
          </button>
        </form>
      </div>
    </>
  );
}