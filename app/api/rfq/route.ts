import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);

function jsonError(message: string, status = 500, extra?: any) {
  return NextResponse.json({ ok: false, error: message, ...extra }, { status });
}

async function parseBody(req: Request): Promise<any | null> {
  const ct = (req.headers.get("content-type") || "").toLowerCase();

  if (ct.includes("application/json")) {
    return await req.json().catch(() => null);
  }

  if (ct.includes("multipart/form-data") || ct.includes("application/x-www-form-urlencoded")) {
    const fd = await req.formData().catch(() => null);
    if (!fd) return null;

    const obj: any = {};
    const files: any[] = [];

    for (const [key, val] of fd.entries()) {
      if (val instanceof File) {
        files.push({ field: key, name: val.name, type: val.type, size: val.size });
      } else {
        if (obj[key] === undefined) obj[key] = val;
        else if (Array.isArray(obj[key])) obj[key].push(val);
        else obj[key] = [obj[key], val];
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

    const RFQ_TO_EMAIL = process.env.RFQ_TO_EMAIL || "Carl.Dale@GBInnovation.onmicrosoft.com";

    const body = await parseBody(req);
    if (!body) return jsonError("Empty or unreadable request body", 400);

    const projectName = (body.projectName ?? "").toString().trim();
    const company = (body.company ?? "").toString().trim();
    const email = (body.email ?? "").toString().trim();
    const country = (body.country ?? "").toString().trim();
    const application = (body.application ?? "").toString().trim();
    const quantity = (body.quantity ?? "").toString().trim();
    const primaryMaterial = (body.primaryMaterial ?? "").toString().trim();
    const stage = (body.stage ?? "").toString().trim();
    const notes = (body.notes ?? "").toString().trim();

    const contactName = (body.contactName ?? "").toString().trim();

    if (!contactName || !email) {
      return jsonError("Missing required fields: contactName, email", 400, {
        fields: { contactName, email },
        receivedKeys: Object.keys(body || {}),
      });
    }

    const subject = `Microbritt / OSMS RFQ – ${projectName || "New RFQ"} – ${contactName}`;

    const filesHtml =
      Array.isArray(body.files) && body.files.length
        ? `<hr/><p><b>Files:</b></p><ul>${body.files
            .map(
              (f: any) =>
                `<li>${escapeHtml(f.name)} (${escapeHtml(f.type || "unknown")}, ${f.size} bytes)</li>`
            )
            .join("")}</ul>`
        : "";

    const html = `
      <h2>New RFQ</h2>
      <p><b>Customer name:</b> ${escapeHtml(contactName)}</p>
      <p><b>Email:</b> ${escapeHtml(email)}</p>
      <p><b>Company:</b> ${escapeHtml(company || "-")}</p>
      <p><b>Project name:</b> ${escapeHtml(projectName || "-")}</p>
      <p><b>Country:</b> ${escapeHtml(country || "-")}</p>
      <p><b>Application:</b> ${escapeHtml(application || "-")}</p>
      <p><b>Quantity:</b> ${escapeHtml(quantity || "-")}</p>
      <p><b>Primary material:</b> ${escapeHtml(primaryMaterial || "-")}</p>
      <p><b>Stage:</b> ${escapeHtml(stage || "-")}</p>
      <p><b>Notes:</b><br/>${escapeHtml(notes || "-").replace(/\n/g, "<br/>")}</p>
      ${filesHtml}
      <hr/>
      <pre style="white-space:pre-wrap;">${escapeHtml(JSON.stringify(body, null, 2))}</pre>
    `;

    const resendClient = new Resend(RESEND_API_KEY);

    // 1) Staff email
    const { data, error } = await resendClient.emails.send({
      from: RESEND_FROM,
      to: [RFQ_TO_EMAIL],
      subject,
      html,
      replyTo: email,
    });

    if (error) {
      return jsonError("Resend send failed", 500, { resend: error });
    }

    // 2) Customer confirmation email (won’t block success if it fails)
    const confirmSubject = "We received your RFQ (OSMS)";
    const confirmHtml = `
      <p>Hi ${escapeHtml(contactName)},</p>
      <p>Thanks — we’ve received your RFQ and will reply by email, usually within one working day.</p>
      <hr/>
      <p><b>Project:</b> ${escapeHtml(projectName || "-")}</p>
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
      replyTo: RFQ_TO_EMAIL,
    });

    if (confirm.error) {
      console.error("RFQ customer confirmation failed:", confirm.error);
    }

    return NextResponse.json({
      ok: true,
      id: data?.id ?? null,
      customerConfirmation: confirm.error ? "failed" : "sent",
    });
  } catch (err: any) {
    return jsonError(err?.message || "Server error", 500);
  }
}