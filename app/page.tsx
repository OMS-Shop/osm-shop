import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import EnquiryAlert from "./components/EnquiryAlert";

/**
 * OSMS Guardrails:
 * - Keep these section IDs present: how-it-works, processes, confidentiality, contact
 * - Keep hero grid alignment stable (image should not “drop”)
 *
 * NOTE (ui/tweak-homepage):
 * - This version previews a WHITE homepage with BLACK text.
 * - Header/menu styling remains controlled by app/layout.tsx (unchanged).
 */

function GreenTick() {
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600/10 ring-1 ring-emerald-600/25">
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 text-emerald-700"
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
    <div className="min-h-screen bg-white text-slate-900">
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden">
        {/* ambient background (subtle on white) */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-[520px] w-[920px] -translate-x-1/2 rounded-full bg-[#57a9e8]/20 blur-3xl" />
          <div className="absolute -bottom-36 right-[-120px] h-[520px] w-[520px] rounded-full bg-indigo-500/10 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-7xl gap-10 px-6 pb-14 pt-10 lg:grid-cols-[1.05fr_minmax(0,1fr)] lg:gap-12 lg:pt-12">
          {/* Left */}
          <div className="relative">
            <div className="inline-flex items-center gap-3 rounded-full border border-emerald-700/20 bg-emerald-500/10 px-4 py-2 text-sm text-slate-800">
              <GreenTick />
              <span>
                Upload &amp; request a quote • Response typically within 1
                working day
              </span>
            </div>

            <h1 className="mt-7 text-5xl font-semibold leading-tight text-slate-900 md:text-6xl">
              From <span className="text-[#1d72ff]">1 to 100,000+</span>{" "}
              Microfluidic Units: Managed Through One Portal
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-700">
              We coordinate microfluidic manufacturing across 3D printing, CNC
              Machining, bonding/sealing, to scale with Injection Moulding. Upload once and
              we guide you from early prototypes through to volume production.
            </p>

            {/* Buttons (INLINE) */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/upload"
                className="rounded-full bg-[#1d72ff] px-6 py-3 text-sm font-semibold text-white shadow hover:brightness-110"
              >
                Upload Design &amp; Get Started
              </Link>

              {/* Confidentiality button should go to /nda */}
              <Link
                href="/nda"
                className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:border-slate-400"
              >
                Request to Sign an NDA
              </Link>
            </div>

            <p className="mt-4 text-sm text-slate-600">
              Comparing materials (COC/COP vs PC vs PMMA vs 3D printed resins)?{" "}
              <Link
                href="/resources#material-parameters"
                className="text-[#1d72ff] hover:underline"
              >
                See material parameters
              </Link>
              .
            </p>

            {/* 4 bullet points with green ticks */}
            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <div className="flex items-start gap-3">
                <GreenTick />
                <p className="text-base text-slate-800">
                  <span className="font-semibold text-slate-900">
                    Single Design Upload (RFQ pack)
                  </span>{" "}
                  — send files, quantities, material and key requirements once.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <GreenTick />
                <p className="text-base text-slate-800">
                  <span className="font-semibold text-slate-900">
                    DFM guidance
                  </span>{" "}
                  to pick the right process early.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <GreenTick />
                <p className="text-base text-slate-800">
                  <span className="font-semibold text-slate-900">
                    Thermoplastics are mould-ready
                  </span>{" "}
                  and are selected for scale-up.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <GreenTick />
                <p className="text-base text-slate-800">
                  <span className="font-semibold text-slate-900">
                    Bonding ready
                  </span>{" "}
                  — thermal bonding methods which do not introduce chemical
                  contamination or crazing of microfluidic channels.
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm text-slate-600">
              No up-front commitment. We&apos;ll review your request and respond
              by email.
            </p>
          </div>

          {/* Right (Hero image card) */}
          <div className="relative self-start lg:mt-[-10px]">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/microfluidic-spiral.jpg"
                  alt="COC microfluidic spiral part"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="border-t border-slate-200 bg-white px-7 py-5">
                <p className="text-lg font-semibold text-slate-900">
                  Thermoplastic Microfluidics (COC, COP, PC, PMMA)
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Precision components for diagnostics, life-science and agricultural sensors 
                   — built for repeatability and scale-up.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== How it works ===== */}
      <section
        id="how-it-works"
        className="scroll-mt-24 mx-auto max-w-7xl px-6 pb-10 pt-6"
      >
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              How it Works
            </h2>
            <p className="mt-2 max-w-2xl text-slate-700">
              A simple workflow designed to reduce back-and-forth and get you to
              parts quickly.
            </p>
          </div>

          <div className="flex w-full justify-center sm:w-auto sm:justify-end">
            <Link
              href="/upload"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:border-slate-400"
            >
              Start an RFQ
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-base font-semibold text-slate-900">
              1. Upload your Design
            </p>
            <p className="mt-3 text-sm text-slate-600">
              Send CAD + a few key details (material, quantity, target date).
            </p>
          </div>

          <div className="hidden items-center justify-center lg:flex">
            <span className="text-3xl text-slate-400">→</span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-base font-semibold text-slate-900">
              2. We Prepare a Quote
            </p>
            <p className="mt-3 text-sm text-slate-600">
              We run a quick DFM check and return a clear quote by email.
            </p>
          </div>

          <div className="hidden items-center justify-center lg:flex">
            <span className="text-3xl text-slate-400">→</span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-base font-semibold text-slate-900">
              3. Manufacture &amp; Delivery
            </p>
            <p className="mt-3 text-sm text-slate-600">
              Once approved, we coordinate production and keep you updated.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Processes & Volumes ===== */}
      <section
        id="processes"
        className="scroll-mt-24 mx-auto max-w-7xl px-6 pb-10 pt-4"
      >
        <h2 className="text-2xl font-semibold text-slate-900">
          Processes &amp; Volumes
        </h2>
        <p className="mt-2 max-w-2xl text-slate-700">
          Built for Prototype-to-Production usind mould-ready thermoplastics
          for scale-up.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold tracking-wide text-slate-600">
              VOLUME RANGE
            </p>
            <p className="mt-2 text-base font-semibold text-slate-900">
              1–100k+ units
            </p>
            <p className="mt-2 text-sm text-slate-600">
              First articles → Pilots → Scale-up → Recurring Production.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold tracking-wide text-slate-600">
              MATERIALS
            </p>
            <p className="mt-2 text-base font-semibold text-slate-900">
              COC · COP · PC · PMMA
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Mould-ready options for scale-up.{" "}
              <Link
                href="/resources#material-parameters"
                className="text-[#1d72ff] hover:underline"
              >
                See material parameters
              </Link>
              .
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold tracking-wide text-slate-600">
              ROUTES
            </p>
            <p className="mt-2 text-base font-semibold text-slate-900">
              3D Print · CNC Machine · Injection Mould
            </p>
            <p className="mt-2 text-sm text-slate-600">
              We match your design to the best route for performance.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Confidentiality ===== */}
      <section
        id="confidentiality"
        className="scroll-mt-24 mx-auto max-w-7xl px-6 pb-10 pt-2"
      >
        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Confidential by Design
          </h2>
          <p className="mt-3 text-slate-700">
            Your designs and data are handled under strict confidentiality.{" "}
            <Link href="/nda" className="text-[#1d72ff] hover:underline">
              NDAs are available on request
            </Link>{" "}
            and we only share the minimum technical detail required for
            manufacture.
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="flex items-start gap-3">
              <GreenTick />
              <p className="text-sm text-slate-600">
                Secure NDA workflow — sign and submit with email confirmation.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <GreenTick />
              <p className="text-sm text-slate-600">
                Data sharing minimised — only what’s required to manufacture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Contact ===== */}
      <section
        id="contact"
        className="scroll-mt-24 mx-auto max-w-7xl px-6 pb-20 pt-2"
      >
        <div className="grid gap-8 md:grid-cols-[1.05fr_minmax(0,1fr)]">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">
              Get in Touch
            </h2>
            <p className="mt-3 max-w-xl text-slate-700">
              Exploring production options?
              Send a short message and we&apos;ll respond by email.
    
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            {/* Success box for enquiry (uses URL param from /api/contact redirect) */}
            <Suspense fallback={null}>
              <EnquiryAlert />
            </Suspense>

            <form action="/api/contact" method="post" className="mt-4 space-y-4">
              <div className="space-y-1">
                <label className="block text-sm text-slate-700" htmlFor="name">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#57a9e8]"
                  placeholder="e.g. Jane Doe"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm text-slate-700" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#57a9e8]"
                  placeholder="you@company.com"
                />
              </div>

              <div className="space-y-1">
                <label
                  className="block text-sm text-slate-700"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#57a9e8]"
                  placeholder="Tell us briefly about your device, volumes and timelines."
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-[#1d72ff] px-6 py-4 text-sm font-semibold text-white shadow hover:brightness-110"
              >
                Send Enquiry
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}