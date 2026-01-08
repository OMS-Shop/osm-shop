import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import GoogleAnalytics from "./components/GoogleAnalytics";

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
      <body className="min-h-screen bg-[#020617] text-slate-100 antialiased">
        <header className="sticky top-0 z-50 border-b border-slate-800/50 bg-gradient-to-r from-[#020617] via-[#06142a] to-[#020617]/90 backdrop-blur">
          {/* Wider container so the nav can stay single-line */}
          <div className="mx-auto flex h-20 max-w-screen-2xl items-center justify-between gap-6 px-6">
            {/* Brand (do NOT allow shrink/squash) */}
            <Link href="/" className="flex flex-shrink-0 items-center gap-4">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-[#4aa3ff] shadow-sm">
                <span className="text-xl font-extrabold text-white tracking-wide">
                  OSMS
                </span>
              </div>

              <div className="min-w-[320px] leading-tight">
                <div className="whitespace-nowrap text-lg font-semibold text-white">
                  One Stop Microfluidics Shop
                </div>
                <div className="whitespace-nowrap text-sm text-slate-400">
                  Powered by GB-Tech
                </div>
              </div>
            </Link>

            {/* Nav (force single line per item) */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-200">
              <Link
                href="/#how-it-works"
                className="whitespace-nowrap hover:text-white"
              >
                How it works
              </Link>
              <Link
                href="/#processes"
                className="whitespace-nowrap hover:text-white"
              >
                Processes &amp; volumes
              </Link>
              <Link href="/resources" className="whitespace-nowrap hover:text-white">
                Resources
              </Link>
              <Link
                href="/#confidentiality"
                className="whitespace-nowrap hover:text-white"
              >
                Confidentiality
              </Link>
              <Link href="/#contact" className="whitespace-nowrap hover:text-white">
                Contact
              </Link>
            </nav>

            {/* Actions (no wrapping) */}
            <div className="flex flex-shrink-0 items-center gap-3">
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

        {/* ✅ GA4 */}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      </body>
    </html>
  );
}