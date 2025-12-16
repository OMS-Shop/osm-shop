import Link from "next/link";

function GoodIcon() {
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

function DependsIcon() {
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/15 ring-1 ring-amber-500/25">
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 text-amber-300"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <path d="M6 12h12" />
      </svg>
    </span>
  );
}

function LimitedIcon() {
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-500/15 ring-1 ring-rose-500/25">
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 text-rose-300"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <path d="M7 7l10 10" />
        <path d="M17 7L7 17" />
      </svg>
    </span>
  );
}

export default function ResourcesPage() {
  return (
    <div className="bg-[#020617] text-slate-100">
      <header className="mx-auto max-w-6xl px-6 pt-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white md:text-4xl">
              Resources
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">
              Practical notes to help you choose materials and production routes
              for microfluidic parts.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-full border border-slate-600 px-5 py-2 text-sm font-medium text-slate-100 hover:border-slate-300"
            >
              Back to homepage
            </Link>
            <Link
              href="/upload"
              className="rounded-full bg-[#0f6fff] px-5 py-2 text-sm font-semibold text-white hover:bg-[#1d72ff]"
            >
              Upload &amp; request a quote
            </Link>
          </div>
        </div>
      </header>

      {/* Material parameters */}
      <section
        id="material-parameters"
        className="mx-auto max-w-6xl px-6 pb-16 pt-10"
      >
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h2 className="text-base font-semibold text-white">
                Material parameters
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-slate-300">
                3D printing is excellent for early prototypes, but most teams
                move to{" "}
                <span className="font-semibold text-white">COC</span> /{" "}
                <span className="font-semibold text-white">COP</span> /{" "}
                <span className="font-semibold text-white">PC</span> for better
                chemical/thermal performance, optical behaviour, and a cleaner
                path to injection moulding.{" "}
                <span className="font-semibold text-white">
                  COC is also mould-ready
                </span>{" "}
                and commonly selected for production scale-up.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <GoodIcon />
                <span>Good</span>
              </div>
              <div className="flex items-center gap-2">
                <DependsIcon />
                <span>Depends</span>
              </div>
              <div className="flex items-center gap-2">
                <LimitedIcon />
                <span>Limited</span>
              </div>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-[1200px] w-full border-separate border-spacing-0">
              <thead>
                <tr className="text-left">
                  <th className="sticky left-0 z-10 bg-slate-900/40 px-4 py-3 text-xs font-semibold tracking-wide text-slate-300">
                    Key performance factors
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold tracking-wide text-slate-300">
                    3D Printed Resin
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold tracking-wide text-slate-300">
                    PMMA
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold tracking-wide text-slate-300">
                    PC
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold tracking-wide text-slate-300">
                    COC
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold tracking-wide text-slate-300">
                    COP
                  </th>
                </tr>
              </thead>

              <tbody className="text-sm">
                <tr className="border-t border-slate-800">
                  <td className="sticky left-0 z-10 bg-slate-900/40 px-4 py-3 text-slate-100">
                    <span className="font-medium">Biocompatibility</span>
                  </td>
                  <td className="px-4 py-3">
                    <DependsIcon />
                  </td>
                  <td className="px-4 py-3">
                    <GoodIcon />
                  </td>
                  <td className="px-4 py-3">
                    <GoodIcon />
                  </td>
                  <td className="px-4 py-3">
                    <GoodIcon />
                  </td>
                  <td className="px-4 py-3">
                    <GoodIcon />
                  </td>
                </tr>

                <tr className="border-t border-slate-800">
                  <td className="sticky left-0 z-10 bg-slate-900/40 px-4 py-3 text-slate-100">
                    <span className="font-medium">Ethanol resistance</span>
                  </td>
                  <td className="px-4 py-3">
                    <LimitedIcon />
                  </td>
                  <td className="px-4 py-3">
                    <DependsIcon />
                  </td>
                  <td className="px-4 py-3">
                    <GoodIcon />
                  </td>
                  <td className="px-4 py-3">
                    <GoodIcon />
                  </td>
                  <td className="px-4 py-3">
                    <GoodIcon />
                  </td>
                </tr>

                <tr className="border-t border-slate-800">
                  <td className="sticky left-0 z-10 bg-slate-900/40 px-4 py-3 text-slate-100">
                    <span className="font-medium">Acid &amp; base resistance</span>
                  </td>
                  <td className="px-4 py-3">
                    <LimitedIcon />
                  </td>
                  <td className="px-4 py-3">
                    <DependsIcon />
                  </td>
                  <td className="px-4 py-3">
                    <DependsIcon />
                  </td>
                  <td className="px-4 py-3">
                    <GoodIcon />
                  </td>
                  <td className="px-4 py-3">
                    <GoodIcon />
                  </td>
                </tr>

                <tr className="border-t border-slate-800">
                  <td className="sticky left-0 z-10 bg-slate-900/40 px-4 py-3 text-slate-100">
                    <div className="flex flex-col">
                      <span className="font-medium">
                        Optical transparency (visible)
                      </span>
                      <span className="mt-1 text-xs text-slate-400">
                        (clarity &amp; imaging)
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <DependsIcon />
                  </td>
                  <td className="px-4 py-3">
                    <GoodIcon />
                  </td>
                  <td className="px-4 py-3">
                    <GoodIcon />
                  </td>
                  <td className="px-4 py-3">
                    <GoodIcon />
                  </td>
                  <td className="px-4 py-3">
                    <GoodIcon />
                  </td>
                </tr>

                <tr className="border-t border-slate-800">
                  <td className="sticky left-0 z-10 bg-slate-900/40 px-4 py-3 text-slate-100 font-medium">
                    Surface behaviour (typical)
                  </td>
                  <td className="px-4 py-3 text-slate-200">
                    Often variable; post-cure / coatings needed
                  </td>
                  <td className="px-4 py-3 text-slate-200">
                    Slightly hydrophilic (common)
                  </td>
                  <td className="px-4 py-3 text-slate-200">Neutral</td>
                  <td className="px-4 py-3 text-slate-200">
                    Neutral to slightly hydrophobic
                  </td>
                  <td className="px-4 py-3 text-slate-200">
                    Neutral to slightly hydrophobic
                  </td>
                </tr>

                <tr className="border-t border-slate-800">
                  <td className="sticky left-0 z-10 bg-slate-900/40 px-4 py-3 text-slate-100 font-medium">
                    Example use case
                  </td>
                  <td className="px-4 py-3 text-slate-200">
                    Early form/fit tests &amp; fast iteration
                  </td>
                  <td className="px-4 py-3 text-slate-200">
                    Fast prototypes &amp; quick iteration
                  </td>
                  <td className="px-4 py-3 text-slate-200">
                    Handling robustness; broader thermal window
                  </td>
                  <td className="px-4 py-3 text-slate-200">
                    Fluorescence-friendly; mould-ready scale-up
                  </td>
                  <td className="px-4 py-3 text-slate-200">
                    Optical/fluorescence-heavy workflows; moulding-ready
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-slate-400">
            Notes: indicators are directional and can vary by supplier and grade.
            We’ll recommend the best material for your application and route.
          </p>
        </div>
      </section>
    </div>
  );
}