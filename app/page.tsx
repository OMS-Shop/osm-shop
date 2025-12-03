import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-sky-950 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            {/* Simple OSM logo circle */}
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-sky-300/40 bg-white/5 text-[0.6rem] font-semibold tracking-[0.18em]">
              OSM
            </div>

            {/* Company name + tagline */}
            <div className="flex flex-col">
              <span className="text-base md:text-lg font-semibold tracking-wide">
                One Stop Microfludics Shop
              </span>
              <span className="text-xs md:text-sm text-sky-200">
                Prototype to production microfluidics
              </span>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm md:flex">
            <a href="#capabilities" className="hover:text-sky-200">
              Capabilities
            </a>
            <a href="#materials" className="hover:text-sky-200">
              Materials
            </a>
            <a href="#how-it-works" className="hover:text-sky-200">
              How it works
            </a>
            <a href="#confidentiality" className="hover:text-sky-200">
              Confidentiality
            </a>
            <a href="#contact" className="hover:text-sky-200">
              Contact
            </a>
            {/* MAIN UPLOAD BUTTON – PLAIN LINK TO /upload */}
            <a
              href="/upload"
              className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium hover:bg-white/15"
            >
              Upload
            </a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-sky-950 bg-gradient-to-br from-sky-950 via-sky-900 to-slate-950 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:grid-cols-2 md:items-center md:py-16">
          {/* Left side: text */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
              From prototype to production
            </p>
            <h1 className="mt-3 text-2xl font-semibold leading-tight md:text-3xl">
              From 1 to 100,000 microfluidic units.
            </h1>
            <p className="mt-3 max-w-xl text-sm text-sky-100 md:text-[0.95rem]">
              One Stop Microfludics Shop connects your design to the right
              manufacturing route – 3D printed, CNC machined or injection
              moulded – in COC, polycarbonate and other thermoplastics.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {/* HERO CTA – PLAIN LINK TO /upload */}
              <a
                href="/upload"
                className="inline-flex items-center justify-center rounded-full bg-sky-400 px-5 py-2.5 text-sm font-medium text-slate-950 hover:bg-sky-300 transition-transform hover:-translate-y-0.5"
              >
                Upload design for quote
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-sky-500/70 px-5 py-2.5 text-sm font-medium text-sky-50 hover:bg-sky-900/60 transition-transform hover:-translate-y-0.5"
              >
                Book a call
              </a>
            </div>

            <p className="mt-3 text-[0.75rem] text-sky-200">
              1–10 units for proof of concept, 10–100 units for early testing,
              through to 100,000+ units for production.
            </p>
          </div>

          {/* Right side: image + card */}
          <div className="space-y-4">
            {/* Microfluidics image – make sure filename matches this path */}
            <div className="overflow-hidden rounded-2xl border border-sky-700/40 bg-sky-900/60">
              <Image
                src="/microfluidics-hero.jpg"
                alt="Spiral microfluidic channel in a clear thermoplastic chip"
                width={800}
                height={500}
                className="h-48 w-full object-cover md:h-56"
                priority
              />
            </div>

            {/* From prototype to production card */}
            <div className="rounded-2xl border border-sky-600/40 bg-sky-900/60 p-5 shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">
                From prototype to production
              </p>
              <p className="mt-2 text-sm text-sky-50">
                Start with 3D-printed or CNC-machined microfluidics for rapid
                iteration, then scale into injection-moulded COC or PC once
                designs are locked.
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3 text-[0.7rem] text-sky-50">
                <div className="rounded-xl bg-sky-950/60 p-3">
                  <p className="text-[0.7rem] font-semibold text-sky-200">
                    1–1,000 units
                  </p>
                  <p className="mt-1">
                    3D-printed and CNC-machined parts for early testing and
                    design verification.
                  </p>
                </div>
                <div className="rounded-xl bg-sky-950/60 p-3">
                  <p className="text-[0.7rem] font-semibold text-sky-200">
                    1,000–100,000+ units
                  </p>
                  <p className="mt-1">
                    Injection-moulded thermoplastics with optional
                    optical-quality surfaces and production QC.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section
        id="capabilities"
        className="border-b border-slate-200 bg-white py-10 md:py-14"
      >
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
            One marketplace, three manufacturing routes
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            We connect you to vetted vendors for 3D-printed, CNC-machined and
            injection-moulded microfluidics – all under one brief, and one
            point of contact.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <h3 className="text-sm font-semibold text-slate-900">
                3D-printed microfluidics
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Ideal for very low volumes and rapid iteration. Explore
                geometries and concepts with 1–50 parts before committing to a
                tooling strategy.
              </p>
              <p className="mt-2 text-[0.75rem] text-slate-500">
                Typical volumes: 1–50 units.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <h3 className="text-sm font-semibold text-slate-900">
                CNC-machined microfluidics
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Production-grade plastics and tight tolerances for 10–1,000
                units, or ongoing low-volume supply in COC, PC and other
                thermoplastics.
              </p>
              <p className="mt-2 text-[0.75rem] text-slate-500">
                Typical volumes: 10–1,000 units.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <h3 className="text-sm font-semibold text-slate-900">
                Injection-moulded microfluidics
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                High-volume manufacturing in COC and polycarbonate with
                stable, repeatable performance and optional optical-quality
                surfaces.
              </p>
              <p className="mt-2 text-[0.75rem] text-slate-500">
                Typical volumes: 1,000–100,000+ units.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MATERIALS */}
      <section
        id="materials"
        className="border-b border-slate-200 bg-slate-50 py-10 md:py-14"
      >
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
            Materials for diagnostics, research and devices
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            COC and polycarbonate are our primary focus, but we also support
            other thermoplastics and 3D-printed resins for early-stage work.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <h3 className="text-sm font-semibold text-slate-900">COC</h3>
              <p className="mt-2 text-sm text-slate-600">
                Cyclic Olefin Copolymer for optical clarity, low
                autofluorescence and chemical resistance – ideal for diagnostic
                cartridges and sensing.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <h3 className="text-sm font-semibold text-slate-900">
                Polycarbonate
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Tough, impact-resistant and widely available, suitable for
                robust point-of-care devices and lab hardware.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <h3 className="text-sm font-semibold text-slate-900">
                Other thermoplastics &amp; 3D-printed polymers
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                PMMA and other thermoplastics, plus generic 3D-printed resins
                for proof-of-concept work where speed matters more than
                final-grade materials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="border-b border-slate-200 bg-white py-10 md:py-14"
      >
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
            How it works
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            A simple flow from design upload to production-ready microfluidic
            parts.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Step 1
              </p>
              <h3 className="mt-1 text-sm font-semibold text-slate-900">
                Upload your design
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Share CAD, drawings or images via our upload form. Include
                basic volumes and timing.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Step 2
              </p>
              <h3 className="mt-1 text-sm font-semibold text-slate-900">
                Manufacturability review
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                We review geometry, materials and volumes, then recommend a
                manufacturing route and vendor.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Step 3
              </p>
              <h3 className="mt-1 text-sm font-semibold text-slate-900">
                Quote, iterate &amp; scale
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                You receive pricing and lead times for your chosen volumes, with
                a roadmap to injection moulding when you&apos;re ready.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONFIDENTIALITY */}
      <section
        id="confidentiality"
        className="border-b border-slate-200 bg-slate-50 py-10 md:py-14"
      >
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
            Confidentiality &amp; IP
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            We treat your microfluidic designs, assays and device concepts as
            confidential. Designs are only shared with trusted vendors where
            needed to quote and manufacture your project.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3 text-sm">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Default confidentiality
              </p>
              <p className="mt-2 text-slate-700">
                RFQs are handled under an implied duty of confidence. We do not
                reuse or disclose your designs outside the context of your
                project.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                NDA available
              </p>
              <p className="mt-2 text-slate-700">
                If you require a formal NDA, we can provide our standard
                template for electronic signature, or review your preferred
                wording.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Your IP stays yours
              </p>
              <p className="mt-2 text-slate-700">
                One Stop Microfludics Shop / GB-Tech does not claim ownership of
                your IP. Our role is to help you manufacture and scale your
                design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-white py-10 md:py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
            Ready to discuss a project?
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Use the RFQ upload form for detailed projects, or send a quick
            message here if you&apos;re still exploring options.
          </p>

          <form
            className="mt-5 grid gap-3 text-sm md:grid-cols-2"
            action="mailto:your-email@example.com"
            method="post"
            encType="text/plain"
          >
            <div className="md:col-span-1">
              <label className="block text-xs font-medium text-slate-700">
                Your name
              </label>
              <input
                name="name"
                required
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>
            <div className="md:col-span-1">
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
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-700">
                Message
              </label>
              <textarea
                name="message"
                rows={4}
                required
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                placeholder="Tell us briefly about your microfluidic project, timelines, and what you need help with."
              />
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-3 md:col-span-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-500 transition-transform hover:-translate-y-0.5"
              >
                Send message
              </button>
              {/* CONTACT SECTION LINK TO UPLOAD – PLAIN LINK */}
              <a
                href="/upload"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-800 hover:border-sky-500 hover:text-sky-700 transition-transform hover:-translate-y-0.5"
              >
                Or upload a design instead
              </a>
            </div>

            <p className="mt-2 md:col-span-2 text-[0.7rem] text-slate-500">
              This form opens your default email client and sends your message
              to <code>your-email@example.com</code>. Replace this address with
              your real contact email in the code, or we can wire it into the
              portal later.
            </p>
          </form>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-slate-50 py-4 text-center text-[0.7rem] text-slate-500">
        Prototype marketplace – internal use.{" "}
        <Link href="/admin" className="underline hover:text-slate-700">
          Staff RFQ dashboard
        </Link>
      </footer>
    </div>
  );
}