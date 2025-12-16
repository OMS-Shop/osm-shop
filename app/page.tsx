import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import EnquiryAlert from "./components/EnquiryAlert";

export default function HomePage() {
  return (
    <div className="relative">
      {/* Ambient background (clip ONLY the background, not the content) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute -bottom-40 right-[-10rem] h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute -bottom-40 left-[-10rem] h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      {/* ===== Hero ===== */}
      <section className="relative pt-2 md:pt-4">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_minmax(0,0.85fr)] lg:items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/40 px-3 py-1 text-xs text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
              Quote-only at launch • Response typically within 1 working day
            </div>

            <h1 className="mt-5 text-4xl font-semibold leading-tight text-white md:text-5xl">
              From <span className="text-sky-400">1</span> to{" "}
              <span className="text-sky-400">100,000+</span> units of microfluidic
              parts — through one portal
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300">
              We coordinate microfluidic manufacturing across 3D printing, CNC
              machining, bonding/sealing, and injection moulding. Upload your
              design once and we’ll guide you from early prototypes through to
              volume production.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/upload"
                className="rounded-full bg-sky-500 px-6 py-2.5 text-sm font-semibold text-white shadow transition-colors hover:bg-sky-600"
              >
                Upload design &amp; get started
              </Link>
              <Link
                href="/portal"
                className="rounded-full border border-slate-600 px-6 py-2.5 text-sm font-medium text-slate-100 transition-colors hover:border-slate-300"
              >
                View my orders
              </Link>
              <Link
                href="/nda"
                className="rounded-full border border-slate-800 bg-slate-900/40 px-6 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-slate-600"
              >
                Request NDA
              </Link>
            </div>

            <div className="mt-6 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
              <div className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400/80" />
                <p>
                  <span className="font-semibold text-white">Single RFQ pack</span>{" "}
                  — files, material, volumes, target date.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400/80" />
                <p>
                  <span className="font-semibold text-white">DFM guidance</span>{" "}
                  to pick the right process early.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400/80" />
                <p>
                  <span className="font-semibold text-white">Bonding/sealing</span>{" "}
                  included for most CNC designs.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400/80" />
                <p>
                  <span className="font-semibold text-white">Email updates</span>{" "}
                  + portal status for live jobs.
                </p>
              </div>
            </div>

            <p className="mt-5 text-xs text-slate-400">
              No up-front commitment. We’ll review your request and respond with a
              detailed quote by email.
            </p>
          </div>

          {/* Right */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 shadow-xl">
            <div className="relative aspect-[4/3] overflow-hidden rounded-t-3xl">
              <Image
                src="/microfluidic-spiral.jpg"
                alt="Microfluidic component"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/70 via-transparent to-transparent" />
            </div>

            <div className="space-y-3 rounded-b-3xl px-6 py-5">
              <p className="text-sm font-semibold text-white">
                COC &amp; polycarbonate microfluidics
              </p>
              <p className="text-xs text-slate-300">
                Precision components for diagnostics, life-science and quantum
                devices — built for repeatability and scale-up.
              </p>

              <div className="grid gap-3 pt-2 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                  <p className="text-xs font-semibold text-white">Prototype</p>
                  <p className="mt-1 text-xs text-slate-300">
                    Fast turns for early iteration.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                  <p className="text-xs font-semibold text-white">Scale-up</p>
                  <p className="mt-1 text-xs text-slate-300">
                    Injection moulding for volume.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick facts strip */}
        <div
          id="processes"
          className="mt-10 grid gap-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-5 md:grid-cols-3"
        >
          <div>
            <p className="text-xs font-semibold tracking-wide text-slate-400">
              PROCESS ROUTES
            </p>
            <p className="mt-2 text-sm font-semibold text-white">
              3D print · CNC · bond/seal · mould
            </p>
            <p className="mt-1 text-xs text-slate-300">
              We match your design to cost, performance and lead time.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-wide text-slate-400">
              VOLUME RANGE
            </p>
            <p className="mt-2 text-sm font-semibold text-white">1–100k+ units</p>
            <p className="mt-1 text-xs text-slate-300">
              From first articles to recurring production.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-wide text-slate-400">
              COMMON MATERIALS
            </p>
            <p className="mt-2 text-sm font-semibold text-white">
              COC · PC · PMMA · Glass (on request)
            </p>
            <p className="mt-1 text-xs text-slate-300">
              Other engineering thermoplastics available.
            </p>
          </div>
        </div>
      </section>

      {/* ===== How it works ===== */}
      <section id="how-it-works" className="mt-14">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-lg font-semibold text-white">How it works</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">
              A simple workflow designed to reduce back-and-forth and get you to
              parts quickly.
            </p>
          </div>
          <Link
            href="/upload"
            className="hidden rounded-full border border-slate-700 bg-slate-900/40 px-4 py-2 text-xs font-semibold text-slate-200 hover:border-slate-500 lg:inline-block"
          >
            Start an RFQ
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              n: "1",
              t: "Upload your design",
              d: "Send CAD + a few key details (material, quantity, target date).",
            },
            {
              n: "2",
              t: "We prepare a quote",
              d: "We run a quick DFM check and return a clear quote by email.",
            },
            {
              n: "3",
              t: "Manufacture & delivery",
              d: "Once approved, we coordinate production and keep you updated.",
            },
          ].map((x) => (
            <div
              key={x.n}
              className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500/15 text-sm font-bold text-sky-300">
                  {x.n}
                </div>
                <h3 className="text-sm font-semibold text-white">{x.t}</h3>
              </div>
              <p className="mt-3 text-sm text-slate-300">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== What you get ===== */}
      <section className="mt-14">
        <h2 className="text-lg font-semibold text-white">
          Built for prototype-to-production
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-300">
          Designed for well-funded startups, labs, and product teams who need
          reliable manufacturing with a simple procurement path.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              t: "DFM guidance",
              d: "Quick checks to reduce risk and align designs with the right route.",
            },
            {
              t: "Bonding & sealing",
              d: "Thermal bonding methods which do not introduce chemical contamination or crazing of the channels",
            },
            {
              t: "Fast iteration",
              d: "Prototype-friendly options to help you learn quickly and converge.",
            },
            {
              t: "Scale-up ready",
              d: "Injection moulding pathway once the design is stable.",
            },
            {
              t: "Clear communication",
              d: "Email-first quoting with inclusions, assumptions and lead time.",
            },
            {
              t: "Confidential by default",
              d: "NDA-friendly workflow and minimal technical sharing.",
            },
          ].map((x) => (
            <div
              key={x.t}
              className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5"
            >
              <p className="text-sm font-semibold text-white">{x.t}</p>
              <p className="mt-2 text-sm text-slate-300">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Confidentiality ===== */}
      <section id="confidentiality" className="mt-14">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <h2 className="text-lg font-semibold text-white">
            Confidential by design
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-300">
            Your designs and data are handled under strict confidentiality.{" "}
            <Link href="/nda" className="text-sky-400 hover:underline">
              NDAs are available on request
            </Link>{" "}
            and we only share the minimum technical detail required for
            manufacture. Order status and documentation are accessible via your
            secure customer portal.
          </p>
        </div>
      </section>

      {/* ===== Contact ===== */}
      <section
        id="contact"
        className="mt-14 grid gap-6 pb-6 md:grid-cols-[1.1fr_minmax(0,1fr)]"
      >
        <div>
          <h2 className="text-lg font-semibold text-white">
            Talk to us about your next run
          </h2>
          <p className="mt-3 max-w-xl text-sm text-slate-300">
            Not sure if your design is ready, or exploring production options?
            Send a short message and we&apos;ll respond by email — usually within
            one working day.
          </p>

          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <p className="text-sm font-semibold text-white">Tip</p>
            <p className="mt-2 text-sm text-slate-300">
              If you already have CAD, use{" "}
              <Link href="/upload" className="text-sky-400 hover:underline">
                Upload design
              </Link>{" "}
              for the fastest path to a quote.
            </p>
          </div>
        </div>

        <form
          action="/api/contact"
          method="post"
          className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-6"
        >
          <div className="space-y-1 text-xs">
            <label className="block text-slate-300" htmlFor="name">
              Your name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 outline-none focus:border-sky-400"
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
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 outline-none focus:border-sky-400"
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
              rows={4}
              required
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 outline-none focus:border-sky-400"
              placeholder="Tell us briefly about your device, volumes and timelines."
            />
          </div>

          {/* ✅ Success/error banner (client-side) */}
          <Suspense fallback={null}>
            <EnquiryAlert />
          </Suspense>

          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-sky-600"
          >
            Send enquiry
          </button>

          <p className="text-[11px] text-slate-400">
            Prefer NDA first?{" "}
            <Link href="/nda" className="text-sky-400 hover:underline">
              Request confidentiality
            </Link>
            .
          </p>
        </form>
      </section>
    </div>
  );
}