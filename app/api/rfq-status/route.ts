// app/api/rfq-status/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import fs from "fs/promises";
import path from "path";

type RfqStatus =
  | "received"
  | "under_review"
  | "quoted"
  | "waiting_payment"
  | "in_production"
  | "shipped"
  | "complete";

type RfqRecord = {
  id: string;
  createdAt: string;
  status: RfqStatus;
  projectName: string;
  company: string;
  email: string;
  quantity: string;
  primaryMaterial: string;
  [key: string]: any;
};

const dataDir = path.join(process.cwd(), "data");
const rfqFilePath = path.join(dataDir, "rfqs.json");

const resendApiKey = process.env.RESEND_API_KEY;
const fromAddress =
  process.env.SMTP_FROM ||
  "One Stop Microfluidics Shop <no-reply@one-stop-microfluidics-shop.com>";
const baseUrl =
  process.env.APP_BASE_URL || "https://one-stop-microfluidics-shop.com";

const resend = resendApiKey ? new Resend(resendApiKey) : null;

async function readRfqs(): Promise<RfqRecord[]> {
  try {
    const raw = await fs.readFile(rfqFilePath, "utf8");
    const parsed = JSON.parse(raw) as RfqRecord[];
    return parsed.map((rfq) => ({
      status: "received",
      ...rfq,
      status: (rfq.status as RfqStatus) || "received",
    }));
  } catch (err: any) {
    if (err.code === "ENOENT") return [];
    console.error("Error reading RFQs:", err);
    return [];
  }
}

async function writeRfqs(rfqs: RfqRecord[]) {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(rfqFilePath, JSON.stringify(rfqs, null, 2), "utf8");
}

function statusLabel(status: RfqStatus): string {
  switch (status) {
    case "under_review":
      return "Under review";
    case "quoted":
      return "Quoted";
    case "waiting_payment":
      return "Waiting payment";
    case "in_production":
      return "In production";
    case "shipped":
      return "Shipped";
    case "complete":
      return "Complete";
    case "received":
    default:
      return "Received";
  }
}

async function sendStatusEmail(rfq: RfqRecord, newStatus: RfqStatus) {
  if (!resend) {
    console.warn("RESEND_API_KEY not set – skipping status email");
    return;
  }
  if (!rfq.email) return;

  // Only email for the more meaningful stages
  const shouldEmail = [
    "quoted",
    "waiting_payment",
    "in_production",
    "shipped",
    "complete",
  ].includes(newStatus);

  if (!shouldEmail) return;

  const label = statusLabel(newStatus);
  const portalLink = `${baseUrl}/portal?email=${encodeURIComponent(
    rfq.email
  )}`;

  const subject = `Your RFQ "${rfq.projectName}" is now ${label}`;
  const text =
    `Hi ${rfq.company || "there"},\n\n` +
    `The status of your RFQ with One Stop Microfluidics Shop has been updated.\n\n` +
    `Project: ${rfq.projectName}\n` +
    `Company: ${rfq.company}\n` +
    `Quantity: ${rfq.quantity}\n` +
    `Material: ${rfq.primaryMaterial}\n\n` +
    `New status: ${label}\n\n` +
    `You can view this update and track progress in your customer portal:\n` +
    `${portalLink}\n\n` +
    `Best regards,\n` +
    `One Stop Microfluidics Shop\n`;

  try {
    await resend.emails.send({
      from: fromAddress,
      to: rfq.email,
      subject,
      text,
    });
    console.log(
      `Status email sent for RFQ ${rfq.id} (${rfq.email}) -> ${label}`
    );
  } catch (err) {
    console.error("Error sending status email:", err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const id = String(body.id || "");
    const status = String(body.status || "") as RfqStatus;

    if (!id || !status) {
      return NextResponse.json(
        { error: "Missing id or status" },
        { status: 400 }
      );
    }

    const allowed: RfqStatus[] = [
      "received",
      "under_review",
      "quoted",
      "waiting_payment",
      "in_production",
      "shipped",
      "complete",
    ];

    if (!allowed.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 }
      );
    }

    const rfqs = await readRfqs();
    const idx = rfqs.findIndex((r) => r.id === id);

    if (idx === -1) {
      return NextResponse.json({ error: "RFQ not found" }, { status: 404 });
    }

    rfqs[idx].status = status;
    await writeRfqs(rfqs);

    // Fire-and-forget email; don't block the response on it
    sendStatusEmail(rfqs[idx], status).catch((err) =>
      console.error("Status email error:", err)
    );

    console.log(`RFQ ${id} status updated to ${status}`);

    return NextResponse.json({ ok: true, rfq: rfqs[idx] });
  } catch (err) {
    console.error("Error updating RFQ status:", err);
    return NextResponse.json(
      { error: "Failed to update status" },
      { status: 500 }
    );
  }
}