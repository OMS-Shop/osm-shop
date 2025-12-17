import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import EnquiryAlert from "./components/EnquiryAlert";

function GreenTick() {
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-300/30 shadow-[0_0_18px_rgba(16,185,129,0.25)]">
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

function FlowArrow() {
  return (
    <div
      aria-hidden
      className="hidden md:flex items-center justify-center px-2"
    >
      <span className="text-white/80 text-4xl leading-none drop-shadow-[0_0_14px_rgba(255,255,255,0.35)]">
        →
      </span>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="relative bg-[#020617]">
      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-56 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-blue-500/12 blur-3xl" />
        <div className="absolute -top-40 right-[-140px] h-[420px] w-[520px] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-[-220px] left-[-140px] h-[520px] w-[620px] rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      {/* ===== Hero ===== */}
      <section className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-12 pt-10 md:flex-row md:items-center md:pt-12">
        {/* Left */}
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 text-xs text-slate-200 shadow-[0_0_22px_rgba(16,185,129,0.12)]">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-300/30">
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5 text-emerald-200"
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
            <span>Upload &amp; request a quote • Response typically within 1 working day</span>
          </div>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white md:text-6xl">
            From{" "}
            <span className="text-[#3b82f6]">1</span> to{" "}
            <span className="text-[#3b82f6]">100,000+</span>{" "}
            units of microfluidic parts —{" "}
            <span className="text-white">through one portal</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300">
            We coordinate microfluidic manufacturing across 3D printing, CNC
            machining, bonding/sealing, and injection moulding. Upload once and
            we guide you from early prototypes through to volume production.
          </p>

          {/* CTAs (INLINE 3 buttons) */}
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link
              href="/upload"
              className="rounded-full bg-[#3b82f6] px-6 py-3 text-sm font-extrabold text-white shadow-[0_0_30px_rgba(59,130,246,0.25)] hover:bg-[#2563eb] transition-colors"
            >
              Upload &amp; request a quote
            </Link>
            <Link
              href="/portal"
              className="rounded-full border border-slate-500 px-6 py-3 text-sm font-semibold text-slate-100 hover:border-slate-200 hover:text-white transition-colors"
            >
              View my orders
            </Link>
            <Link
              href="/nda"
              className="rounded-full border border-slate-500 px-6 py-3 text-sm font-semibold text-slate-100 hover:border-slate-200 hover:text-white transition-colors"
            >
              Request NDA
            </Link>
          </div>

          <p className="mt-4 text-sm text-slate-300/90">
            Comparing materials (PMMA vs PC vs COC/COP vs 3D print)?{" "}
            <Link href="/resources#material-parameters" className="text-[#60a5fa] hover:underline">
              See material parameters
            </Link>
            .
          </p>

          {/* Hero bullets */}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-3">
              <GreenTick />
              <p className="text-sm text-slate-200">
                <span className="font-extrabold text-white">Single RFQ pack</span>{" "}
                — send files, quantities and key requirements once.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <GreenTick />
              <p className="text-sm text-slate-200">
                <span className="font-extrabold text-white">DFM guidance</span>{" "}
                to pick the right process early.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <GreenTick />
              <p className="text-sm text-slate-200">
                <span className="font-extrabold text-white">COC is mould-ready</span>{" "}
                and commonly selected for scale-up.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <GreenTick />
              <p className="text-sm text-slate-200">
                <span className="font-extrabold text-white">Bonding ready</span>{" "}
                — thermal bonding methods which do not introduce chemical contamination
                or crazing of the channels.
              </p>
            </div>
          </div>

          <p className="mt-6 text-sm text-slate-400">
            No up-front commitment. We&apos;ll review your request and respond by email.
          </p>
        </div>

        {/* Right image card */}
        <div className="flex-1">
          <div className="overflow-hidden rounded-[28px] border border-slate-700/60 bg-slate-900/40 shadow-[0_0_80px_rgba(59,130,246,0.18)]">
            <div className="relative aspect-[4/3]">
              <Image
                src="/microfluidic-spiral.jpg"
                alt="COC microfluidic spiral part"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="border-t border-slate-700/60 bg-slate-900/70 px-6 py-5">
              <p className="text-base font-extrabold text-white">
                COC &amp; polycarbonate microfluidics
              </p>
              <p className="mt-1 text-sm text-slate-300">
                Precision components for diagnostics, life-science and quantum devices —
                built for repeatability and scale-up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== How it works ===== */}
      <section id="how-it-works" className="relative mx-auto max-w-6xl px-6 pb-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-white">How it works</h2>
            <p className="mt-2 text-sm text-slate-300">
              A simple workflow designed to reduce back-and-forth and get you to parts quickly.
            </p>
          </div>

          <Link
            href="/upload"
            className="hidden md:inline-flex rounded-full border border-slate-500 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:border-slate-200 hover:text-white transition-colors"
          >
            Start an RFQ
          </Link>
        </div>

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-stretch">
          <div className="flex-1 rounded-2xl border border-slate-700/60 bg-slate-900/35 p-6 shadow-[0_0_90px_rgba(59,130,246,0.14)]">
            <h3 className="text-base font-extrabold text-white">1. Upload your design</h3>
            <p className="mt-2 text-sm text-slate-300">
              Send CAD + a few key details (material, quantity, target date).
            </p>
          </div>

          <FlowArrow />

          <div className="flex-1 rounded-2xl border border-slate-700/60 bg-slate-900/35 p-6 shadow-[0_0_90px_rgba(59,130,246,0.14)]">
            <h3 className="text-base font-extrabold text-white">2. We prepare a quote</h3>
            <p className="mt-2 text-sm text-slate-300">
              We run a quick DFM check and return a clear quote by email.
            </p>
          </div>

          <FlowArrow />

          <div className="flex-1 rounded-2xl border border-slate-700/60 bg-slate-900/35 p-6 shadow-[0_0_90px_rgba(59,130,246,0.14)]">
            <h3 className="text-base font-extrabold text-white">3. Manufacture &amp; delivery</h3>
            <p className="mt-2 text-sm text-slate-300">
              Once approved, we coordinate production and keep you updated.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Processes & volumes (tidier sizing) ===== */}
      <section id="processes" className="relative mx-auto max-w-6xl px-6 pb-10">
        <div className="mt-2 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/35 p-6 shadow-[0_0_70px_rgba(59,130,246,0.10)]">
            <p className="text-xs font-semibold tracking-wide text-slate-400">
              VOLUME RANGE
            </p>
            <p className="mt-2 text-base font-extrabold text-white">
              1–100k+ units
            </p>
            <p className="mt-1 text-sm text-slate-300">
              First articles → pilots → scale-up → recurring production.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/35 p-6 shadow-[0_0_70px_rgba(59,130,246,0.10)]">
            <p className="text-xs font-semibold tracking-wide text-slate-400">
              MATERIALS
            </p>
            <p className="mt-2 text-base font-extrabold text-white">
              COC · COP · PC · PMMA
            </p>
            <p className="mt-1 text-sm text-slate-300">
              Mould-ready options for scale-up.{" "}
              <Link href="/resources#material-parameters" className="text-[#60a5fa] hover:underline">
                See material parameters
              </Link>
              .
            </p>
          </div>

          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/35 p-6 shadow-[0_0_70px_rgba(59,130,246,0.10)]">
            <p className="text-xs font-semibold tracking-wide text-slate-400">
              ROUTES
            </p>
            <p className="mt-2 text-base font-extrabold text-white">
              3D print · CNC · mould
            </p>
            <p className="mt-1 text-sm text-slate-300">
              We match your design to the best route for cost + performance.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Confidentiality ===== */}
      <section id="confidentiality" className="relative mx-auto max-w-6xl px-6 pb-10">
        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/35 p-6 shadow-[0_0_80px_rgba(59,130,246,0.12)]">
          <h2 className="text-lg font-extrabold text-white">Confidential by design</h2>
          <p className="mt-2 text-sm text-slate-300">
            Your designs and data are handled under strict confidentiality.{" "}
            <Link href="/nda" className="text-[#60a5fa] hover:underline">
              NDAs are available on request
            </Link>{" "}
            and we only share the minimum technical detail required for manufacture.
          </p>
        </div>
      </section>

      {/* ===== Contact ===== */}
      <section
        id="contact"
        className="relative mx-auto max-w-6xl grid gap-6 px-6 pb-20 md:grid-cols-[1.1fr_minmax(0,1fr)]"
      >
        <div>
          <h2 className="text-lg font-extrabold text-white">
            Talk to us about your next run
          </h2>
          <p className="mt-2 max-w-xl text-sm text-slate-300">
            Not sure if your design is ready, or exploring production options?
            Send us a short message and we&apos;ll respond by email, usually within
            one working day.
          </p>
        </div>

        <form
          action="/api/contact"
          method="post"
          className="space-y-3 rounded-2xl border border-slate-700/60 bg-slate-900/35 p-6 shadow-[0_0_80px_rgba(59,130,246,0.12)]"
        >
          <div className="space-y-1 text-sm">
            <label className="block text-slate-300" htmlFor="name">
              Your name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-[#60a5fa]"
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
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-[#60a5fa]"
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
              rows={3}
              required
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-[#60a5fa]"
              placeholder="Tell us briefly about your device, volumes and timelines."
            />
          </div>

          {/* ✅ Success/error banner (client-side, wrapped in Suspense) */}
          <Suspense fallback={null}>
            <EnquiryAlert />
          </Suspense>

          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-[#3b82f6] px-4 py-2.5 text-sm font-extrabold text-white shadow-[0_0_30px_rgba(59,130,246,0.22)] hover:bg-[#2563eb]"
          >
            Send enquiry
          </button>
        </form>
      </section>
    </div>
  );
}