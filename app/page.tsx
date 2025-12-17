import Image from "next/image";
import Link from "next/link";

/**
 * ========================= GUARDRAILS (DO NOT REMOVE) =========================
 * This file is the HOME/LANDING page.
 *
 * 1) DO NOT delete or rename these anchor IDs (header links depend on them):
 *    - #how-it-works
 *    - #processes
 *    - #confidentiality
 *    - #contact
 *
 * 2) If you do a “clean replace”, keep these sections present:
 *    - How it works section
 *    - Processes & volumes section
 *    - Confidentiality section
 *    - Contact section
 *
 * 3) Hero layout rule:
 *    - If you adjust hero spacing, DO NOT change the layout/spacing of sections below.
 *    - Only tweak the hero container/grid/card classes.
 * ============================================================================
 */

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

function GreenTick({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-400/25 ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4.5 w-4.5 text-emerald-300"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </span>
  );
}

function ArrowRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7 text-white/70"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h12" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

export default function HomePage({ searchParams }: PageProps) {
  const enquirySent = searchParams?.enquiry === "sent";

  return (
    <div className="relative bg-[#020617]">
      {/* Ambient background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-24 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[#0ea5e9]/18 blur-[90px]" />
        <div className="absolute -bottom-40 left-1/3 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-500/12 blur-[110px]" />
      </div>

      {/* ================= HERO ================= */}
      <section className="relative mx-auto max-w-7xl px-8 pb-14 pt-10 md:pt-14">
        {/* NOTE: changed lg:items-center -> lg:items-start to lift hero image up */}
        <div className="grid gap-10 lg:grid-cols-[1.05fr_minmax(0,1fr)] lg:items-start">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/5 px-4 py-1.5 text-xs text-slate-200">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-400/25">
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 text-emerald-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span>
              Upload &amp; request a quote • Response typically within 1 working
              day
            </div>

            <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-white md:text-6xl">
              From <span className="text-[#3b82f6]">1</span> to{" "}
              <span className="text-[#3b82f6]">100,000+</span> units of
              microfluidic parts —<br className="hidden md:block" /> through one
              portal
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300">
              We coordinate microfluidic manufacturing across 3D printing, CNC
              machining, bonding/sealing, and injection moulding. Upload your
              design once and we’ll guide you from early prototypes through to
              volume production.
            </p>

            {/* Buttons (KEEP INLINE) */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/upload"
                className="rounded-full bg-[#0ea5e9] px-6 py-3 text-sm font-extrabold text-white shadow hover:bg-[#0284c7] transition-colors"
              >
                Upload &amp; request a quote
              </Link>
              <Link
                href="/portal"
                className="rounded-full border border-slate-500 px-5 py-3 text-sm font-semibold text-slate-100 hover:border-slate-200 hover:text-white transition-colors"
              >
                View my orders
              </Link>
              <Link
                href="/nda"
                className="rounded-full border border-slate-500 px-5 py-3 text-sm font-semibold text-slate-100 hover:border-slate-200 hover:text-white transition-colors"
              >
                Request NDA
              </Link>
            </div>

            <p className="mt-4 text-sm text-slate-400">
              Comparing materials (PMMA vs PC vs COC/COP vs 3D print)?{" "}
              <Link
                href="/resources#material-parameters"
                className="text-[#3b82f6] hover:underline"
              >
                See material parameters.
              </Link>
            </p>

            {/* 4 value bullets */}
            <div className="mt-8 grid gap-x-10 gap-y-5 md:grid-cols-2">
              <div className="flex items-start gap-3">
                <GreenTick className="mt-0.5" />
                <p className="text-base text-slate-200">
                  <span className="font-semibold text-white">
                    Single RFQ pack
                  </span>{" "}
                  — files, material, volumes, target date.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <GreenTick className="mt-0.5" />
                <p className="text-base text-slate-200">
                  <span className="font-semibold text-white">
                    DFM guidance
                  </span>{" "}
                  to pick the right process early.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <GreenTick className="mt-0.5" />
                <p className="text-base text-slate-200">
                  <span className="font-semibold text-white">
                    COC is mould-ready
                  </span>{" "}
                  and commonly selected for scale-up.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <GreenTick className="mt-0.5" />
                <p className="text-base text-slate-200">
                  <span className="font-semibold text-white">Bonding ready</span>{" "}
                  — thermal bonding methods which do not introduce chemical
                  contamination or crazing of the channels.
                </p>
              </div>
            </div>

            <p className="mt-7 text-sm text-slate-400">
              No up-front commitment. We’ll review your request and respond by
              email.
            </p>
          </div>

          {/* Right image card */}
          <div className="relative lg:self-start">
            <div className="overflow-hidden rounded-[28px] border border-slate-700/60 bg-slate-900/60 shadow-[0_0_80px_rgba(59,130,246,0.12)]">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/microfluidic-spiral.jpg"
                  alt="COC microfluidic spiral part"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="border-t border-slate-700/60 bg-slate-900/80 px-6 py-5">
                <p className="text-sm font-semibold text-white">
                  COC &amp; polycarbonate microfluidics
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  Precision components for diagnostics, life-science and quantum
                  devices — built for repeatability and scale-up.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section
        id="how-it-works"
        className="relative mx-auto max-w-7xl px-8 pb-14 scroll-mt-28"
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">How it works</h2>
            <p className="mt-2 text-slate-300">
              A simple workflow designed to reduce back-and-forth and get you to
              parts quickly.
            </p>
          </div>
          <Link
            href="/upload"
            className="hidden md:inline-flex rounded-full border border-slate-500 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:border-slate-200 hover:text-white transition-colors"
          >
            Start an RFQ
          </Link>
        </div>

        <div className="grid items-center gap-5 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-6 shadow-[0_0_120px_rgba(59,130,246,0.10)]">
            <p className="text-sm font-semibold text-white">
              1. Upload your design
            </p>
            <p className="mt-3 text-sm text-slate-300">
              Send CAD + a few key details (material, quantity, target date).
            </p>
          </div>

          <div className="hidden md:flex justify-center">
            <ArrowRight />
          </div>

          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-6 shadow-[0_0_120px_rgba(59,130,246,0.10)]">
            <p className="text-sm font-semibold text-white">
              2. We prepare a quote
            </p>
            <p className="mt-3 text-sm text-slate-300">
              We run a quick DFM check and return a clear quote by email.
            </p>
          </div>

          <div className="hidden md:flex justify-center">
            <ArrowRight />
          </div>

          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-6 shadow-[0_0_120px_rgba(59,130,246,0.10)]">
            <p className="text-sm font-semibold text-white">
              3. Manufacture &amp; delivery
            </p>
            <p className="mt-3 text-sm text-slate-300">
              Once approved, we coordinate production and keep you updated.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          DO NOT DELETE: Processes & volumes section (header links depend on #processes)
      ========================================================= */}
      <section
        id="processes"
        className="relative mx-auto max-w-7xl px-8 pb-14 scroll-mt-28"
      >
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-6 shadow-[0_0_120px_rgba(59,130,246,0.10)]">
            <p className="text-xs font-semibold tracking-wide text-slate-400">
              VOLUME RANGE
            </p>
            <p className="mt-2 text-base font-semibold text-white">
              1–100k+ units
            </p>
            <p className="mt-2 text-sm text-slate-300">
              First articles → pilots → scale-up → recurring production.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-6 shadow-[0_0_120px_rgba(59,130,246,0.10)]">
            <p className="text-xs font-semibold tracking-wide text-slate-400">
              MATERIALS
            </p>
            <p className="mt-2 text-base font-semibold text-white">
              COC · COP · PC · PMMA
            </p>
            <p className="mt-2 text-sm text-slate-300">
              Mould-ready options for scale-up.{" "}
              <Link
                href="/resources#material-parameters"
                className="text-[#3b82f6] hover:underline"
              >
                See material parameters.
              </Link>
            </p>
          </div>

          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-6 shadow-[0_0_120px_rgba(59,130,246,0.10)]">
            <p className="text-xs font-semibold tracking-wide text-slate-400">
              ROUTES
            </p>
            <p className="mt-2 text-base font-semibold text-white">
              3D print · CNC · mould
            </p>
            <p className="mt-2 text-sm text-slate-300">
              We match your design to the best route for cost + performance.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          DO NOT DELETE: Confidentiality section (header links depend on #confidentiality)
      ========================================================= */}
      <section
        id="confidentiality"
        className="relative mx-auto max-w-7xl px-8 pb-14 scroll-mt-28"
      >
        <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-6 shadow-[0_0_140px_rgba(59,130,246,0.10)]">
          <h2 className="text-lg font-bold text-white">Confidential by design</h2>
          <p className="mt-3 max-w-4xl text-sm text-slate-300">
            Your designs and data are handled under strict confidentiality.{" "}
            <Link href="/nda" className="text-[#3b82f6] hover:underline">
              NDAs are available on request
            </Link>{" "}
            and we only share the minimum technical detail required for
            manufacture.
          </p>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section
        id="contact"
        className="relative mx-auto max-w-7xl px-8 pb-20 scroll-mt-28"
      >
        <div className="grid gap-8 md:grid-cols-[1.1fr_minmax(0,1fr)]">
          <div>
            <h2 className="text-lg font-bold text-white">
              Talk to us about your next run
            </h2>
            <p className="mt-3 max-w-xl text-sm text-slate-300">
              Not sure if your design is ready, or exploring production options?
              Send us a short message and we’ll respond by email, usually within
              one working day.
            </p>
          </div>

          <form
            action="/api/contact"
            method="post"
            className="space-y-3 rounded-2xl border border-slate-700/50 bg-slate-900/50 p-6 shadow-[0_0_140px_rgba(59,130,246,0.10)]"
          >
            <div className="space-y-1 text-sm">
              <label className="block text-slate-300" htmlFor="name">
                Your name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-[#0ea5e9]"
                placeholder="e.g. Jane Doe"
              />
            </div>

            <div className="space-y-1 text-sm">
              <label className="block text-slate-300" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-[#0ea5e9]"
                placeholder="you@company.com"
              />
            </div>

            <div className="space-y-1 text-sm">
              <label className="block text-slate-300" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-[#0ea5e9]"
                placeholder="Tell us briefly about your device, volumes and timelines."
              />
            </div>

            {enquirySent ? (
              <div className="rounded-xl border border-emerald-400/25 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                Enquiry sent successfully.
              </div>
            ) : null}

            <button
              type="submit"
              className="mt-2 w-full rounded-full bg-[#0ea5e9] px-4 py-2.5 text-sm font-extrabold text-white hover:bg-[#0284c7] transition-colors"
            >
              Send enquiry
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}