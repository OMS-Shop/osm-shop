import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const NOTIFICATION_EMAIL = "Carl.Dale@GBInnovation.onmicrosoft.com";

// Use the same RESEND_API_KEY as before
const resend = new Resend(process.env.RESEND_API_KEY || "");

// Simple in-memory store for NDA acceptances (for now)
type NdaRecord = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  company: string;
  version: string;
  ip: string | null;
};

const ndas: NdaRecord[] = [];

/**
 * GET /api/nda
 * Returns the list of NDAs (later we can show this on /admin)
 */
export async function GET() {
  return NextResponse.json({ ndas: [...ndas].reverse() });
}

/**
 * POST /api/nda
 * Records an NDA acceptance and emails you.
 * Expects JSON:
 * { name: string, email: string, company?: string, version?: string }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const company = (body.company || "").trim();
    const version = (body.version || "v1").trim();

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Name and email are required." },
        { status: 400 }
      );
    }

    const ip =
      req.ip ||
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      null;

    const nda: NdaRecord = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
      name,
      email,
      company,
      version,
      ip,
    };

    ndas.push(nda);

    // Build NDA notification email
    const subject = `NDA accepted: ${name}`;
    const textBody = `
A new NDA has been accepted via the One Stop Microfluidics Shop portal.

Name:    ${name}
Email:   ${email}
Company: ${company || "-"}

Version: ${version}
IP:      ${ip || "-"}

Accepted at: ${nda.createdAt}

(Stored in memory for now – later we will persist this in a database / Notion.)
`.trim();

    // Try to send the email, but don't fail the API if email fails
    try {
      const result = await (resend as any).emails.send({
        from: "OSM Portal <nda@one-stop-microfluidics-shop.com>",
        to: NOTIFICATION_EMAIL,
        reply_to: email || undefined,
        subject,
        text: textBody,
      });

      console.log(
        "=== NDA email send OK ===",
        result?.id ? `id=${result.id}` : "(no id on result)"
      );
    } catch (err) {
      console.error("=== Error sending NDA email via Resend ===", err);
    }

    console.log("NDA accepted:", {
      name,
      email,
      company,
      version,
      ip,
    });

    return NextResponse.json({ success: true, id: nda.id });
  } catch (error) {
    console.error("Error handling NDA POST:", error);
    return NextResponse.json(
      { success: false, error: "Failed to record NDA." },
      { status: 500 }
    );
  }
}