"use client";

import { useState } from "react";

export default function UploadPage() {
  const [contactName, setContactName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [application, setApplication] = useState("");
  const [quantity, setQuantity] = useState("");
  const [primaryMaterial, setPrimaryMaterial] = useState("");
  const [stage, setStage] = useState("");
  const [notes, setNotes] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      const fd = new FormData();

      fd.append("contactName", contactName);
      fd.append("email", email);

      fd.append("projectName", projectName);
      fd.append("company", company);
      fd.append("country", country);
      fd.append("application", application);
      fd.append("quantity", quantity);
      fd.append("primaryMaterial", primaryMaterial);
      fd.append("stage", stage);
      fd.append("notes", notes);

      files.forEach((f) => fd.append("files", f));

      const res = await fetch("/api/rfq", {
        method: "POST",
        body: fd,
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        const resendMsg =
          data?.resend?.message ||
          data?.resend?.error ||
          (data?.resend ? JSON.stringify(data.resend) : "");

        const msg = [data?.error, resendMsg].filter(Boolean).join(" — ");
        throw new Error(msg || `RFQ failed (${res.status})`);
      }

      setSuccess("RFQ sent successfully.");
      setContactName("");
      setProjectName("");
      setCompany("");
      setEmail("");
      setCountry("");
      setApplication("");
      setQuantity("");
      setPrimaryMaterial("");
      setStage("");
      setNotes("");
      setFiles([]);
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-semibold text-slate-100">Request a Quote (RFQ)</h1>
      <p className="mt-2 text-sm text-slate-300">
        Upload your design files and tell us what you need. We’ll respond with a quote and lead time.
      </p>

      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950/40 p-6 shadow-sm">
        <form onSubmit={onSubmit} className="space-y-5">
          <Field label="Customer name *">
            <input
              className={inputClass}
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="e.g. Jane Smith"
              required
            />
          </Field>

          <Field label="Email *">
            <input
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="name@company.com"
              required
            />
          </Field>

          <Field label="Company">
            <input
              className={inputClass}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company / organisation"
            />
          </Field>

          <Field label="Project name">
            <input
              className={inputClass}
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Optional"
            />
          </Field>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Country">
              <input
                className={inputClass}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Optional"
              />
            </Field>

            <Field label="Application">
              <input
                className={inputClass}
                value={application}
                onChange={(e) => setApplication(e.target.value)}
                placeholder="Diagnostics, research, etc."
              />
            </Field>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Quantity">
              <input
                className={inputClass}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g. 10, 100, 1000"
              />
            </Field>

            <Field label="Primary material">
              <input
                className={inputClass}
                value={primaryMaterial}
                onChange={(e) => setPrimaryMaterial(e.target.value)}
                placeholder="COC, PMMA, glass, etc."
              />
            </Field>
          </div>

          <Field label="Stage">
            <input
              className={inputClass}
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              placeholder="Prototype / pilot / scale-up"
            />
          </Field>

          <Field label="Notes">
            <textarea
              className={textareaClass}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={5}
              placeholder="Key tolerances, bonding needs, target date, special requirements…"
            />
          </Field>

          <Field label="Files">
            <input
              className="block w-full text-sm text-slate-200 file:mr-4 file:rounded-lg file:border-0 file:bg-slate-800 file:px-4 file:py-2 file:text-slate-100 hover:file:bg-slate-700"
              type="file"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files || []))}
            />
            <p className="mt-2 text-xs text-slate-400">
              Add CAD, drawings, screenshots, or a short spec PDF.
            </p>
          </Field>

          {error && (
            <div className="rounded-lg border border-red-900/40 bg-red-950/30 p-3 text-sm text-red-200">
              {error}
            </div>
          )}
          {success && (
            <div className="rounded-lg border border-emerald-900/40 bg-emerald-950/30 p-3 text-sm text-emerald-200">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Submit RFQ"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-slate-200">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-slate-800 bg-slate-950/50 px-3 py-2 text-slate-100 placeholder:text-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30";

const textareaClass =
  "w-full rounded-xl border border-slate-800 bg-slate-950/50 px-3 py-2 text-slate-100 placeholder:text-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30";