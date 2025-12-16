"use client";

import { useState } from "react";

export default function HomePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

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
      fd.append("name", name);
      fd.append("email", email);
      fd.append("message", message);

      const res = await fetch("/api/contact", {
        method: "POST",
        body: fd, // IMPORTANT: don't set Content-Type manually for FormData
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || `Enquiry failed (${res.status})`);
      }

      setSuccess("Enquiry sent. We’ll get back to you soon.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-4xl font-semibold text-slate-100">
          One-Stop Microfluidics Shop
        </h1>
        <p className="mt-3 text-slate-300">
          Upload your design for an RFQ, or send an enquiry below.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="/upload"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-500"
          >
            Upload design (RFQ)
          </a>

          <a
            href="/portal"
            className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-950/40 px-5 py-2.5 text-sm font-medium text-slate-100 hover:bg-slate-900"
          >
            View my orders
          </a>
        </div>

        {/* CONTACT / ENQUIRY */}
        <section className="mt-12 rounded-2xl border border-slate-800 bg-slate-950/40 p-6">
          <h2 className="text-2xl font-semibold text-slate-100">Send enquiry</h2>
          <p className="mt-2 text-sm text-slate-300">
            Tell us what you’re trying to build and we’ll reply by email.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <Field label="Name">
              <input
                className={inputClass}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </Field>

            <Field label="Email *">
              <input
                className={inputClass}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
              />
            </Field>

            <Field label="Message *">
              <textarea
                className={textareaClass}
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What do you need? Material, size, quantity, deadline, bonding, etc."
              />
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

            {/* IMPORTANT: force clickability */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="relative z-10 pointer-events-auto inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Send enquiry"}
            </button>
          </form>
        </section>
      </div>
    </main>
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