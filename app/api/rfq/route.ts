// app/api/rfq/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

// --- Email config ---------------------------------------------------------

const resendApiKey = process.env.RESEND_API_KEY;

// Where RFQs should be sent TO.
// If RFQ_TO_EMAIL isn't set, we default to Carl's address.
const RFQ_TO_EMAIL =
  process.env.RFQ_TO_EMAIL || "Carl.Dale@GBInnovation.onmicrosoft.com";

// The FROM address. If you haven't set up a custom domain in Resend yet,
// it's safest to use their default onboarding address.
const RFQ_FROM_EMAIL =
  process.env.RFQ_FROM_EMAIL || "OSMS RFQ <onboarding@resend.dev>";

if (!resendApiKey) {
  console.error("❌ Missing RESEND_API_KEY – RFQ emails cannot be sent.");
}

const resend = resendApiKey ? new Resend(resendApiKey) : null;

// -------------------------------------------------------------------------

function getField(form: FormData, name: string): string {
  const value = form.get(name);
  if (value == null) return "";
  return value.toString().trim();
}

export async function POST(req: NextRequest) {
  try {
    if (!resend || !resendApiKey) {
      return NextResponse.json(
        { error: "Email service is not configured (RESEND_API_KEY missing)." },
        { status: 500 }
      );
    }

    const form = await req.formData();

    const projectName = getField(form, "projectName");
    const company = getField(form, "company");
    const contactEmail = getField(form, "contactEmail");
    const country = getField(form, "country");
    const description = getField(form, "description");
    const quantity = getField(form, "quantity");
    const material = getField(form, "material");
    const stage = getField(form, "stage");
    const notes = getField(form, "notes");

    // Basic validation – we at least want an email and some description
    if (!contactEmail || !description) {
      return NextResponse.json(
        {
          error: "Please provide a contact email and brief description.",
        },
        { status: 400 }
      );
    }

    const subject = projectName
      ? `New RFQ – ${projectName}`
      : "New RFQ from One Stop Microfluidics Shop";

    const html = `
      <h2>New RFQ from One Stop Microfluidics Shop</h2>

      <p><strong>Project name:</strong> ${projectName || "(not provided)"}</p>
      <p><strong>Company:</strong> ${company || "(not provided)"}</p>
      <p><strong>Contact email:</strong> ${contactEmail}</p>
      <p><strong>Country:</strong> ${country || "(not provided)"}</p>

      <p><strong>Quantity:</strong> ${quantity || "(not provided)"}</p>
      <p><strong>Primary material:</strong> ${material || "(not provided)"}</p>
      <p><strong>Stage:</strong> ${stage || "(not provided)"}</p>

      <p><strong>Application / brief description:</strong></p>
      <p>${description.replace(/\n/g, "<br />")}</p>

      <p><strong>Technical notes for the team:</strong></p>
      <p>${notes ? notes.replace(/\n/g, "<br />") : "(none provided)"}</p>

      <hr />
      <p>
        Attachment info is stored in the OSMS portal.
        Log in to view and download the design files associated with this RFQ.
      </p>
    `;

    const text = `
New RFQ from One Stop Microfluidics Shop

Project name: ${projectName || "(not provided)"}
Company: ${company || "(not provided)"}
Contact email: ${contactEmail}
Country: ${country || "(not provided)"}

Quantity: ${quantity || "(not provided)"}
Primary material: ${material || "(not provided)"}
Stage: ${stage || "(not provided)"}

Application / brief description:
${description}

Technical notes for the team:
${notes || "(none provided)"}

----------------------------------------------------------------
Attachment info is stored in the OSMS portal.
Log in to view and download the design files for this RFQ.
    `.trim();

    // Send email via Resend
    const response = await resend.emails.send({
      from: RFQ_FROM_EMAIL,
      to: [RFQ_TO_EMAIL],
      subject,
      html,
      text,
    } as any); // `as any` keeps TS happy with different Resend versions

    console.log("✅ RFQ email sent:", response);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("❌ RFQ email error:", error);

    const details =
      error instanceof Error ? error.message : JSON.stringify(error);

    return NextResponse.json(
      {
        error: "Failed to submit RFQ",
        details,
      },
      { status: 500 }
    );
  }
}