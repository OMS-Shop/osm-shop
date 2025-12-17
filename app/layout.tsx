// app/layout.tsx
import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "One Stop Microfluidics Shop",
  description: "Microfluidic manufacturing through a single portal.",
};

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-700/40 bg-[#0b1220]/90 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Left: Logo + name */}
          <div className="flex items-center gap-5 min-w-0">
            <Link
              href="/"
              className="flex items-center gap-4 shrink-0"
              aria-label="OSMS Home"
            >
              <div className="flex h-20 w-24 items-center justify-center rounded-3xl bg-[#5aa8e6] shadow-sm">
                {/* ✅ Smaller text so it stays inside the pill */}
                <span className="text-xl font-extrabold text-white tracking-tight">
                  OSMS
                </span>
              </div>

              <div className="leading-tight">
                <div className="text-2xl font-semibold text-white whitespace-nowrap">
                  One Stop Microfluidics Shop
                </div>
                <div className="mt-1 text-base text-slate-300 whitespace-nowrap">
                  Powered by GB-Tech
                </div>
              </div>
            </Link>
          </div>

          {/* Middle nav */}
          <nav className="hidden lg:flex items-center gap-10 text-lg font-semibold text-slate-200">
            <Link href="/#how-it-works" className="hover:text-white whitespace-nowrap">
              How it works
            </Link>
            <Link href="/#processes" className="hover:text-white whitespace-nowrap">
              Processes &amp; volumes
            </Link>
            <Link href="/resources" className="hover:text-white whitespace-nowrap">
              Resources
            </Link>
            <Link href="/#confidentiality" className="hover:text-white whitespace-nowrap">
              Confidentiality
            </Link>
            <Link href="/#contact" className="hover:text-white whitespace-nowrap">
              Contact
            </Link>
          </nav>

          {/* Right CTAs */}
          <div className="flex items-center gap-4 shrink-0">
            <Link
              href="/portal"
              className="rounded-full border border-slate-500/70 bg-transparent px-5 py-2.5 text-base font-semibold text-slate-100 hover:border-slate-300 whitespace-nowrap"
            >
              View my orders
            </Link>

            <Link
              href="/upload"
              className="rounded-full bg-[#5aa8e6] px-6 py-2.5 text-base font-semibold text-white shadow hover:opacity-95 whitespace-nowrap"
            >
              Upload Design
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Force dark page background without touching globals.css */}
      <body className="min-h-screen bg-[#020617] text-slate-100">
        <Header />
        {children}
      </body>
    </html>
  );
}