import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from "./components/GoogleAnalytics";
import Header from "./components/Header";

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
        <GoogleAnalytics />
        <Header />
        {children}
      </body>
    </html>
  );
}