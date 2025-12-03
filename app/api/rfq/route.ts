import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type RFQRecord = {
  id: string;
  submittedAt: string;
  data: Record<string, any>;
};

// Simple in-memory store (resets when you restart `npm run dev`)
const rfqSubmissions: RFQRecord[] = [];

// GET /api/rfq  → list RFQs (for the admin page)
export async function GET() {
  return NextResponse.json({
    ok: true,
    count: rfqSubmissions.length,
    rfqs: rfqSubmissions,
  });
}

// POST /api/rfq  → called by the upload form
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const data = Object.fromEntries(formData.entries());

  const id = String(rfqSubmissions.length + 1);
  const submittedAt = new Date().toISOString();

  const rfq: RFQRecord = { id, submittedAt, data };
  rfqSubmissions.push(rfq);

  // 🔍 Friendly logging
  console.log("=========================================");
  console.log("🧾 New RFQ received");
  console.log("ID:          ", id);
  console.log("Submitted at:", submittedAt);
  console.log("Project:     ", data.project_name);
  console.log("Company:     ", data.company);
  console.log("Contact:     ", data.contact_name, `<${data.email}>`);
  console.log("Quantity:    ", data.quantity, "(", data.volume_band, ")");
  console.log("Processes:   ", data.processes);
  console.log("Material:    ", data.primary_material);
  console.log("Notes:       ", data.technical_notes);
  console.log("--- Full payload ---");
  console.dir(data, { depth: null });
  console.log("=========================================");

  return NextResponse.json({ ok: true });
}