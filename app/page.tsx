import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import EnquiryAlert from "./components/EnquiryAlert";

function GreenTick() {
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-500/25">
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 text-emerald-300"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
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
    <div className="hidden items-center justify-center md:flex">
      <svg
        viewBox="0 0 24 24"
        className="h-8 w-8 text-white/80"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h12" />
        <path d="M13 6l6 6-6 6" />
      </svg>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="bg-[#020617]">
      {/* ===== Hero ===== */}
      <section className="mx-auto flex max-w-6xl flex-col gap-10 pb-10 pt-6 md:flex-row md:items-center md:pt-10">
        {/* Left */}
        <div className="flex-1">
          <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
            From <span className="text-[#0f6fff]">1 to 100,000 units</span> of
            microfluidic parts, through a single portal
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300">
            We coordinate microfluidic manufacturing across 3D printing, CNC
            machining and injection moulding. Upload your design once and we
            take care of the rest – from early prototypes through to volume
            production.
          </p>

          {/* ✅ Hero CTAs: all inline on desktop */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:flex-nowrap">
            <Link
              href="/upload"
              className="whitespace-nowrap rounded-full bg-[#0f6fff] px-6 py-2.5 text-sm font-semibold text-white shadow hover:bg-[#1d72ff] text-center"
            >
              Upload &amp; request a quote
            </Link>

            <Link
              href="/portal"
              className="whitespace-nowrap rounded-full border border-slate-500 px-6 py-2.5 text-sm font-medium text-slate-100 hover:border-slate-300 text-center"
            >
              View my orders
            </Link>

            {/* ✅ Rename + keep inline */}
            <Link
              href="/nda"
              className="whitespace-nowrap rounded-full border border-slate-700 bg-slate-900/40 px-6 py-2.5 text-sm font-medium text-slate-100 hover:border-slate-400 text-center"
            >
              Request NDA
            </Link>
          </div>

          {/* Material parameters link (kept subtle) */}
          <p className="mt-3 text-xs text-slate-400">
            Comparing materials (PMMA vs PC vs COC/COP vs 3D print)?{" "}
            <Link
              href="/resources#material-parameters"
              className="text-[#0f6fff] hover:underline"
            >
              See material parameters
            </Link>
            .
          </p>

          {/* 4 key points */}
          <div className="mt-6 grid max-w-xl gap-3 text-sm">
            <div className="flex items-start gap-3">
              <GreenTick />
              <p className="text-slate-300">
                <span className="font-semibold text-white">Single RFQ pack</span>{" "}
                – send files, quantities and key requirements once.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <GreenTick />
              <p className="text-slate-300">
                <span className="font-semibold text-white">COC is mould-ready</span>{" "}
                and commonly selected for scale-up.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <GreenTick />
              <p className="text-slate-300">
                <span className="font-semibold text-white">
                  Secure NDA workflow
                </span>{" "}
                – sign and submit with email confirmation.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <GreenTick />
              <p className="text-slate-300">
                <span className="font-semibold text-white">Bonding ready</span> –{" "}
                thermal bonding methods which do not introduce chemical
                contamination or crazing of the channels.
              </p>
            </div>
          </div>

          <p className="mt-4 text-xs text-slate-400">
            No up-front commitment. We&apos;ll review your request and respond by
            email.
          </p>
        </div>

        {/* Right image card */}
        <div className="flex-1">
          <div className="overflow-hidden rounded-3xl border border-slate-700/60 bg-slate-900/60 shadow-xl">
            <div className="relative aspect-[4/3]">
              <Image
                src="/microfluidic-spiral.jpg"
                alt="COC microfluidic spiral part"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="border-t border-slate-700/60 bg-slate-900/80 px-6 py-4">
              <p className="text-sm font-semibold text-white">
                COC &amp; polycarbonate microfluidics
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Precision components for diagnostics, life-science and quantum
                devices – prepared for seamless scale-up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== How it works (with arrows) ===== */}
      <section id="how-it-works" className="mx-auto max-w-6xl pb-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
          <div className="flex-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="text-sm font-semibold text-white">
              1. Upload your design
            </h3>
            <p className="mt-3 text-xs text-slate-300">
              Send us your design once. Tell us your target volumes, materials
              and timelines.
            </p>
          </div>

          <ArrowRight />

          <div className="flex-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="text-sm font-semibold text-white">
              2. We prepare a quote
            </h3>
            <p className="mt-3 text-xs text-slate-300">
              We check feasibility, confirm assumptions, and send a detailed
              quote by email.
            </p>
          </div>

          <ArrowRight />

          <div className="flex-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="text-sm font-semibold text-white">
              3. Manufacture &amp; delivery
            </h3>
            <p className="mt-3 text-xs text-slate-300">
              Once agreed, we manufacture and keep you updated through the
              portal.
            </p>
          </div>
        </div>
      </section>

      {/* ✅ COMPACT: Volume / Materials / Routes (sleeker, less vertical space) */}
      <section id="processes" className="mx-auto max-w-6xl pb-14">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/55 p-5">
            <div className="text-[12px] font-extrabold tracking-wider text-slate-300">
              VOLUME RANGE
            </div>
            <div className="mt-2 text-lg font-semibold text-white">
              1–100k+ units
            </div>
            <div className="mt-1 text-sm text-slate-300">
              First articles → pilots → scale-up → recurring production.
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/55 p-5">
            <div className="text-[12px] font-extrabold tracking-wider text-slate-300">
              MATERIALS
            </div>
            <div className="mt-2 text-lg font-semibold text-white">
              COC · COP · PC · PMMA
            </div>
            <div className="mt-1 text-sm text-slate-300">
              Mould-ready options for scale-up.{" "}
              <Link
                href="/resources#material-parameters"
                className="text-[#0f6fff] hover:underline"
              >
                See material parameters
              </Link>
              .
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/55 p-5">
            <div className="text-[12px] font-extrabold tracking-wider text-slate-300">
              ROUTES
            </div>
            <div className="mt-2 text-lg font-semibold text-white">
              3D print · CNC · mould
            </div>
            <div className="mt-1 text-sm text-slate-300">
              We match your design to the best route for cost + performance.
            </div>
          </div>
        </div>
      </section>

      {/* ===== Confidentiality ===== */}
      <section id="confidentiality" className="mx-auto max-w-6xl pb-12">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <h2 className="text-base font-semibold text-white">
            Confidential by design
          </h2>
          <p className="mt-3 max-w-3xl text-xs text-slate-300">
            Your designs and data are handled under strict confidentiality.{" "}
            <Link href="/nda" className="text-[#0f6fff] hover:underline">
              NDAs are available on request
            </Link>{" "}
            and we only share the minimum technical detail required for
            manufacture internally.
          </p>
        </div>
      </section>

      {/* ===== Contact ===== */}
      <section
        id="contact"
        className="mx-auto max-w-6xl grid gap-6 pb-20 md:grid-cols-[1.1fr_minmax(0,1fr)]"
      >
        <div>
          <h2 className="text-base font-semibold text-white">
            Talk to us about your next run
          </h2>
          <p className="mt-3 max-w-xl text-xs text-slate-300">
            Not sure if your design is ready, or exploring production options?
            Send us a short message and we&apos;ll respond by email, usually
            within one working day.
          </p>
          <p className="mt-3 text-xs text-slate-400">
            Prefer to read first?{" "}
            <Link
              href="/resources#material-parameters"
              className="text-[#0f6fff] hover:underline"
            >
              Material parameters
            </Link>
            .
          </p>
        </div>

        <form
          action="/api/contact"
          method="post"
          className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-5"
        >
          <div className="space-y-1 text-xs">
            <label className="block text-slate-300" htmlFor="name">
              Your name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 outline-none focus:border-[#0f6fff]"
              placeholder="e.g. Jane Doe"
            />
          </div>

          <div className="space-y-1 text-xs">
            <label className="block text-slate-300" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 outline-none focus:border-[#0f6fff]"
              placeholder="you@company.com"
            />
          </div>

          <div className="space-y-1 text-xs">
            <label className="block text-slate-300" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              required
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 outline-none focus:border-[#0f6fff]"
              placeholder="Tell us briefly about your device, volumes and timelines."
            />
          </div>

          <Suspense fallback={null}>
            <EnquiryAlert />
          </Suspense>

          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-[#0f6fff] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1d72ff]"
          >
            Send enquiry
          </button>
        </form>
      </section>
    </div>
  );
}