import { NextResponse } from "next/server";
import { del } from "@vercel/blob";
import { isAdmin } from "@/lib/auth";
import { db, getClient, newToken } from "@/lib/db";

export async function POST(req) {
  if (!(await isAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const b = await req.json().catch(() => ({}));
  const client = String(b.client || "").trim().slice(0, 120);
  if (!client) return NextResponse.json({ error: "חסר שם לקוח" }, { status: 400 });
  const project = String(b.project || "").trim().slice(0, 120);
  const lang = b.lang === "en" ? "en" : "he";
  const token = newToken();
  const sql = await db();
  await sql`INSERT INTO clients (token, client, project, lang) VALUES (${token}, ${client}, ${project}, ${lang})`;
  const origin = new URL(req.url).origin;
  return NextResponse.json({ token, link: `${origin}/b/${token}` });
}

export async function DELETE(req) {
  if (!(await isAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { token } = await req.json().catch(() => ({}));
  const c = await getClient(token);
  if (!c) return NextResponse.json({ error: "not found" }, { status: 404 });
  const urls = (c.data?.files || []).map((f) => f.url).filter(Boolean);
  if (urls.length) await del(urls).catch(() => {});
  const sql = await db();
  await sql`DELETE FROM clients WHERE token = ${token}`;
  return NextResponse.json({ ok: true });
}
