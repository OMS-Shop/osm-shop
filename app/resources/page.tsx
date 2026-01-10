import Link from "next/link";

type Cell = "Excellent" | "Good" | "Fair" | "Poor" | "Varies";

const materials = [
  { key: "coc", name: "COC", note: "mould-ready" },
  { key: "cop", name: "COP", note: "mould-ready" },
  { key: "pc", name: "Polycarbonate (PC)", note: "mould-ready" },
  { key: "pmma", name: "PMMA", note: "mould-ready" },
  { key: "resin", name: "3D-printed resin", note: "prototype-friendly" },
] as const;

const rows: {
  label: string;
  hint?: string;
  values: Record<(typeof materials)[number]["key"], Cell | string>;
}[] = [
  {
    label: "Biocompatibility",
    hint: "General suitability for biological assays (always validate for your assay, cleaning and surface treatment).",
    values: {
      coc: "Excellent",
      cop: "Excellent",
      pc: "Good",
      pmma: "Good",
      resin: "Varies",
    },
  },
  {
    label: "Mould-ready for scale-up",
    hint: "Suitability for injection moulding once the design is stable",
    values: {
      coc: "Excellent",
      cop: "Excellent",
      pc: "Excellent",
      pmma: "Good",
      resin: "Poor",
    },
  },
  {
    label: "Optical transparency",
    hint: "Typical clarity in visible range (depends on grade/thickness)",
    values: {
      coc: "Excellent",
      cop: "Excellent",
      pc: "Good",
      pmma: "Excellent",
      resin: "Varies",
    },
  },
  {
    label: "Ethanol resistance",
    hint: "Resistance to swelling/stress cracking (grade + exposure matter)",
    values: {
      coc: "Good",
      cop: "Good",
      pc: "Fair",
      pmma: "Fair",
      resin: "Varies",
    },
  },
  {
    label: "Acid / base resistance",
    hint: "General resistance (strong acids/bases always need checking)",
    values: {
      coc: "Good",
      cop: "Good",
      pc: "Fair",
      pmma: "Fair",
      resin: "Varies",
    },
  },
  {
    label: "Bonding / sealing compatibility",
    hint: "Preference for thermal bonding methods which do not introduce chemical contamination or crazing of the channels",
    values: {
      coc: "Excellent",
      cop: "Excellent",
      pc: "Good",
      pmma: "Good",
      resin: "Varies",
    },
  },
];

function Badge({ value }: { value: Cell | string }) {
  const v = String(value);

  const cls =
    v === "Excellent"
      ? "bg-emerald-100 text-emerald-900 ring-1 ring-emerald-200"
      : v === "Good"
      ? "bg-green-100 text-green-900 ring-1 ring-green-200"
      : v === "Fair"
      ? "bg-amber-100 text-amber-900 ring-1 ring-amber-200"
      : v === "Poor"
      ? "bg-rose-100 text-rose-900 ring-1 ring-rose-200"
      : "bg-slate-100 text-slate-900 ring-1 ring-slate-200";

  return (
    <span className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold ${cls}`}>
      {v}
    </span>
  );
}

export default function ResourcesPage() {
  return (
    <main className="bg-white text-slate-900">
      {/* Top */}
      <section className="mx-auto max-w-screen-xl px-6 pb-8 pt-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
              Resources
            </h1>
            <p className="mt-2 max-w-3xl text-sm text-slate-600">
              Helpful references for choosing processes and materials for microfluidic devices - more coming soon!
            </p>
          </div>

          <Link
            href="/upload"
            className="rounded-full bg-[#1d72ff] px-5 py-2.5 text-sm font-semibold text-white shadow hover:brightness-110"
          >
            Upload Design
          </Link>
        </div>
      </section>

      {/* Material parameters */}
      <section
        id="material-parameters"
        className="mx-auto max-w-screen-xl px-6 pb-16 pt-6"
      >
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
                Microfludic Production Materials Compared
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-slate-600">
                A practical comparison of common microfluidics materials. COC/COP/PC/PMMA are
                typically chosen when designs need to be mould-ready for scale-up, while 3D-printed
                resins are often best for early prototypes.
              </p>
            </div>
          </div>

          {/* Table container (keeps your table styling) */}
          <div className="mt-6 overflow-x-visible rounded-xl border border-slate-200 bg-white">
            <div className="p-4">
              <div className="w-full overflow-x-auto">
                <table className="w-full table-fixed border-separate border-spacing-0 text-sm text-slate-900">
                  <colgroup>
                    <col className="w-[26%]" />
                    <col className="w-[14.8%]" />
                    <col className="w-[14.8%]" />
                    <col className="w-[14.8%]" />
                    <col className="w-[14.8%]" />
                    <col className="w-[14.8%]" />
                  </colgroup>

                  <thead>
                    <tr>
                      <th className="sticky left-0 z-10 bg-white px-4 py-3 text-left text-xs font-semibold text-slate-700">
                        Parameter
                      </th>
                      {materials.map((m) => (
                        <th
                          key={m.key}
                          className="px-3 py-3 text-center text-xs font-semibold text-slate-700"
                        >
                          <div className="whitespace-nowrap">{m.name}</div>
                          <div className="mt-1 text-[11px] font-medium text-slate-500">
                            {m.note}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {rows.map((r) => (
                      <tr key={r.label} className="align-top">
                        <td className="sticky left-0 z-10 border-t border-slate-200 bg-white px-4 py-4">
                          <div className="text-sm font-semibold text-slate-900">
                            {r.label}
                          </div>
                          {r.hint ? (
                            <div className="mt-1 text-xs text-slate-500">
                              {r.hint}
                            </div>
                          ) : null}
                        </td>

                        {materials.map((m) => (
                          <td
                            key={m.key}
                            className="border-t border-slate-200 px-3 py-4 text-center"
                          >
                            <div className="flex justify-center">
                              <Badge value={r.values[m.key]} />
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-4 text-xs text-slate-500">
                Notes: Ratings are indicative and depend on grade, additives, channel geometry,
                stress, and exposure conditions. Always confirm with datasheets and end-use testing.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}