import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "One Stop Microfluidics Shop",
  description: "Microfluidic manufacturing through a single portal.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#020617] text-slate-50">
        <header className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#020617]/80 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
            <Link href="/" className="flex items-center gap-4">
              <div className="flex h-12 w-20 items-center justify-center rounded-2xl bg-[#57a9e8] font-bold text-white">
                OSMS
              </div>
              <div className="leading-tight">
                <div className="text-[18px] font-semibold text-white">
                  One Stop Microfluidics Shop
                </div>
                <div className="text-sm text-slate-400">Powered by GB-Tech</div>
              </div>
            </Link>

            <nav className="hidden items-center gap-8 text-[15px] font-semibold text-slate-200 md:flex">
              <a href="/#how-it-works" className="hover:text-white">
                How it works
              </a>
              <a href="/#processes" className="hover:text-white">
                Processes &amp; volumes
              </a>
              <Link href="/resources" className="hover:text-white">
                Resources
              </Link>
              <a href="/#confidentiality" className="hover:text-white">
                Confidentiality
              </a>
              <a href="/#contact" className="hover:text-white">
                Contact
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/portal"
                className="rounded-full border border-slate-500/70 px-4 py-2 text-sm font-semibold text-slate-100 hover:border-slate-300"
              >
                View my orders
              </Link>
              <Link
                href="/upload"
                className="rounded-full bg-[#57a9e8] px-5 py-2 text-sm font-semibold text-white shadow hover:brightness-110"
              >
                Upload Design
              </Link>
            </div>
          </div>
        </header>

        <main className="bg-[#020617]">{children}</main>
      </body>
    </html>
  );
}