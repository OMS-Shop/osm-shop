import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function jsonError(message: string, status = 500, extra?: any) {
  return NextResponse.json({ ok: false, error: message, ...extra }, { status });
}

async function parseBody(req: Request): Promise<any | null> {
  const ct = (req.headers.get("content-type") || "").toLowerCase();

  if (ct.includes("application/json")) return await req.json().catch(() => null);

  if (ct.includes("multipart/form-data") || ct.includes("application/x-www-form-urlencoded")) {
    const fd = await req.formData().catch(() => null);
    if (!fd) return null;

    const obj: any = {};
    for (const [k, v] of fd.entries()) {
      if (v instanceof File) continue; // ignore files for enquiry
      if (obj[k] === undefined) obj[k] = v;
      else if (Array.isArray(obj[k])) obj[k].push(v);
      else obj[k] = [obj[k], v];
    }
    return obj;
  }

  const text = await req.text().catch(() => "");
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
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

export async function POST(req: Request) {
  try {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) return jsonError("Missing RESEND_API_KEY env var", 500);

    const RESEND_FROM = process.env.RESEND_FROM;
    if (!RESEND_FROM) return jsonError("Missing RESEND_FROM env var", 500);

    const ENQUIRY_TO_EMAIL =
      process.env.ENQUIRY_TO_EMAIL || "Carl.Dale@GBInnovation.onmicrosoft.com";

    const body = await parseBody(req);
    if (!body) return jsonError("Empty or unreadable request body", 400);

    const name = (body.name ?? body.contactName ?? body.fullName ?? "").toString().trim();
    const email = (body.email ?? "").toString().trim();
    const company = (body.company ?? "").toString().trim();
    const message = (body.message ?? body.enquiry ?? body.notes ?? "").toString().trim();

    if (!email || !message) {
      return jsonError("Missing required fields: email, message", 400, {
        fields: { email, message },
        receivedKeys: Object.keys(body || {}),
      });
    }

    const subject = `Microbritt / OSMS Enquiry – ${name || company || email}`;

    const html = `
      <h2>New Enquiry</h2>
      <p><b>Name:</b> ${escapeHtml(name || "-")}</p>
      <p><b>Email:</b> ${escapeHtml(email)}</p>
      <p><b>Company:</b> ${escapeHtml(company || "-")}</p>
      <p><b>Message:</b><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
      <hr/>
      <pre style="white-space:pre-wrap;">${escapeHtml(JSON.stringify(body, null, 2))}</pre>
    `;

    const resend = new Resend(RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: RESEND_FROM,
      to: [ENQUIRY_TO_EMAIL],
      subject,
      html,
      replyTo: email,
    });

    if (error) return jsonError("Resend send failed", 500, { resend: error });

    return NextResponse.json({ ok: true, id: data?.id ?? null });
  } catch (err: any) {
    return jsonError(err?.message || "Server error", 500);
  }
}