import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

const NDA_DATABASE_ID = process.env.NOTION_NDA_DATABASE_ID;

// POST /api/nda
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      company,
      hasSignedNda,
    }: {
      name: string;
      email: string;
      company: string;
      hasSignedNda?: boolean;
    } = body;

    // Safely derive an IP address without using req.ip (which NextRequest doesn't have)
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      null;

    if (!name || !email || !company) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // If Notion is configured, record the NDA confirmation
    if (NDA_DATABASE_ID) {
      await notion.pages.create({
        parent: { database_id: NDA_DATABASE_ID },
        properties: {
          Name: {
            title: [{ text: { content: name } }],
          },
          Email: {
            email,
          },
          Company: {
            rich_text: [{ text: { content: company } }],
          },
          Status: {
            select: { name: hasSignedNda ? "Signed" : "Confirmed" },
          },
          Source: {
            rich_text: [{ text: { content: "OSM Portal" } }],
          },
          ...(ip
            ? {
                IP: {
                  rich_text: [{ text: { content: ip } }],
                },
              }
            : {}),
        },
      });
    } else {
      console.warn(
        "[NDA API] NOTION_NDA_DATABASE_ID not set – skipping Notion logging."
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[NDA API] Error recording NDA", error);
    return NextResponse.json(
      { error: "Failed to record NDA" },
      { status: 500 }
    );
  }
}