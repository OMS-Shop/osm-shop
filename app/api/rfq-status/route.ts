import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

type RfqStatus =
  | "received"
  | "quoted"
  | "ordered"
  | "in_production"
  | "shipped"
  | "cancelled";

interface RfqRecord {
  id: string;
  status?: RfqStatus;
  [key: string]: any; // allow any extra fields without TypeScript complaining
}

export async function GET() {
  try {
    // Read RFQ data from the JSON file in /data/rfqs.json
    const filePath = path.join(process.cwd(), "data", "rfqs.json");
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as RfqRecord[];

    // Normalise status: if missing, default to "received"
    const normalised = parsed.map((rfq) => ({
      ...rfq,
      status: (rfq.status as RfqStatus | undefined) ?? "received",
    }));

    return NextResponse.json(normalised, { status: 200 });
  } catch (error) {
    console.error("Error reading RFQ status file", error);
    return NextResponse.json(
      { error: "Unable to load RFQ statuses" },
      { status: 500 },
    );
  }
}