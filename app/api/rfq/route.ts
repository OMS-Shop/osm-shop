// app/api/rfq/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { Client as NotionClient } from "@notionhq/client";

// ===== Email setup (Resend) =====
const resendApiKey = process.env.RESEND_API_KEY;
const rfqRecipient =
  process.env.RFQ_RECIPIENT_EMAIL || "Carl.Dale@GBInnovation.onmicrosoft.com";
const smtpFrom =
  process.env.SMTP_FROM ||
  "One Stop Microfluidics Shop <no-reply@one-stop-microfluidics-shop.com>";

// Public URL for links in emails
const baseUrl =
  process.env.APP_BASE_URL || "https://one-stop-microfluidics-shop.com";

const resend = resendApiKey ? new Resend(resendApiKey) : null;

// ===== Notion setup =====
const notionApiKey = process.env.NOTION_API_KEY;
const notionDbId = process.env.NOTION_RFQ_DB_ID;

const notion =
  notionApiKey && notionDbId
    ? new NotionClient({ auth: notionApiKey })
    : null;

// ===== RFQ types =====
export type RfqStatus =
  | "Received"
  | "Under review"
  | "Quoted"
  | "Waiting payment"
  | "In production"
  | "Shipped"
  | "Complete";

export type RfqEntry = {
  id: string;
  createdAt: string;
  projectName: string;
  company: string;
  email: string;
  quantity: number | null;
  material: string;
  stage: string;
  status: RfqStatus;

  vendorUnitPrice?: number | null;
  customerUnitPrice?: number | null;
  currency?: string;
};

// In-memory RFQ list for this server process
const rfqs: RfqEntry[] = [];

