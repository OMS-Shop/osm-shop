import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import EnquiryAlert from "./components/EnquiryAlert";

function GreenTick({ className = "" }: { className?: string }) {
  return (
    <span
      className={[
        "inline-flex h-7 w-7 items-center justify-center rounded-full",
        "bg-emerald-500/15 ring-1 ring-emerald-400/25",
        className,
      ].join(" ")}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 text-emerald-200"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </span>
  );
}

function Arrow() {
  return (
    <div className="hidden lg:flex items-center justify-center px-2">
      <svg
        viewBox="0 0 24 24"
        className="h-7 w-7 text-white/60"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 12h12" />
        <path d="M13 6l6 6-6 6" />
      </svg>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="relative bg-[#020617] text-white">
      {/* =========================================================
         GUARDRAILS (do not remove):
         - HERO
         - HOW IT WORKS
         - PROCESSES & VOLUMES (title + 3 cards)
         - CONFIDENTIALITY
         - CONTACT FORM (with enquiry success banner)
      ========================================================== */}

      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-[520px] w-[980px] -translate-x-1/2 rounded-full bg-[#0f6fff]/20 blur-[120px]" />
        <div className="absolute bottom-[-220px] right-[-120px] h-[520px] w-[520px] rounded-full bg-cyan-400/10 blur-[120px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020617]" />
      </div>

      {/* ===== HERO ===== */}
      <section className="relative mx-auto max-w-7xl px-6 pt-10 pb-12 md:pt-14">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          {/* Left */}
          <div className="min-w-0">
            <div className="inline-flex items-center gap-3 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-4 py-2 text-sm text-white/90">
              <GreenTick className="h-6 w-6" />
              <span>Upload &amp; request a quote • Response typically within 1 working day</span>
            </div>

            <h1 className="mt-7 text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              From{" "}
              <span className="text-[#4d86ff]">1</span>{" "}
              to{" "}
              <span className="text-[#4d86ff]">100,000+</span>{" "}
              units of microfluidic parts — through one portal
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300">
              We coordinate microfluidic manufacturing across 3D printing, CNC machining,
              bonding/sealing, and injection moulding. Upload once and we guide you from early
              prototypes through to volume production.
            </p>

            {/* Buttons row (keep inline on desktop) */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/upload"
                className="rounded-full bg-[#0f6fff] px-6 py-3 text-sm font-semibold text-white shadow hover:bg-[#1d72ff]"
              >
                Upload design &amp; get started
              </Link>

              <Link
                href="/portal"
                className="rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:border-white/40"
              >
                View my orders
              </Link>

              <Link
                href="/nda"
                className="rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:border-white/40"
              >
                Request NDA
              </Link>
            </div>

            <p className="mt-4 text-sm text-slate-400">
              Comparing materials (PMMA vs PC vs COC/COP vs 3D print)?{" "}
              <Link href="/resources#material-parameters" className="text-[#4d86ff] hover:underline">
                See material parameters.
              </Link>
            </p>

            {/* Hero bullets with green ticks */}
            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <div className="flex gap-3">
                <GreenTick />
                <p className="text-base text-slate-200">
                  <span className="font-semibold text-white">Single RFQ pack</span> — send files,
                  quantities and key requirements once.
                </p>
              </div>

              <div className="flex gap-3">
                <GreenTick />
                <p className="text-base text-slate-200">
                  <span className="font-semibold text-white">DFM guidance</span> to pick the right
                  process early.
                </p>
              </div>

              <div className="flex gap-3">
                <GreenTick />
                <p className="text-base text-slate-200">
                  <span className="font-semibold text-white">COC is mould-ready</span> and commonly
                  selected for scale-up.
                </p>
              </div>

              <div className="flex gap-3">
                <GreenTick />
                <p className="text-base text-slate-200">
                  <span className="font-semibold text-white">Bonding ready</span> — thermal bonding
                  methods which do not introduce chemical contamination or crazing of the channels.
                </p>
              </div>
            </div>

            <p className="mt-8 text-sm text-slate-400">
              No up-front commitment. We&apos;ll review your request and respond by email.
            </p>
          </div>

          {/* Right: image card */}
          <div className="min-w-0 lg:-mt-6">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/microfluidic-spiral.jpg"
                  alt="COC microfluidic spiral part"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="border-t border-white/10 bg-white/5 px-6 py-5">
                <p className="text-base font-semibold text-white">
                  COC &amp; polycarbonate microfluidics
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  Precision components for diagnostics, life-science and quantum devices — built for
                  repeatability and scale-up.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="relative mx-auto max-w-7xl px-6 pb-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">How it works</h2>
            <p className="mt-2 text-base text-slate-300">
              A simple workflow designed to reduce back-and-forth and get you to parts quickly.
            </p>
          </div>

          <Link
            href="/upload"
            className="hidden sm:inline-flex rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:border-white/40"
          >
            Start an RFQ
          </Link>
        </div>

        <div className="mt-7 flex flex-col gap-4 lg:flex-row lg:items-stretch">
          <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
            <p className="text-lg font-semibold">1. Upload your design</p>
            <p className="mt-3 text-base text-slate-300">
              Send CAD + a few key details (material, quantity, target date).
            </p>
          </div>

          <Arrow />

          <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
            <p className="text-lg font-semibold">2. We prepare a quote</p>
            <p className="mt-3 text-base text-slate-300">
              We run a quick DFM check and return a clear quote by email.
            </p>
          </div>

          <Arrow />

          <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
            <p className="text-lg font-semibold">3. Manufacture &amp; delivery</p>
            <p className="mt-3 text-base text-slate-300">
              Once approved, we coordinate production and keep you updated.
            </p>
          </div>
        </div>
      </section>

      {/* ===== PROCESSES & VOLUMES (TITLE + CARDS) ===== */}
      <section id="processes" className="relative mx-auto max-w-7xl px-6 pb-10 pt-8">
        {/* ✅ This is the missing title you asked for */}
        <h2 className="text-3xl font-semibold tracking-tight">Processes &amp; volumes</h2>
        <p className="mt-2 max-w-3xl text-base text-slate-300">
          Prototype to production: we match your design to the best route for cost, performance and scale-up.
        </p>

        <div className="mt-7 grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_80px_rgba(79,70,229,0.18)]">
            <p className="text-sm font-semibold tracking-wider text-slate-300">VOLUME RANGE</p>
            <p className="mt-3 text-base font-semibold text-white">1–100k+ units</p>
            <p className="mt-2 text-sm text-slate-300">
              First articles → pilots → scale-up → recurring production.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_80px_rgba(79,70,229,0.18)]">
            <p className="text-sm font-semibold tracking-wider text-slate-300">MATERIALS</p>
            <p className="mt-3 text-base font-semibold text-white">COC · COP · PC · PMMA</p>
            <p className="mt-2 text-sm text-slate-300">
              Mould-ready options for scale-up.{" "}
              <Link href="/resources#material-parameters" className="text-[#4d86ff] hover:underline">
                See material parameters.
              </Link>
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_80px_rgba(79,70,229,0.18)]">
            <p className="text-sm font-semibold tracking-wider text-slate-300">ROUTES</p>
            <p className="mt-3 text-base font-semibold text-white">3D print · CNC · mould</p>
            <p className="mt-2 text-sm text-slate-300">
              We match your design to the best route for cost + performance.
            </p>
          </div>
        </div>
      </section>

      {/* ===== CONFIDENTIALITY (keep on main page) ===== */}
      <section id="confidentiality" className="relative mx-auto max-w-7xl px-6 pb-10">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold">Confidential by design</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            Your designs and data are handled under strict confidentiality.{" "}
            <Link href="/nda" className="text-[#4d86ff] hover:underline">
              NDAs are available on request
            </Link>{" "}
            and we only share the minimum technical detail required for manufacture internally.
          </p>
        </div>
      </section>

      {/* ===== CONTACT (keep enquiry success banner) ===== */}
      <section id="contact" className="relative mx-auto max-w-7xl px-6 pb-16">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_minmax(0,1fr)] lg:items-start">
          <div>
            <h2 className="text-2xl font-semibold">Talk to us about your next run</h2>
            <p className="mt-3 max-w-xl text-sm text-slate-300">
              Not sure if your design is ready, or exploring production options? Send a short message and
              we&apos;ll respond by email, usually within one working day.
            </p>
          </div>

          <form
            action="/api/contact"
            method="post"
            className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <div className="space-y-1 text-sm">
              <label className="block text-slate-300" htmlFor="name">
                Your name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="w-full rounded-md border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none focus:border-[#0f6fff]"
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
                className="w-full rounded-md border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none focus:border-[#0f6fff]"
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
                className="w-full rounded-md border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none focus:border-[#0f6fff]"
                placeholder="Tell us briefly about your device, volumes and timelines."
              />
            </div>

            {/* Success/error banner (client-side, wrapped in Suspense) */}
            <Suspense fallback={null}>
              <EnquiryAlert />
            </Suspense>

            <button
              type="submit"
              className="mt-2 w-full rounded-full bg-[#0f6fff] px-4 py-3 text-sm font-semibold text-white hover:bg-[#1d72ff]"
            >
              Send enquiry
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
