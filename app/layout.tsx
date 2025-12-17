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
          {/* Header */}
          <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-[#020617]/85 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center gap-6 px-8 py-4">
              {/* Brand */}
              <Link href="/" className="flex items-center gap-4 shrink-0">
                <div className="flex h-12 w-20 items-center justify-center rounded-2xl bg-[#0ea5e9] shadow-[0_0_30px_rgba(14,165,233,0.25)]">
                  <span className="text-base font-extrabold tracking-tight text-white">
                    OSMS
                  </span>
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-base font-semibold text-white whitespace-nowrap">
                    One Stop Microfluidics Shop
                  </span>
                  <span className="text-xs text-slate-400 whitespace-nowrap">
                    Powered by GB-Tech
                  </span>
                </div>
              </Link>

              {/* Nav (centered, no wrapping) */}
              <nav className="hidden lg:flex flex-1 items-center justify-center gap-8 text-[15px] font-semibold text-slate-200 text-center">
                <Link
                  href="/#how-it-works"
                  className="hover:text-white transition-colors whitespace-nowrap"
                >
                  How it works
                </Link>
                <Link
                  href="/#processes"
                  className="hover:text-white transition-colors whitespace-nowrap"
                >
                  Processes &amp; volumes
                </Link>
                <Link
                  href="/resources"
                  className="hover:text-white transition-colors whitespace-nowrap"
                >
                  Resources
                </Link>
                <Link
                  href="/nda"
                  className="hover:text-white transition-colors whitespace-nowrap"
                >
                  Confidentiality
                </Link>
                <Link
                  href="/#contact"
                  className="hover:text-white transition-colors whitespace-nowrap"
                >
                  Contact
                </Link>
              </nav>

              {/* Right buttons (slightly narrower) */}
              <div className="ml-auto flex items-center gap-3 shrink-0">
                <Link
                  href="/portal"
                  className="rounded-full border border-slate-500 px-4 py-2 text-sm font-semibold text-slate-100 hover:border-slate-200 hover:text-white transition-colors whitespace-nowrap"
                >
                  View my orders
                </Link>
                <Link
                  href="/upload"
                  className="rounded-full bg-[#0ea5e9] px-5 py-2.5 text-sm font-extrabold text-white shadow hover:bg-[#0284c7] transition-colors whitespace-nowrap"
                >
                  Upload Design
                </Link>
              </div>
            </div>
          </header>

          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}