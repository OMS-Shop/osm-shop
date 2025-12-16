import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="bg-[#020617]">
      {/* ===== Hero ===== */}
      <section className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-16 pt-10 md:flex-row md:items-center md:pt-14">
        {/* Left: headline & CTAs */}
        <div className="flex-1">
          <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
            From{" "}
            <span className="text-[#0f6fff]">1 to 100,000 units</span> of
            microfluidic parts, through a single portal
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300">
            We coordinate microfluidic manufacturing across 3D printing, CNC
            machining and injection moulding. Upload your design once and we
            take care of the rest – from early prototypes through to volume
            production.
          </p>

          <div className="mt-7 flex flex-wrap gap-4">
            <Link
              href="/upload"
              className="rounded-full bg-[#0f6fff] px-6 py-2.5 text-sm font-semibold text-white shadow hover:bg-[#1d72ff]"
            >
              Upload design &amp; get started
            </Link>
            <Link
              href="/portal"
              className="rounded-full border border-slate-500 px-6 py-2.5 text-sm font-medium text-slate-100 hover:border-slate-300"
            >
              View my orders
            </Link>
          </div>

          <p className="mt-4 text-xs text-slate-400">
            No up-front commitment. We&apos;ll review your order request and
            respond with a detailed quote by email.
          </p>
        </div>

        {/* Right: hero image card */}
        <div className="flex-1">
          <div className="overflow-hidden rounded-3xl border border-slate-700/60 bg-slate-900/60 shadow-xl">
            {/* Image */}
            <div className="relative aspect-[4/3]">
              <Image
                src="/microfluidic-spiral.jpg"
                alt="COC microfluidic spiral part"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Caption */}
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

      {/* ===== Three-step cards (How it works) ===== */}
      <section
        id="how-it-works"
        className="mx-auto grid max-w-6xl gap-4 px-6 pb-16 md:grid-cols-3"
      >
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <h3 className="text-sm font-semibold text-white">
            1. Upload your design
          </h3>
          <p className="mt-3 text-xs text-slate-300">
            Send us your microfluidic design once. Tell us your target volumes,
            materials and timelines.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <h3 className="text-sm font-semibold text-white">
            2. We prepare a quote
          </h3>
          <p className="mt-3 text-xs text-slate-300">
            Our internal team cost your job, align it with the right production
            route and send a formal Xero quote.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <h3 className="text-sm font-semibold text-white">
            3. Manufacture &amp; delivery
          </h3>
          <p className="mt-3 text-xs text-slate-300">
            Once the quote is accepted and payment is received, manufacture
            starts and we keep you updated through the portal.
          </p>
        </div>
      </section>

      {/* ===== Volume, materials, routes ===== */}
      <section id="processes" className="mx-auto max-w-6xl space-y-4 px-6 pb-16">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <h4 className="text-xs font-semibold tracking-wide text-slate-400">
            VOLUME RANGE
          </h4>
          <p className="mt-2 text-sm font-medium text-white">1–100k+ units</p>
          <p className="mt-1 text-xs text-slate-300">
            From first articles and pilot runs through to scale-up and recurring
            production.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <h4 className="text-xs font-semibold tracking-wide text-slate-400">
            MAIN MATERIALS
          </h4>
          <p className="mt-2 text-sm font-medium text-white">
            COC &amp; polycarbonate
          </p>
          <p className="mt-1 text-xs text-slate-300">
            Other engineering thermoplastics available on request.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <h4 className="text-xs font-semibold tracking-wide text-slate-400">
            MANUFACTURING ROUTES
          </h4>
          <p className="mt-2 text-sm font-medium text-white">
            3D print · CNC · mould
          </p>
          <p className="mt-1 text-xs text-slate-300">
            We match your design to the most appropriate route for cost and
            performance.
          </p>
        </div>
      </section>

      {/* ===== Confidentiality ===== */}
      <section id="confidentiality" className="mx-auto max-w-6xl px-6 pb-12">
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
            manufacture internally. Order status and documentation are
            accessible via your secure customer portal.
          </p>
        </div>
      </section>

      {/* ===== Contact ===== */}
      <section
        id="contact"
        className="mx-auto max-w-6xl grid gap-6 px-6 pb-20 md:grid-cols-[1.1fr_minmax(0,1fr)]"
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
        </div>

        {/* ✅ FIXED: this now submits to /api/contact */}
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

          {/* ✅ FIXED: submit button */}
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