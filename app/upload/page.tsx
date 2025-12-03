"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type ProcessOption = "3d_printing" | "cnc_machining" | "injection_molding";

export default function UploadPage() {
  const [submitting, setSubmitting] = useState(false);
  const [processes, setProcesses] = useState<ProcessOption[]>([]);

  const toggleProcess = (p: ProcessOption) => {
    setProcesses((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  };

  const processChecked = (p: ProcessOption) => processes.includes(p);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("processes", JSON.stringify(processes));

    try {
      const res = await fetch("/api/rfq", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("RFQ submission failed");

      alert("Thanks – we’ve received your details and will be in touch.");
      form.reset();
      setProcesses([]);
    } catch (err) {
      console.error(err);
      alert(
        "Something went wrong submitting your details. Please try again or email us directly."
      );
    } finally {
      setSubmitting(false);
    }
  };

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
                Prototype to production microfluidics
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-5 text-xs md:flex">
            <Link href="/" className="hover:text-sky-200">
              Home
            </Link>
          </nav>
        </div>
      </header>

      <main className="py-8 md:py-12">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-6 md:mb-8">
            <h1 className="text-xl font-semibold text-slate-900 md:text-2xl">
              Upload your microfluidic design to get started
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Use this form to share your design and basic requirements. We’ll
              review manufacturability and recommend a route across 3D
              printing, CNC machining and injection moulding for{" "}
              <strong>1 to 100,000+ units</strong>.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid gap-6 md:grid-cols-[2fr,1.4fr]"
            encType="multipart/form-data"
          >
            {/* LEFT */}
            <div className="space-y-5">
              {/* PROJECT DETAILS */}
              <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <h2 className="text-sm font-semibold text-slate-900">
                  1. Project details
                </h2>
                <div className="mt-3 space-y-3 text-sm">
                  <div>
                    <label className="block text-xs font-medium text-slate-700">
                      Project name
                    </label>
                    <input
                      name="project_name"
                      required
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                      placeholder="e.g. Diagnostic cartridge V1"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700">
                      Intended application
                    </label>
                    <input
                      name="application"
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                      placeholder="Diagnostic, organ-on-chip, sample prep, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700">
                      Manufacturing processes (select any that might be relevant)
                    </label>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs">
                      <ProcessChip
                        label="3D-printed microfluidics"
                        checked={processChecked("3d_printing")}
                        onClick={() => toggleProcess("3d_printing")}
                      />
                      <ProcessChip
                        label="CNC-machined microfluidics"
                        checked={processChecked("cnc_machining")}
                        onClick={() => toggleProcess("cnc_machining")}
                      />
                      <ProcessChip
                        label="Injection-moulded microfluidics"
                        checked={processChecked("injection_molding")}
                        onClick={() => toggleProcess("injection_molding")}
                      />
                    </div>
                    <p className="mt-1 text-[0.7rem] text-slate-500">
                      Not sure what to pick? That&apos;s normal. Roughly: 3D
                      printing suits very low volumes (1–50 units), CNC is ideal
                      for 10–1,000 units in production-grade plastics, and
                      injection moulding is used for 1,000–100,000+ units.
                      We&apos;ll always recommend a route based on your design
                      and volumes.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700">
                      Brief description of the device
                    </label>
                    <textarea
                      name="description"
                      rows={3}
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                      placeholder="Channel layout, key features, readout method, any critical dimensions..."
                    />
                  </div>
                </div>
              </section>

              {/* MATERIAL + VOLUMES */}
              <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <h2 className="text-sm font-semibold text-slate-900">
                  2. Material, volumes & timelines
                </h2>
                <div className="mt-3 grid gap-3 text-sm md:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium text-slate-700">
                      Primary material
                    </label>
                    <select
                      name="primary_material"
                      defaultValue="COC"
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                    >
                      <option value="COC">
                        COC (Cyclic Olefin Copolymer)
                      </option>
                      <option value="PC">Polycarbonate (PC)</option>
                      <option value="PMMA">PMMA</option>
                      <option value="3D_printed_generic">
                        3D-printed polymer (generic)
                      </option>
                      <option value="Other">
                        Other thermoplastic (specify below)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700">
                      Other material notes (optional)
                    </label>
                    <input
                      name="material_notes"
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                      placeholder="Grades, optical requirements, chemical resistance, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700">
                      Quantity requested
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      min={1}
                      required
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                      placeholder="e.g. 50"
                    />
                    <p className="mt-1 text-[0.7rem] text-slate-500">
                      Supported range: 1 – 100,000+ units.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700">
                      Stage / volume band
                    </label>
                    <select
                      name="volume_band"
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                    >
                      <option value="prototype">
                        Prototype (1–10 units)
                      </option>
                      <option value="early_testing">
                        Early testing (10–100 units)
                      </option>
                      <option value="pilot">
                        Pilot production (1,000–10,000 units)
                      </option>
                      <option value="production">
                        Production (10,000–100,000+ units)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700">
                      Target delivery date (optional)
                    </label>
                    <input
                      type="date"
                      name="delivery_date"
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-slate-700">
                      Additional technical notes
                    </label>
                    <textarea
                      name="technical_notes"
                      rows={2}
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                      placeholder="Optical surfaces, bonding preferences, tolerances, QC requirements..."
                    />
                  </div>
                </div>
              </section>

              {/* FILES */}
              <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <h2 className="text-sm font-semibold text-slate-900">
                  3. Upload files
                </h2>
                <div className="mt-3 space-y-3 text-sm">
                  <div>
                    <label className="block text-xs font-medium text-slate-700">
                      Design files
                    </label>
                    <p className="mt-1 text-[0.7rem] text-slate-500">
                      CAD or drawings: .step, .iges, .stl, .dxf, .dwg, .pdf,
                      .png, .jpg. You can upload multiple files.
                    </p>
                    <input
                      type="file"
                      name="design_files"
                      multiple
                      required
                      className="mt-2 block w-full text-xs text-slate-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700">
                      Additional documents (optional)
                    </label>
                    <input
                      type="file"
                      name="supporting_files"
                      multiple
                      className="mt-1 block w-full text-xs text-slate-700"
                    />
                    <p className="mt-1 text-[0.7rem] text-slate-500">
                      E.g. drawings, tolerance tables, QC specs or requirements
                      documents.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* RIGHT */}
            <aside className="space-y-5">
              <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <h2 className="text-sm font-semibold text-slate-900">
                  4. Contact details
                </h2>
                <div className="mt-3 space-y-3 text-sm">
                  <div>
                    <label className="block text-xs font-medium text-slate-700">
                      Your name
                    </label>
                    <input
                      name="contact_name"
                      required
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700">
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700">
                      Company
                    </label>
                    <input
                      name="company"
                      required
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700">
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700">
                      Country
                    </label>
                    <input
                      name="country"
                      required
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                      placeholder="We use this to check shipping and any security/IP constraints."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700">
                      Anything else we should know?
                    </label>
                    <textarea
                      name="extra_notes"
                      rows={3}
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                      placeholder="Timelines, regulatory context, internal approvals, etc."
                    />
                  </div>

                  <div className="mt-2 flex items-start gap-2">
                    <input
                      id="consent"
                      type="checkbox"
                      name="consent"
                      required
                      className="mt-1 h-3.5 w-3.5 rounded border-slate-300"
                    />
                    <label
                      htmlFor="consent"
                      className="text-[0.7rem] text-slate-600"
                    >
                      I agree for One Stop Microfludics Shop (GB-Tech Ltd) to
                      process this information to provide manufacturability
                      feedback and a quote. I understand technical details may
                      be shared under confidentiality where needed to obtain
                      manufacturing capacity.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-sky-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? "Sending details…" : "Get started now"}
                  </button>

                  <p className="mt-2 text-[0.7rem] text-slate-500">
                    After submission, we’ll review your design and follow up
                    with clarifying questions or indicative pricing for your
                    requested quantities, plus options to scale.
                  </p>
                </div>
              </section>

              <section className="rounded-2xl border border-dashed border-slate-300 bg-slate-100 p-4 text-xs text-slate-600">
                <p className="font-semibold text-slate-800">
                  What happens next?
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-4">
                  <li>We sanity-check geometry, materials and volumes.</li>
                  <li>We may ask follow-up questions to clarify the design.</li>
                  <li>
                    You receive manufacturability feedback and a quote for your
                    requested quantities.
                  </li>
                  <li>Once approved, we move into production and delivery.</li>
                </ul>
              </section>
            </aside>
          </form>
        </div>
      </main>
    </div>
  );
}

type ProcessChipProps = {
  label: string;
  checked: boolean;
  onClick: () => void;
};

function ProcessChip({ label, checked, onClick }: ProcessChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "rounded-full border px-3 py-1 text-[0.7rem] transition " +
        (checked
          ? "border-sky-500 bg-sky-50 text-sky-800"
          : "border-slate-300 bg-white text-slate-700 hover:border-sky-400")
      }
    >
      {label}
    </button>
  );
}