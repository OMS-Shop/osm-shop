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
    const files: any[] = [];

    for (const [k, v] of fd.entries()) {
      if (v instanceof File) {
        files.push({ field: k, name: v.name, type: v.type, size: v.size });
      } else {
        if (obj[k] === undefined) obj[k] = v;
        else if (Array.isArray(obj[k])) obj[k].push(v);
        else obj[k] = [obj[k], v];
      }
    }

    if (files.length) obj.files = files;
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

    const NDA_TO_EMAIL = process.env.NDA_TO_EMAIL || "Carl.Dale@GBInnovation.onmicrosoft.com";

    const body = await parseBody(req);
    if (!body) return jsonError("Empty or unreadable request body", 400);

    const name = (body.name ?? body.contactName ?? "").toString().trim();
    const email = (body.email ?? "").toString().trim();
    const company = (body.company ?? "").toString().trim();
    const notes = (body.notes ?? body.message ?? "").toString().trim();

    if (!email) {
      return jsonError("Missing required field: email", 400, {
        fields: { email },
        receivedKeys: Object.keys(body || {}),
      });
    }

    const filesHtml =
      Array.isArray(body.files) && body.files.length
        ? `<hr/><p><b>Files (metadata only):</b></p><ul>${body.files
            .map(
              (f: any) =>
                `<li>${escapeHtml(f.name)} (${escapeHtml(f.type || "unknown")}, ${f.size} bytes)</li>`
            )
            .join("")}</ul>`
        : "";

    const subject = `Microbritt / OSMS NDA – ${name || company || email}`;

    const staffHtml = `
      <h2>NDA submission</h2>
      <p><b>Name:</b> ${escapeHtml(name || "-")}</p>
      <p><b>Email:</b> ${escapeHtml(email)}</p>
      <p><b>Company:</b> ${escapeHtml(company || "-")}</p>
      <p><b>Notes:</b><br/>${escapeHtml(notes || "-").replace(/\n/g, "<br/>")}</p>
      ${filesHtml}
      <hr/>
      <pre style="white-space:pre-wrap;">${escapeHtml(JSON.stringify(body, null, 2))}</pre>
    `;

    const resendClient = new Resend(RESEND_API_KEY);

    // 1) Staff email
    const staffSend = await resendClient.emails.send({
      from: RESEND_FROM,
      to: [NDA_TO_EMAIL],
      subject,
      html: staffHtml,
      replyTo: email,
    });

    if (staffSend.error) return jsonError("Resend send failed", 500, { resend: staffSend.error });

    // 2) Customer confirmation email (won’t block success if it fails)
    const confirmSubject = "We received your NDA request (OSMS)";
    const confirmHtml = `
      <p>Hi ${escapeHtml(name || "there")},</p>
      <p>Thanks — we’ve received your NDA request and will reply by email shortly.</p>
      <hr/>
      <p><b>Company:</b> ${escapeHtml(company || "-")}</p>
      <p><b>Notes:</b><br/>${escapeHtml(notes || "-").replace(/\n/g, "<br/>")}</p>
      <hr/>
      <p>One-Stop Microfluidics Shop (OSMS)</p>
    `;

    const confirm = await resendClient.emails.send({
      from: RESEND_FROM,
      to: [email],
      subject: confirmSubject,
      html: confirmHtml,
      replyTo: NDA_TO_EMAIL,
    });

    if (confirm.error) {
      console.error("NDA customer confirmation failed:", confirm.error);
    }

    return NextResponse.json({
      ok: true,
      id: staffSend.data?.id ?? null,
      customerConfirmation: confirm.error ? "failed" : "sent",
    });
  } catch (err: any) {
    return jsonError(err?.message || "Server error", 500);
  }
}