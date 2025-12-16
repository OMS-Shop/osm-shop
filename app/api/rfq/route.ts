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

  // JSON
  if (ct.includes("application/json")) {
    return await req.json().catch(() => null);
  }

  // Multipart/FormData (common when uploading files)
  if (ct.includes("multipart/form-data") || ct.includes("application/x-www-form-urlencoded")) {
    const fd = await req.formData().catch(() => null);
    if (!fd) return null;

    const obj: any = {};
    const files: any[] = [];

    for (const [key, val] of fd.entries()) {
      if (val instanceof File) {
        files.push({ field: key, name: val.name, type: val.type, size: val.size });
      } else {
        // support repeated keys
        if (obj[key] === undefined) obj[key] = val;
        else if (Array.isArray(obj[key])) obj[key].push(val);
        else obj[key] = [obj[key], val];
      }
    }

    if (files.length) obj.files = files;
    return obj;
  }

  // Fallback: try text -> JSON
  const text = await req.text().catch(() => "");
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return jsonError("Missing RESEND_API_KEY env var", 500);
    }

    const RFQ_TO_EMAIL =
      process.env.RFQ_TO_EMAIL || "Carl.Dale@GBInnovation.onmicrosoft.com";

    const RESEND_FROM =
      process.env.RESEND_FROM || "OSMS <onboarding@resend.dev>"; // replace with verified sender

    const body = await parseBody(req);
    if (!body) return jsonError("Empty or unreadable request body", 400);

    // Adjust these fields to match your form payload keys
    const name = (body.name ?? body.fullName ?? "").toString().trim();
    const email = (body.email ?? body.contactEmail ?? "").toString().trim();
    const company = (body.company ?? body.organisation ?? "").toString().trim();
    const message = (body.message ?? body.notes ?? "").toString().trim();

    if (!name || !email) {
      return jsonError("Missing required fields: name, email", 400, {
        fields: { name, email },
        receivedKeys: Object.keys(body || {}),
      });
    }

    const subject = `Microbritt / OSMS RFQ – ${name}${company ? ` (${company})` : ""}`;

    const html = `
      <h2>New RFQ</h2>
      <p><b>Name:</b> ${escapeHtml(name)}</p>
      <p><b>Email:</b> ${escapeHtml(email)}</p>
      <p><b>Company:</b> ${escapeHtml(company || "-")}</p>
      <p><b>Message:</b><br/>${escapeHtml(message || "-").replace(/\n/g, "<br/>")}</p>

      ${
        Array.isArray(body.files) && body.files.length
          ? `<hr/><p><b>Files:</b></p><ul>${body.files
              .map(
                (f: any) =>
                  `<li>${escapeHtml(f.name)} (${escapeHtml(f.type || "unknown")}, ${f.size} bytes)</li>`
              )
              .join("")}</ul>`
          : ""
      }

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