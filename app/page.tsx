import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-[#020617]">
      {/* HERO */}
      <section className="mx-auto max-w-screen-2xl px-6 pt-10 pb-10">
        <div className="relative overflow-hidden rounded-3xl border border-slate-800/60 bg-gradient-to-br from-[#06142a] via-[#041026] to-[#020617] p-8 md:p-12">
          {/* subtle glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#4aa3ff]/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-24 -bottom-24 h-96 w-96 rounded-full bg-emerald-400/5 blur-3xl" />

          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* left */}
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-100">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20">
                  ✓
                </span>
                Upload &amp; request a quote • Response typically within 1 working day
              </div>

              <h1 className="mt-8 text-4xl font-semibold leading-tight text-white md:text-6xl">
                From <span className="text-[#4aa3ff]">1</span> to{" "}
                <span className="text-[#4aa3ff]">100,000+</span> units of microfluidic
                parts — through one portal
              </h1>

              <p className="mt-6 text-sm leading-7 text-slate-300 md:text-base">
                We coordinate microfluidic manufacturing across 3D printing, CNC
                machining, bonding/sealing, and injection moulding. Upload once and
                we guide you from early prototypes through to volume production.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/upload"
                  className="rounded-full bg-[#4aa3ff] px-6 py-3 text-sm font-semibold text-white shadow hover:bg-[#1d72ff]"
                >
                  Upload design &amp; get started
                </Link>

                <Link
                  href="/nda"
                  className="rounded-full border border-slate-500/70 bg-transparent px-6 py-3 text-sm font-semibold text-slate-100 hover:border-slate-300"
                >
                  Request NDA
                </Link>
              </div>

              <p className="mt-4 text-sm text-slate-400">
                Comparing materials (PMMA vs PC vs COC/COP vs 3D print)?{" "}
                <Link href="/resources#material-parameters" className="text-[#4aa3ff] hover:text-white">
                  See material parameters.
                </Link>
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="flex gap-3">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-200">
                    ✓
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      Single RFQ pack
                    </div>
                    <div className="text-sm text-slate-300">
                      send files, quantities and key requirements once.
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-200">
                    ✓
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      DFM guidance
                    </div>
                    <div className="text-sm text-slate-300">
                      to pick the right process early.
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-200">
                    ✓
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      COC is mould-ready
                    </div>
                    <div className="text-sm text-slate-300">
                      and commonly selected for scale-up.
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-200">
                    ✓
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      Bonding ready
                    </div>
                    <div className="text-sm text-slate-300">
                      thermal bonding methods which do not introduce chemical
                      contamination or crazing of the channels.
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-sm text-slate-400">
                No up-front commitment. We&apos;ll review your request and respond by email.
              </p>
            </div>

            {/* right */}
            <div className="relative">
              <div className="overflow-hidden rounded-3xl border border-slate-800/60 bg-slate-900/30 shadow-2xl">
                <img
                  src="/microfluidic-spiral.jpg"
                  alt="COC microfluidic spiral part"
                  className="h-[360px] w-full object-cover md:h-[420px]"
                />
                <div className="border-t border-slate-800/60 bg-slate-900/40 p-6">
                  <div className="text-lg font-semibold text-white">
                    COC &amp; polycarbonate microfluidics
                  </div>
                  <p className="mt-2 text-sm text-slate-300">
                    Precision components for diagnostics, life-science and quantum devices — built
                    for repeatability and scale-up.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* (Rest of the page continues as-is in your repo below this point) */}
      {/* IMPORTANT: If your file has more sections below, keep them below exactly as before. */}
    </main>
  );
}