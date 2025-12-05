"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const STAFF_EMAIL = "Carl.Dale@GBInnovation.onmicrosoft.com";
// 👉 You can change this password to whatever you like.
// This is just for a prototype – not production-secure.
const STAFF_PASSWORD = "OSMportal2024!";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState(STAFF_EMAIL);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (
      email.trim().toLowerCase() === STAFF_EMAIL.toLowerCase() &&
      password === STAFF_PASSWORD
    ) {
      // Mark staff as "logged in" in the browser
      if (typeof window !== "undefined") {
        localStorage.setItem("osmStaffLoggedIn", "true");
      }
      router.push("/admin");
      return;
    }

    setError("Incorrect email or password.");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-md mx-auto px-4 py-10 space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold">Staff login</h1>
          <p className="text-sm text-slate-300">
            This login is for internal use to view RFQs and NDA acceptances.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Email address
            </label>
            <input
              type="email"
              className="w-full rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-sm text-rose-400 bg-rose-900/30 border border-rose-700 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium bg-sky-500 hover:bg-sky-400 disabled:opacity-60 disabled:cursor-not-allowed text-slate-950 transition"
          >
            {isSubmitting ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="text-xs text-slate-500">
          Prototype only – this login is implemented client-side and is not
          suitable for production security. We&apos;ll replace it with proper
          auth later.
        </p>
      </div>
    </main>
  );
}