function generateRfqId() {
  return "RFQ-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

// Helper: compute customer price with 45% commission
function computeCustomerPrice(vendor: number | null | undefined): number | null {
  if (vendor == null || Number.isNaN(vendor)) return null;
  return Math.round(vendor * 1.45 * 100) / 100;
}

// ===== Helper: read Vendor £/part from Notion via REST API and map by RFQ ID =====
async function buildNotionPricingMap(): Promise<Record<string, number>> {
  if (!notionApiKey || !notionDbId) {
    console.log("Notion API key or DB ID missing, skipping pricing fetch.");
    return {};
  }

  const map: Record<string, number> = {};
  let cursor: string | undefined = undefined;

  try {
    do {
      const body: any = {};
      if (cursor) body.start_cursor = cursor;

      const res = await fetch(
        `https://api.notion.com/v1/databases/${notionDbId}/query`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${notionApiKey}`,
            "Notion-Version": "2022-06-28",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) {
        const text = await res.text();
        console.error("Notion query failed:", res.status, text);
        break;
      }

      const data: any = await res.json();

      for (const page of data.results || []) {
        const props = page.properties as any;

        const rfqIdProp = props["RFQ ID"];
        const vendorProp = props["Vendor £/part"];

        if (!rfqIdProp || rfqIdProp.type !== "rich_text") continue;
        const firstText = rfqIdProp.rich_text?.[0]?.plain_text;
        const rfqId = firstText ? firstText.trim() : "";
        if (!rfqId) continue;

        let vendorPrice: number | null = null;
        if (
          vendorProp &&
          vendorProp.type === "number" &&
          typeof vendorProp.number === "number"
        ) {
          vendorPrice = vendorProp.number;
        }

        if (vendorPrice != null) {
          map[rfqId] = vendorPrice;
        }
      }

      cursor = data.has_more ? data.next_cursor ?? undefined : undefined;
    } while (cursor);

    console.log("Notion pricing map built:", map);
  } catch (err) {
    console.error("Error querying Notion for pricing:", err);
    return {};
  }

  return map;
}

// ===== GET: return RFQs (enriched with pricing from Notion) =====
export async function GET() {
  console.log("GET /api/rfq called. In-memory RFQs:", rfqs);

  // Start from the in-memory RFQs
  let enriched = rfqs.slice();

  // If Notion is configured, pull vendor prices and compute customer prices
  if (notionApiKey && notionDbId) {
    const priceMap = await buildNotionPricingMap();
    console.log("Price map from Notion:", priceMap);

    enriched = enriched.map((rfq) => {
      const vendorPrice =
        rfq.id && priceMap[rfq.id] != null ? priceMap[rfq.id] : null;
      const customerPrice = computeCustomerPrice(vendorPrice);
      return {
        ...rfq,
        vendorUnitPrice: vendorPrice,
        customerUnitPrice: customerPrice,
        currency: "GBP",
      };
    });
  } else {
    console.log("Notion not configured – returning RFQs without pricing.");
  }

  console.log("Enriched RFQs returned to client:", enriched);
  return NextResponse.json({ rfqs: enriched });
}

// ===== POST: handle new RFQ submissions =====
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const projectName =
      String(formData.get("projectName") || "").trim() ||
      "Untitled project";
    const company = String(formData.get("company") || "").trim();
    const email = String(formData.get("email") || "").trim();

    const quantityRaw = String(formData.get("quantity") || "").trim();
    const quantity = quantityRaw ? Number(quantityRaw) : null;

    const material = String(formData.get("primaryMaterial") || "").trim();
    const stage =
      String(formData.get("stage") || formData.get("volumeBand") || "").trim();

    const rfqId = generateRfqId();
    const createdAt = new Date().toISOString();
    const status: RfqStatus = "Received";

    const rfq: RfqEntry = {
      id: rfqId,
      createdAt,
      projectName,
      company,
      email,
      quantity,
      material,
      stage,
      status,
      vendorUnitPrice: null,
      customerUnitPrice: null,
      currency: "GBP",
    };

    // Store in memory for admin/customer UI
    rfqs.unshift(rfq);
    console.log("New RFQ stored in memory:", rfq);

    // ===== 1) Internal notification email (to you) =====
    if (resend && rfqRecipient) {
      const internalText =
        `A new RFQ has been submitted via the One Stop Microfluidics Shop portal.\n\n` +
        `RFQ ID: ${rfqId}\n` +
        `Project: ${projectName}\n` +
        `Company: ${company || "—"}\n` +
        `Email: ${email || "—"}\n` +
        (quantity !== null ? `Quantity: ${quantity}\n` : "") +
        (material ? `Material: ${material}\n` : "") +
        (stage ? `Stage: ${stage}\n` : "") +
        `\nAdmin portal: ${baseUrl}/admin\n`;

      try {
        await resend.emails.send({
          from: smtpFrom,
          to: rfqRecipient,
          subject: `New RFQ: ${projectName}`,
          text: internalText,
        });
      } catch (err) {
        console.error("Error sending RFQ email via Resend (internal):", err);
      }
    } else {
      console.log("Resend not configured, skipping internal RFQ email.");
    }

    // ===== 2) Customer confirmation email =====
    if (resend && email) {
      const portalLink = `${baseUrl}/portal?email=${encodeURIComponent(
        email
      )}`;
      const ndaLink = `${baseUrl}/nda`;

      const customerText =
        `Hi ${company || "there"},\n\n` +
        `Thanks for submitting a request for quote to the One Stop Microfluidics Shop.\n` +
        `We’ve received your RFQ and will review manufacturability, lead time and pricing.\n\n` +
        `Summary of your request:\n` +
        `  • RFQ ID:   ${rfqId}\n` +
        `  • Project:  ${projectName}\n` +
        `  • Company:  ${company || "—"}\n` +
        `  • Quantity: ${quantity ?? "—"}\n` +
        `  • Material: ${material || "—"}\n\n` +
        `You can track the status of your RFQ in the customer portal:\n` +
        `${portalLink}\n\n` +
        `If you haven’t already signed our mutual NDA, you can do that here:\n` +
        `${ndaLink}\n\n` +
        `Best regards,\n` +
        `One Stop Microfluidics Shop\n`;

      try {
        await resend.emails.send({
          from: smtpFrom,
          to: email,
          subject: "We’ve received your RFQ – One Stop Microfluidics Shop",
          text: customerText,
        });
      } catch (err) {
        console.error("Error sending RFQ email via Resend (customer):", err);
      }
    }

    // ===== 3) Create a row in Notion RFQ database =====
    if (notion && notionDbId) {
      try {
        await notion.pages.create({
          parent: { database_id: notionDbId },
          properties: {
            "Project name": {
              title: [
                {
                  text: { content: projectName },
                },
              ],
            },
            "RFQ ID": {
              rich_text: [
                {
                  text: { content: rfqId },
                },
              ],
            },
            Company: {
              rich_text: company
                ? [
                    {
                      text: { content: company },
                    },
                  ]
                : [],
            },
            Email: {
              email: email || undefined,
            },
            Quantity: {
              number: quantity,
            },
            Material: {
              rich_text: material
                ? [
                    {
                      text: { content: material },
                    },
                  ]
                : [],
            },
            Stage: stage
              ? {
                  select: { name: stage },
                }
              : undefined,
            Status: {
              select: { name: "Received" },
            },
            "Vendor £/part": {
              number: null,
            },
            "Customer £/part": {
              number: null,
            },
          },
        });
      } catch (err) {
        console.error("Error creating RFQ in Notion:", err);
      }
    } else {
      console.log("Notion not configured, skipping RFQ → Notion sync.");
    }

    return NextResponse.json({ ok: true, rfqId });
  } catch (error) {
    console.error("RFQ handler error:", error);
    return NextResponse.json(
      { ok: false, error: "RFQ submission failed" },
      { status: 500 }
    );
  }
}