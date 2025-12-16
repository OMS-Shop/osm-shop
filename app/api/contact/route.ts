import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function jsonError(message: string, status = 500, extra?: any) {
  return NextResponse.json({ ok: false, error: message, ...extra }, { status });
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(req: Request) {
  try {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) return jsonError("Missing RESEND_API_KEY env var", 500);

    const RESEND_FROM = process.env.RESEND_FROM;
    if (!RESEND_FROM) return jsonError("Missing RESEND_FROM env var", 500);

    const ENQUIRY_TO_EMAIL =
      process.env.ENQUIRY_TO_EMAIL || "Carl.Dale@GBInnovation.onmicrosoft.com";

    const formData = await req.formData().catch(() => null);
    if (!formData) return jsonError("Invalid form submission", 400);

    const data = Object.fromEntries(formData.entries());

    const name = String(data.name || data.contactName || "").trim();
    const email = String(data.email || "").trim();
    const message = String(data.message || data.enquiry || data.notes || "").trim();

    if (!email || !message) {
      return jsonError("Missing required fields: email, message", 400, {
        fields: { email, message },
        receivedKeys: Object.keys(data || {}),
      });
    }

    const subject = `Microbritt / OSMS Enquiry – ${name || email}`;

    const html = `
      <h2>New website enquiry</h2>
      <p><b>Name:</b> ${escapeHtml(name || "-")}</p>
      <p><b>Email:</b> ${escapeHtml(email)}</p>
      <p><b>Message:</b><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
      <hr/>
      <pre style="white-space:pre-wrap;">${escapeHtml(JSON.stringify(data, null, 2))}</pre>
    `;

    const resend = new Resend(RESEND_API_KEY);
    const { data: sent, error } = await resend.emails.send({
      from: RESEND_FROM,
      to: [ENQUIRY_TO_EMAIL],
      subject,
      html,
      replyTo: email,
    });

    if (error) return jsonError("Resend send failed", 500, { resend: error });

    // ✅ Keep behaviour user-friendly: redirect back to homepage with a flag
    return new Response(null, {
      status: 303,
      headers: {
        Location: "/?enquiry=sent",
      },
    });
  } catch (err: any) {
    return jsonError(err?.message || "Server error", 500);
  }
}