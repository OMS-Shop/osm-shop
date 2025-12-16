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

      // ✅ IMPORTANT: this is the customer name we need
      fd.append("contactName", contactName);

      fd.append("projectName", projectName);
      fd.append("company", company);
      fd.append("email", email);
      fd.append("country", country);
      fd.append("application", application);
      fd.append("quantity", quantity);
      fd.append("primaryMaterial", primaryMaterial);
      fd.append("stage", stage);
      fd.append("notes", notes);

      files.forEach((f) => fd.append("files", f));

      const res = await fetch("/api/rfq", {
        method: "POST",
        body: fd, // ✅ DO NOT set Content-Type manually for FormData
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || `RFQ failed (${res.status})`);
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
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Request a Quote (RFQ)</h1>

      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Customer name *">
          <input
            className="w-full rounded border px-3 py-2"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            required
          />
        </Field>

        <Field label="Email *">
          <input
            className="w-full rounded border px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
        </Field>

        <Field label="Company">
          <input
            className="w-full rounded border px-3 py-2"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </Field>

        <Field label="Project name">
          <input
            className="w-full rounded border px-3 py-2"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </Field>

        <Field label="Country">
          <input
            className="w-full rounded border px-3 py-2"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Field>

        <Field label="Application">
          <input
            className="w-full rounded border px-3 py-2"
            value={application}
            onChange={(e) => setApplication(e.target.value)}
          />
        </Field>

        <Field label="Quantity">
          <input
            className="w-full rounded border px-3 py-2"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </Field>

        <Field label="Primary material">
          <input
            className="w-full rounded border px-3 py-2"
            value={primaryMaterial}
            onChange={(e) => setPrimaryMaterial(e.target.value)}
          />
        </Field>

        <Field label="Stage">
          <input
            className="w-full rounded border px-3 py-2"
            value={stage}
            onChange={(e) => setStage(e.target.value)}
          />
        </Field>

        <Field label="Notes">
          <textarea
            className="w-full rounded border px-3 py-2"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={5}
          />
        </Field>

        <Field label="Files">
          <input
            className="w-full"
            type="file"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files || []))}
          />
        </Field>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-green-600">{success}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded px-4 py-2 border"
        >
          {isSubmitting ? "Submitting..." : "Submit RFQ"}
        </button>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}