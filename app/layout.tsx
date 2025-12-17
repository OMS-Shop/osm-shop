import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "One Stop Microfluidics Shop",
  description:
    "A single portal for prototype-to-production microfluidic manufacturing.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#020617] text-slate-50`}
      >
        <div className="min-h-screen bg-[#020617]">
          {/* Top navigation bar */}
          <header className="sticky top-0 z-30 border-b border-slate-800 bg-[#020617]/90 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              {/* Logo + brand */}
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-10 w-[70px] items-center justify-center rounded-xl bg-[#0ea5e9]">
                  <span className="text-sm font-extrabold tracking-tight text-white">
                    OSMS
                  </span>
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-[15px] font-semibold text-white">
                    One Stop Microfluidics Shop
                  </span>
                  <span className="text-[12px] text-slate-400">
                    Powered by GB-Tech
                  </span>
                </div>
              </Link>

              {/* Nav links */}
              <nav className="flex items-center gap-7 text-[15px] font-medium text-slate-200">
                <Link
                  href="/#how-it-works"
                  className="hover:text-white transition-colors"
                >
                  How it works
                </Link>
                <Link
                  href="/#processes"
                  className="hover:text-white transition-colors"
                >
                  Processes &amp; volumes
                </Link>

                <Link
                  href="/resources"
                  className="hover:text-white transition-colors"
                >
                  Resources
                </Link>

                <Link
                  href="/nda"
                  className="hover:text-white transition-colors"
                >
                  Confidentiality
                </Link>
                <Link
                  href="/#contact"
                  className="hover:text-white transition-colors"
                >
                  Contact us
                </Link>

                {/* Right-side buttons */}
                <Link
                  href="/portal"
                  className="rounded-full border border-slate-500 px-5 py-2 text-sm font-semibold text-slate-100 hover:border-slate-200 hover:text-white transition-colors"
                >
                  View my orders
                </Link>
                <Link
                  href="/upload"
                  className="rounded-full bg-[#0ea5e9] px-5 py-2 text-sm font-extrabold text-white shadow hover:bg-[#0284c7] transition-colors"
                >
                  Upload &amp; request a quote
                </Link>
              </nav>
            </div>
          </header>

          {/* Page content */}
          <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
        </div>
      </body>
    </html>
  );
}