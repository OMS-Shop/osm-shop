import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "One Stop Microfluidics Shop",
  description:
    "Microfluidic manufacturing across 3D printing, CNC machining, bonding/sealing, and injection moulding.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#020617] text-slate-100">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#020617]/80 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-4">
              <div className="flex h-12 w-20 items-center justify-center rounded-2xl bg-[#4ea6e6] text-lg font-bold text-white">
                OSMS
              </div>
              <div className="leading-tight">
                <div className="text-base font-semibold text-white">
                  One Stop Microfluidics Shop
                </div>
                <div className="text-sm text-slate-400">Powered by GB-Tech</div>
              </div>
            </Link>

            {/* Nav */}
            <nav className="ml-2 hidden items-center gap-8 text-base font-semibold text-slate-200 md:flex">
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

            {/* Right buttons */}
            <div className="ml-auto flex items-center gap-3">
              <Link
                href="/portal"
                className="rounded-full border border-slate-500 px-5 py-2 text-sm font-semibold text-slate-100 hover:border-slate-300"
              >
                View my orders
              </Link>
              <Link
                href="/upload"
                className="rounded-full bg-[#4ea6e6] px-5 py-2 text-sm font-semibold text-white hover:opacity-95"
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