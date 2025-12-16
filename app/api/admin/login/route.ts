import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    if (!ADMIN_EMAIL) {
      return NextResponse.json({ ok: false, error: "Missing ADMIN_EMAIL env var" }, { status: 500 });
    }
    if (!ADMIN_PASSWORD) {
      return NextResponse.json({ ok: false, error: "Missing ADMIN_PASSWORD env var" }, { status: 500 });
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
    }

    const email = (body.email ?? "").toString().trim();
    const password = (body.password ?? "").toString();

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ ok: false, error: "Invalid email or password" }, { status: 401 });
    }

    const res = NextResponse.json({ ok: true });

    // Simple staff session cookie
    res.cookies.set("osms_staff", "1", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 14, // 14 days
    });

    return res;
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Server error" }, { status: 500 });
  }
}