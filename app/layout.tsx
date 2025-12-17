import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "One Stop Microfluidics Shop",
  description: "Microfluidic manufacturing through a single portal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Force dark UI without touching globals.css */}
      <body className="min-h-screen bg-[#020617] text-slate-100 antialiased">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-slate-800/50 bg-gradient-to-r from-[#020617] via-[#06142a] to-[#020617]/90 backdrop-blur">
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6">
            {/* Brand */}
            <Link href="/" className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#4aa3ff] shadow-sm">
                <span className="text-xl font-extrabold text-white tracking-wide">
                  OSMS
                </span>
              </div>

              <div className="leading-tight">
                <div className="text-lg font-semibold text-white">
                  One Stop Microfluidics Shop
                </div>
                <div className="text-sm text-slate-400">Powered by GB-Tech</div>
              </div>
            </Link>

            {/* Nav (desktop) */}
            <nav className="hidden lg:flex items-center gap-10 text-sm font-semibold text-slate-200">
              <Link href="/#how-it-works" className="hover:text-white">
                How it works
              </Link>
              <Link href="/#processes" className="hover:text-white">
                Processes &amp; volumes
              </Link>
              <Link href="/resources" className="hover:text-white">
                Resources
              </Link>
              <Link href="/#confidentiality" className="hover:text-white">
                Confidentiality
              </Link>
              <Link href="/#contact" className="hover:text-white">
                Contact
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/portal"
                className="whitespace-nowrap rounded-full border border-slate-500/70 bg-transparent px-4 py-2 text-sm font-semibold leading-none text-slate-100 hover:border-slate-300"
              >
                View my orders
              </Link>

              <Link
                href="/upload"
                className="whitespace-nowrap rounded-full bg-[#4aa3ff] px-5 py-2 text-sm font-semibold leading-none text-white shadow hover:bg-[#1d72ff]"
              >
                Upload Design
              </Link>
            </div>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}