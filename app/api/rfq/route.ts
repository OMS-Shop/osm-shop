// app/api/rfq/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";
import { Resend } from "resend";

const notionApiKey = process.env.NOTION_API_KEY;
const notionDatabaseId = process.env.NOTION_RFQ_DATABASE_ID;
const resendApiKey = process.env.RESEND_API_KEY;
const notificationEmailTo = process.env.RFQ_NOTIFICATION_EMAIL_TO;

/**
 * Shape of the RFQ payload sent from the upload form.
 * All fields are optional so we don't get TypeScript errors if something is missing.
 */
type RfqPayload = {
  projectName?: string;
  company?: string;
  contactName?: string;
  contactEmail?: string;
  country?: string;
  quantity?: number;
  primaryMaterial?: string;
  stage?: string;
  notes?: string;
};

function createNotionClient() {
  if (!notionApiKey) {
    throw new Error("NOTION_API_KEY is not set");
  }
  if (!notionDatabaseId) {
    throw new Error("NOTION_RFQ_DATABASE_ID is not set");
  }

  const notion = new Client({ auth: notionApiKey });
  return { notion, databaseId: notionDatabaseId };
}

function createResendClient() {
  if (!resendApiKey) return null;
  return new Resend(resendApiKey);
}

/**
 * Helper to build Notion properties.
 * We keep the typing very loose (Record<string, any>) to avoid
 * fighting the Notion SDK types during the build.
 */
function buildNotionProperties(payload: RfqPayload): Record<string, any> {
  const {
    projectName,
    company,
    contactName,
    contactEmail,
    country,
    quantity,
    primaryMaterial,
    stage,
    notes,
  } = payload;

  const properties: Record<string, any> = {
    Name: {
      title: [
        {
          text: {
            content: projectName || "Untitled microfluidics RFQ",
          },
        },
      ],
    },
    Company: company
      ? {
          rich_text: [
            {
              text: { content: company },
            },
          ],
        }
      : undefined,
    "Contact name": contactName
      ? {
          rich_text: [
            {
              text: { content: contactName },
            },
          ],
        }
      : undefined,
    "Contact email": {
      // Notion Email property expects string | null
      email: contactEmail ?? null,
    },
    Country: country
      ? {
          rich_text: [
            {
              text: { content: country },
            },
          ],
        }
      : undefined,
    Quantity:
      typeof quantity === "number"
        ? {
            number: quantity,
          }
        : undefined,
    Material: primaryMaterial
      ? {
          rich_text: [
            {
              text: { content: primaryMaterial },
            },
          ],
        }
      : undefined,
    Stage: stage
      ? {
          rich_text: [
            {
              text: { content: stage },
            },
          ],
        }
      : undefined,
    Notes: notes
      ? {
          rich_text: [
            {
              text: { content: notes },
            },
          ],
        }
      : undefined,
  };

  // Remove any undefined properties so Notion doesn't complain.
  Object.keys(properties).forEach((key) => {
    if (properties[key] === undefined) {
      delete properties[key];
    }
  });

  return properties;
}

async function createNotionPage(payload: RfqPayload) {
  const { notion, databaseId } = createNotionClient();
  const properties = buildNotionProperties(payload);

  await notion.pages.create({
    parent: { database_id: databaseId },
    properties,
  } as any);
}

async function sendNotificationEmail(payload: RfqPayload) {
  if (!notificationEmailTo) return;
  const resend = createResendClient();
  if (!resend) return;

  const {
    projectName,
    company,
    contactName,
    contactEmail,
    country,
    quantity,
    primaryMaterial,
    stage,
    notes,
  } = payload;

  const subject = `New RFQ – ${projectName || "Untitled project"}`;

  const lines = [
    `Project: ${projectName || "N/A"}`,
    `Company: ${company || "N/A"}`,
    `Contact name: ${contactName || "N/A"}`,
    `Contact email: ${contactEmail || "N/A"}`,
    `Country: ${country || "N/A"}`,
    `Quantity: ${quantity ?? "N/A"}`,
    `Material: ${primaryMaterial || "N/A"}`,
    `Stage: ${stage || "N/A"}`,
    "",
    "Notes:",
    notes || "N/A",
  ];

  await resend.emails.send({
    from: "OSMS RFQ <rfq@osms-portal.com>",
    to: notificationEmailTo,
    subject,
    text: lines.join("\n"),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RfqPayload;

    // Basic sanity check
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 },
      );
    }

    // Create Notion page
    await createNotionPage(body);

    // Fire-and-forget notification email – errors here shouldn't break the RFQ
    sendNotificationEmail(body).catch((err) => {
      console.error("Failed to send RFQ notification email:", err);
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("RFQ API error:", error);
    return NextResponse.json(
      { error: "Failed to submit RFQ" },
      { status: 500 },
    );
  }
}