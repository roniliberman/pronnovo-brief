import { NextResponse } from "next/server";
import { db, getClient } from "@/lib/db";

export async function PUT(req, { params }) {
  const { token } = await params;
  const c = await getClient(token);
  if (!c) return NextResponse.json({ error: "not found" }, { status: 404 });
  const text = await req.text();
  if (text.length > 600_000) return NextResponse.json({ error: "too large" }, { status: 413 });
  let body;
  try { body = JSON.parse(text); } catch { return NextResponse.json({ error: "bad json" }, { status: 400 }); }
  const data = body && typeof body.data === "object" && body.data ? body.data : {};
  const submit = !!body.submit;
  const sql = await db();
  const rows = await sql`
    UPDATE clients SET
      data = ${JSON.stringify(data)}::jsonb,
      status = CASE WHEN ${submit} OR status = 'submitted' THEN 'submitted' ELSE 'in_progress' END,
      submitted_at = CASE WHEN ${submit} THEN now() ELSE submitted_at END,
      updated_at = now()
    WHERE token = ${token}
    RETURNING status, updated_at`;
  return NextResponse.json({ submitted: rows[0].status === "submitted", updated: rows[0].updated_at });
}
