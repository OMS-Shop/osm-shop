import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import EnquiryAlert from "./components/EnquiryAlert";

/**
 * OSMS Guardrails:
 * - Keep these section IDs present: how-it-works, processes, confidentiality, contact
 * - Keep dark background on outer wrapper (no white gaps)
 * - Keep hero grid alignment stable (image should not “drop”)
 */

function GreenTick() {
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-400/25">
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 text-emerald-200"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </span>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#081b3d]">
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden">
        {/* ambient background */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-[520px] w-[920px] -translate-x-1/2 rounded-full bg-[#57a9e8]/12 blur-3xl" />
          <div className="absolute -bottom-36 right-[-120px] h-[520px] w-[520px] rounded-full bg-indigo-500/10 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-7xl gap-10 px-6 pb-14 pt-10 lg:grid-cols-[1.05fr_minmax(0,1fr)] lg:gap-12 lg:pt-12">
          {/* Left */}
          <div className="relative">
            <div className="inline-flex items-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-500/5 px-4 py-2 text-sm text-slate-200">
              <GreenTick />
              <span>Upload &amp; request a quote • Response typically within 1 working day</span>
            </div>

            <h1 className="mt-7 text-5xl font-semibold leading-tight text-white md:text-6xl">
              From{" "}
              <span className="text-[#4f86ff]">1 to 100,000+</span> units of
              microfluidic parts — through one portal
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300">
              We coordinate microfluidic manufacturing across 3D printing, CNC machining,
              bonding/sealing, and injection moulding. Upload once and we guide you from
              early prototypes through to volume production.
            </p>

            {/* Buttons (INLINE) */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/upload"
                className="rounded-full bg-[#4f86ff] px-6 py-3 text-sm font-semibold text-white shadow hover:brightness-110"
              >
                Upload design &amp; get started
              </Link>

              <Link
                href="/portal"
                className="rounded-full border border-slate-500/70 px-6 py-3 text-sm font-semibold text-slate-100 hover:border-slate-300"
              >
                View my orders
              </Link>

              <Link
                href="/nda"
                className="rounded-full border border-slate-500/70 px-6 py-3 text-sm font-semibold text-slate-100 hover:border-slate-300"
              >
                Request NDA
              </Link>
            </div>

            <p className="mt-4 text-sm text-slate-400">
              Comparing materials (PMMA vs PC vs COC/COP vs 3D print)?{" "}
              <Link href="/resources#material-parameters" className="text-[#57a9e8] hover:underline">
                See material parameters
              </Link>
              .
            </p>

            {/* 4 bullet points with green ticks */}
            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <div className="flex items-start gap-3">
                <GreenTick />
                <p className="text-base text-slate-200">
                  <span className="font-semibold text-white">Single RFQ pack</span> — send files,
                  quantities and key requirements once.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <GreenTick />
                <p className="text-base text-slate-200">
                  <span className="font-semibold text-white">DFM guidance</span> to pick the right
                  process early.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <GreenTick />
                <p className="text-base text-slate-200">
                  <span className="font-semibold text-white">COC is mould-ready</span> and commonly
                  selected for scale-up.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <GreenTick />
                <p className="text-base text-slate-200">
                  <span className="font-semibold text-white">Bonding ready</span> — thermal bonding
                  methods which do not introduce chemical contamination or crazing of the channels.
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm text-slate-400">
              No up-front commitment. We&apos;ll review your request and respond by email.
            </p>
          </div>

          {/* Right (Hero image card) */}
          <div className="relative self-start lg:mt-[-10px]">
            <div className="overflow-hidden rounded-3xl border border-slate-700/60 bg-slate-900/50 shadow-2xl">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/microfluidic-spiral.jpg"
                  alt="COC microfluidic spiral part"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="border-t border-slate-700/60 bg-slate-900/70 px-7 py-5">
                <p className="text-lg font-semibold text-white">
                  COC &amp; polycarbonate microfluidics
                </p>
                <p className="mt-1 text-sm text-slate-300">
                  Precision components for diagnostics, life-science and quantum devices — built for
                  repeatability and scale-up.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== How it works ===== */}
      <section id="how-it-works" className="scroll-mt-24 mx-auto max-w-7xl px-6 pb-10 pt-6">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold text-white">How it works</h2>
            <p className="mt-2 max-w-2xl text-slate-300">
              A simple workflow designed to reduce back-and-forth and get you to parts quickly.
            </p>
          </div>

          <Link
            href="/upload"
            className="rounded-full border border-slate-500/70 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:border-slate-300"
          >
            Start an RFQ
          </Link>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/45 p-6">
            <p className="text-base font-semibold text-white">1. Upload your design</p>
            <p className="mt-3 text-sm text-slate-300">
              Send CAD + a few key details (material, quantity, target date).
            </p>
          </div>

          <div className="hidden items-center justify-center lg:flex">
            <span className="text-3xl text-white/60">→</span>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/45 p-6">
            <p className="text-base font-semibold text-white">2. We prepare a quote</p>
            <p className="mt-3 text-sm text-slate-300">
              We run a quick DFM check and return a clear quote by email.
            </p>
          </div>

          <div className="hidden items-center justify-center lg:flex">
            <span className="text-3xl text-white/60">→</span>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/45 p-6">
            <p className="text-base font-semibold text-white">3. Manufacture &amp; delivery</p>
            <p className="mt-3 text-sm text-slate-300">
              Once approved, we coordinate production and keep you updated.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Processes & volumes ===== */}
      <section id="processes" className="scroll-mt-24 mx-auto max-w-7xl px-6 pb-10 pt-4">
        <h2 className="text-2xl font-semibold text-white">Processes &amp; volumes</h2>
        <p className="mt-2 max-w-2xl text-slate-300">
          Built for prototype-to-production — with mould-ready thermoplastics available for scale-up.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/45 p-6">
            <p className="text-sm font-semibold tracking-wide text-slate-300">VOLUME RANGE</p>
            <p className="mt-2 text-base font-semibold text-white">1–100k+ units</p>
            <p className="mt-2 text-sm text-slate-300">
              First articles → pilots → scale-up → recurring production.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/45 p-6">
            <p className="text-sm font-semibold tracking-wide text-slate-300">MATERIALS</p>
            <p className="mt-2 text-base font-semibold text-white">COC · COP · PC · PMMA</p>
            <p className="mt-2 text-sm text-slate-300">
              Mould-ready options for scale-up.{" "}
              <Link href="/resources#material-parameters" className="text-[#57a9e8] hover:underline">
                See material parameters
              </Link>
              .
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/45 p-6">
            <p className="text-sm font-semibold tracking-wide text-slate-300">ROUTES</p>
            <p className="mt-2 text-base font-semibold text-white">3D print · CNC · mould</p>
            <p className="mt-2 text-sm text-slate-300">
              We match your design to the best route for cost + performance.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Confidentiality ===== */}
      <section id="confidentiality" className="scroll-mt-24 mx-auto max-w-7xl px-6 pb-10 pt-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/45 p-7">
          <h2 className="text-xl font-semibold text-white">Confidential by design</h2>
          <p className="mt-3 text-slate-300">
            Your designs and data are handled under strict confidentiality.{" "}
            <Link href="/nda" className="text-[#57a9e8] hover:underline">
              NDAs are available on request
            </Link>{" "}
            and we only share the minimum technical detail required for manufacture internally.
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="flex items-start gap-3">
              <GreenTick />
              <p className="text-sm text-slate-300">
                Secure NDA workflow — sign and submit with email confirmation.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <GreenTick />
              <p className="text-sm text-slate-300">
                Vendor sharing minimised — only what’s required to manufacture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Contact ===== */}
      <section id="contact" className="scroll-mt-24 mx-auto max-w-7xl px-6 pb-20 pt-2">
        <div className="grid gap-8 md:grid-cols-[1.05fr_minmax(0,1fr)]">
          <div>
            <h2 className="text-3xl font-semibold text-white">Get in Touch</h2>
            <p className="mt-3 max-w-xl text-slate-300">
              Not sure if your design is ready, or exploring production options? Send a short
              message and we&apos;ll respond by email, usually within one working day.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/45 p-6 shadow-xl">
            {/* Success box for enquiry (uses URL param from /api/contact redirect) */}
            <Suspense fallback={null}>
              <EnquiryAlert />
            </Suspense>

            <form action="/api/contact" method="post" className="mt-4 space-y-4">
              <div className="space-y-1">
                <label className="block text-sm text-slate-300" htmlFor="name">
                  Your name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none focus:border-[#57a9e8]"
                  placeholder="e.g. Jane Doe"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm text-slate-300" htmlFor="email">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none focus:border-[#57a9e8]"
                  placeholder="you@company.com"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm text-slate-300" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none focus:border-[#57a9e8]"
                  placeholder="Tell us briefly about your device, volumes and timelines."
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-[#356fee] px-6 py-4 text-sm font-semibold text-white shadow hover:brightness-110"
              >
                Send enquiry
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}