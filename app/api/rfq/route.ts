// app/api/rfq/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Email configuration
// You can override these in Vercel > Settings > Environment Variables
// RFQ_FROM_EMAIL and RFQ_TO_EMAIL if you want.
const FROM_EMAIL =
  process.env.RFQ_FROM_EMAIL || "Carl.Dale@GBInnovation.onmicrosoft.com";
const TO_EMAIL =
  process.env.RFQ_TO_EMAIL || "Carl.Dale@GBInnovation.onmicrosoft.com";

// Create Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// Small helper so we don't put raw HTML-unescaped strings in the email
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Format all text fields from the form into a simple HTML block
function buildEmailHtml(fields: Record<string, string>): string {
  const rows = Object.entries(fields)
    .filter(([, v]) => v && v.trim() !== "")
    .map(
      ([key, value]) =>
        `<p><strong>${escapeHtml(key)}:</strong> ${escapeHtml(value)}</p>`
    )
    .join("\n");

  return `
    <div>
      <h2>New RFQ submitted via OSMS portal</h2>
      ${rows || "<p>(No form fields were captured)</p>"}
    </div>
  `;
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("RFQ API: Missing RESEND_API_KEY");
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 500 }
      );
    }

    const formData = await req.formData();

    // Collect all string fields from the multipart form
    const fields: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
      if (typeof value === "string") {
        fields[key] = value;
      }
    }

    // Try to infer a project / subject line and contact email
    const projectName =
      fields["projectName"] ||
      fields["project_name"] ||
      fields["Project name"] ||
      "Microfluidics RFQ";

    const contactEmail =
      fields["email"] ||
      fields["contactEmail"] ||
      fields["contact_email"] ||
      fields["Contact email"];

    const subject = `RFQ – ${projectName}`.slice(0, 200);
    const html = buildEmailHtml({
      ...fields,
      ...(contactEmail ? { "Contact email (parsed)": contactEmail } : {}),
    });

    // Send email via Resend
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      subject,
      html,
      // NOTE: we deliberately do NOT include `reply_to` here to avoid
      // the TypeScript error you saw. If we decide later to add it,
      // we’ll match whatever shape the current Resend SDK expects.
    });

    if ((result as any).error) {
      console.error("RFQ API: Resend error", (result as any).error);
      return NextResponse.json(
        { error: "Failed to submit RFQ" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("RFQ API: unexpected error", err);
    return NextResponse.json(
      { error: "Failed to submit RFQ" },
      { status: 500 }
    );
  }
}