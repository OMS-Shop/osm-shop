import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";            // IMPORTANT (avoid Edge runtime issues)
export const dynamic = "force-dynamic";     // avoid any caching weirdness

const resend = new Resend(process.env.RESEND_API_KEY);

function jsonError(message: string, status = 500, extra?: any) {
  return NextResponse.json({ ok: false, error: message, ...extra }, { status });
}

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return jsonError("Missing RESEND_API_KEY env var", 500);
    }

    const RFQ_TO_EMAIL =
      process.env.RFQ_TO_EMAIL || "Carl.Dale@GBInnovation.onmicrosoft.com";

    const RESEND_FROM =
      process.env.RESEND_FROM || "OSMS <onboarding@resend.dev>"; // change to your verified sender

    const body = await req.json().catch(() => null);
    if (!body) return jsonError("Invalid JSON body", 400);

    // Adjust these fields to match your form payload
    const name = (body.name ?? "").toString().trim();
    const email = (body.email ?? "").toString().trim();
    const company = (body.company ?? "").toString().trim();
    const message = (body.message ?? "").toString().trim();

    if (!name || !email) {
      return jsonError("Missing required fields: name, email", 400, { fields: { name, email } });
    }

    const subject = `Microbritt / OSMS RFQ – ${name}${company ? ` (${company})` : ""}`;

    const html = `
      <h2>New RFQ</h2>
      <p><b>Name:</b> ${escapeHtml(name)}</p>
      <p><b>Email:</b> ${escapeHtml(email)}</p>
      <p><b>Company:</b> ${escapeHtml(company || "-")}</p>
      <p><b>Message:</b><br/>${escapeHtml(message || "-").replace(/\n/g, "<br/>")}</p>
      <hr/>
      <pre style="white-space:pre-wrap;">${escapeHtml(JSON.stringify(body, null, 2))}</pre>
    `;

    const { data, error } = await resend.emails.send({
      from: RESEND_FROM,
      to: [RFQ_TO_EMAIL],
      subject,
      html,
      replyTo: email,
    });

    if (error) {
      return jsonError("Resend send failed", 500, { resend: error });
    }

    return NextResponse.json({ ok: true, id: data?.id ?? null });
  } catch (err: any) {
    return jsonError(err?.message || "Server error", 500);
  }
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}