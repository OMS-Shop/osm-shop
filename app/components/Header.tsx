"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type NavItem = { label: string; href: string };

const NAV_ITEMS: NavItem[] = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Processes & volumes", href: "/#processes" },
  { label: "Resources", href: "/resources" },
  { label: "Confidentiality", href: "/nda" }, // ✅ goes to NDA page
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on Escape
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Prevent background scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/50 bg-gradient-to-r from-[#020617] via-[#06142a] to-[#020617]/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-screen-2xl items-center justify-between gap-6 px-4 sm:px-6">
        {/* Brand */}
        <Link href="/" className="flex flex-shrink-0 items-center gap-4">
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-[#4aa3ff] shadow-sm sm:h-16 sm:w-16">
            <span className="text-lg font-extrabold tracking-wide text-white sm:text-xl">
              OSMS
            </span>
          </div>

          <div className="leading-tight">
            <div className="whitespace-nowrap text-base font-semibold text-white sm:text-lg">
              One Stop Microfluidics Shop
            </div>
            <div className="whitespace-nowrap text-xs text-slate-400 sm:text-sm">
              Powered by GB-Tech
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-200 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex flex-shrink-0 items-center gap-3">
          {/* Desktop upload button */}
          <Link
            href="/upload"
            className="hidden whitespace-nowrap rounded-full bg-[#4aa3ff] px-5 py-2 text-sm font-semibold leading-none text-white shadow hover:bg-[#1d72ff] sm:inline-flex"
          >
            Upload Design
          </Link>

          {/* Mobile burger */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-slate-900 p-2 text-white hover:bg-slate-800 lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile overlay + drawer */}
      {open && (
        <div className="lg:hidden">
          {/* Overlay */}
          <button
            aria-label="Close menu"
            className="fixed inset-0 z-50 bg-black/70"
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed right-0 top-0 z-50 h-full w-[86%] max-w-sm border-l border-white/10 bg-[#020617] p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-white">Menu</div>

              <button
                type="button"
                className="rounded-xl border border-white/10 bg-slate-900 p-2 text-white hover:bg-slate-800"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-6 flex flex-col gap-3 text-base font-semibold text-slate-100">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white hover:bg-slate-800"
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/upload"
                className="mt-2 rounded-xl bg-[#4aa3ff] px-4 py-3 text-center font-extrabold text-white hover:bg-[#1d72ff]"
              >
                Upload Design
              </Link>
            </div>

            <div className="mt-6 text-xs text-slate-400">
              © {new Date().getFullYear()} One Stop Microfluidics Shop
            </div>
          </div>
        </div>
      )}
    </header>
  );
}