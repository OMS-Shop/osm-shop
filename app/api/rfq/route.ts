// app/api/rfq/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Inbox where RFQs arrive
const PORTAL_INBOX = "Carl.Dale@GBInnovation.onmicrosoft.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Be tolerant of different field names from the form
    const contactEmail: string | undefined =
      body.contactEmail ||
      body.email ||
      body.contact_email ||
      body.contact ||
      undefined;

    const description: string | undefined =
      body.description ||
      body.briefDescription ||
      body.applicationDescription ||
      body.projectDescription ||
      undefined;

    const projectName: string | undefined =
      body.projectName || body.project || body.title || undefined;

    const company: string | undefined =
      body.company || body.organisation || body.organization || undefined;

    const country: string | undefined = body.country || undefined;
    const quantity: string | number | undefined = body.quantity;
    const material: string | undefined = body.primaryMaterial || body.material;
    const stage: string | undefined = body.stage || body.projectStage;
    const notes: string | undefined =
      body.technicalNotes || body.notes || body.comments;

    // Minimal validation
    if (
      !contactEmail ||
      typeof contactEmail !== "string" ||
      !description ||
      typeof description !== "string"
    ) {
      return NextResponse.json(
        {
          error: "Please provide a contact email and brief description.",
        },
        { status: 400 }
      );
    }

    // Build a simple text email
    const lines: string[] = [];

    lines.push("New RFQ submitted via OSMS portal");
    lines.push("---------------------------------");
    lines.push(`Contact email: ${contactEmail}`);
    if (projectName) lines.push(`Project name: ${projectName}`);
    if (company) lines.push(`Company: ${company}`);
    if (country) lines.push(`Country: ${country}`);
    if (quantity !== undefined) lines.push(`Quantity: ${quantity}`);
    if (material) lines.push(`Material: ${material}`);
    if (stage) lines.push(`Stage: ${stage}`);
    lines.push("");
    lines.push("Description / brief:");
    lines.push(description);
    lines.push("");
    if (notes) {
      lines.push("Technical notes:");
      lines.push(notes);
      lines.push("");
    }

    const text = lines.join("\n");

    // IMPORTANT: use Resend's default verified sender domain
    // to avoid domain-verification errors.
    const { data, error } = await resend.emails.send({
      from: "OSMS Portal <onboarding@resend.dev>",
      to: [PORTAL_INBOX],
      subject: projectName
        ? `OSMS RFQ – ${projectName}`
        : "OSMS RFQ – New request",
      reply_to: contactEmail, // this is allowed in current Resend API
      text,
    });

    if (error) {
      console.error("Resend error while sending RFQ email", error);
      return NextResponse.json(
        {
          error: "Email provider error when sending RFQ.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      id: data?.id ?? null,
    });
  } catch (err) {
    console.error("RFQ API unexpected error", err);
    return NextResponse.json(
      { error: "Failed to submit RFQ" },
      { status: 500 }
    );
  }
}