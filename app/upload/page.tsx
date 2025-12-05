// app/upload/page.tsx
import Link from "next/link";

export default function UploadPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)]">

          {/* LEFT PANEL */}
          <section className="rounded-2xl bg-slate-900/70 border border-slate-700 p-6 md:p-8">
            <h1 className="text-2xl font-semibold mb-4">
              Upload your design &amp; get started
            </h1>
            <p className="text-sm text-slate-200 mb-4">
              Send us your design files and basic project information.
              We&apos;ll review the details and come back to you with a quote
              by email.
            </p>

            <div className="mt-6 rounded-xl bg-slate-950/40 border border-slate-700 p-4">
              <h2 className="text-sm font-semibold mb-1">
                NDA &amp; confidentiality
              </h2>
              <p className="text-xs text-slate-200">
                If you prefer to sign our mutual NDA before sharing files,
                you can do that on our{" "}
                <Link
                  href="/nda"
                  className="text-sky-400 hover:text-sky-300 underline underline-offset-2"
                >
                  NDA page
                </Link>
                . You&apos;ll receive a signed PDF for your records.
              </p>
            </div>

            <p className="mt-6 text-xs text-slate-300">
              Volume range: <span className="font-semibold">1–100k+ parts</span>
            </p>
          </section>

          {/* RIGHT PANEL – FORM */}
          <section className="rounded-2xl bg-slate-900/70 border border-slate-700 p-6 md:p-8">
            <form
              action="/api/rfq"
              method="POST"
              encType="multipart/form-data"
              className="space-y-5"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-200">
                    Project name
                  </label>
                  <input
                    name="projectName"
                    required
                    placeholder="e.g. COC mixer prototype"
                    className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm outline-none focus:border-sky-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-200">
                    Company
                  </label>
                  <input
                    name="company"
                    placeholder="Your organisation"
                    className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-200">
                    Contact email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@company.com"
                    className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm outline-none focus:border-sky-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-200">
                    Country
                  </label>
                  <input
                    name="country"
                    placeholder="e.g. United Kingdom"
                    className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">
                  Application / brief description
                </label>
                <textarea
                  name="application"
                  rows={4}
                  placeholder="Tell us what the device is used for, key requirements, and anything we should know."
                  className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm outline-none focus:border-sky-400"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-200">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    min={1}
                    required
                    placeholder="e.g. 50"
                    className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm outline-none focus:border-sky-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-200">
                    Primary material
                  </label>
                  <select
                    name="primaryMaterial"
                    required
                    className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm outline-none focus:border-sky-400"
                  >
                    <option value="">Select a material</option>
                    <option value="COC">COC</option>
                    <option value="polycarbonate">Polycarbonate</option>
                    <option value="other">Other engineering thermoplastic</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-200">
                    Stage
                  </label>
                  <select
                    name="stage"
                    required
                    className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm outline-none focus:border-sky-400"
                  >
                    <option value="">Select stage</option>
                    <option value="prototype">Prototype</option>
                    <option value="pilot">Pilot run</option>
                    <option value="production">Production</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">
                  Technical notes for our team (optional)
                </label>
                <textarea
                  name="notes"
                  rows={3}
                  placeholder="Any tolerances, critical features, or test requirements."
                  className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm outline-none focus:border-sky-400"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-200">
                    Design file (CAD / drawing / Gerber)
                  </label>
                  <input
                    type="file"
                    name="designFile"
                    required
                    className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-1.5 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-sky-500 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-slate-950 hover:file:bg-sky-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-200">
                    Supporting files (optional)
                  </label>
                  <input
                    type="file"
                    name="supportingFiles"
                    multiple
                    className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-1.5 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-slate-700 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-slate-50 hover:file:bg-slate-600"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full md:w-auto rounded-full bg-sky-500 px-10 py-3 text-sm font-semibold text-slate-950 hover:bg-sky-400 transition-colors"
                >
                  Get started
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}