// app/api/rfq/route.ts

import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

// Small helper to keep us safe in HTML
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const projectName = String(formData.get("projectName") ?? "");
    const company = String(formData.get("company") ?? "");
    const email = String(formData.get("email") ?? "");
    const country = String(formData.get("country") ?? "");
    const quantity = String(formData.get("quantity") ?? "");
    const primaryMaterial = String(formData.get("primaryMaterial") ?? "");
    const stage = String(formData.get("stage") ?? "");
    const notes = String(formData.get("notes") ?? "");

    // Collect any uploaded files (we only look for File entries)
    const files: File[] = [];
    for (const value of formData.values()) {
      if (value instanceof File && value.size > 0) {
        files.push(value);
      }
    }

    // Email config – tries RFQ-specific vars first, then falls back
    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail =
      process.env.RFQ_INBOX_EMAIL ||
      process.env.NDA_INBOX_EMAIL || // fallback if you use same inbox
      "";
    const fromEmail =
      process.env.RFQ_FROM_EMAIL ||
      process.env.NDA_FROM_EMAIL ||
      process.env.RESEND_FROM_EMAIL ||
      "";

    if (!resendApiKey || !toEmail || !fromEmail) {
      console.error("RFQ email configuration missing", {
        hasResendKey: !!resendApiKey,
        toEmail,
        fromEmail,
      });

      return NextResponse.json(
        {
          error: "Server email configuration is missing.",
          details:
            "Missing RESEND_API_KEY or RFQ_INBOX_EMAIL / RFQ_FROM_EMAIL (or NDA_* fallbacks).",
        },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    // Build basic HTML email body
    const html = `
      <h1>New RFQ from OSMS portal</h1>
      <p><strong>Project:</strong> ${escapeHtml(projectName || "(not provided)")}</p>
      <p><strong>Company:</strong> ${escapeHtml(company || "(not provided)")}</p>
      <p><strong>Email:</strong> ${escapeHtml(email || "(not provided)")}</p>
      <p><strong>Country:</strong> ${escapeHtml(country || "(not provided)")}</p>
      <p><strong>Quantity:</strong> ${escapeHtml(quantity || "(not provided)")}</p>
      <p><strong>Primary material:</strong> ${escapeHtml(
        primaryMaterial || "(not provided)"
      )}</p>
      <p><strong>Stage:</strong> ${escapeHtml(stage || "(not provided)")}</p>
      <p><strong>Notes / technical details:</strong></p>
      <pre style="white-space:pre-wrap;font-family:system-ui, -apple-system, sans-serif;">
${escapeHtml(notes || "")}
      </pre>
      <p><strong>Number of attached files:</strong> ${files.length}</p>
    `;

    // Convert attachments for Resend (if there are any)
    const attachments =
      files.length > 0
        ? await Promise.all(
            files.map(async (file) => {
              const arrayBuffer = await file.arrayBuffer();
              // Buffer is available in Node.js runtime
              const buffer = Buffer.from(arrayBuffer);
              return {
                filename: file.name,
                content: buffer.toString("base64"),
              };
            })
          )
        : undefined;

    // Send email
    const subject = projectName
      ? `RFQ – ${projectName}`
      : "New RFQ from OSMS portal";

    const result = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject,
      html,
      reply_to: email || undefined,
      attachments,
    });

    if ((result as any)?.error) {
      console.error("Resend RFQ email error", (result as any).error);
      return NextResponse.json(
        {
          error: "Failed to send RFQ email",
          details: (result as any).error?.message ?? "Unknown Resend error",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("RFQ submission failed", error);
    return NextResponse.json(
      {
        error: "Failed to submit RFQ",
        details: error?.message ?? String(error),
      },
      { status: 500 }
    );
  }
}