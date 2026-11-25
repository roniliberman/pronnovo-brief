import { NextResponse } from "next/server";
import { del } from "@vercel/blob";
import { getClient } from "@/lib/db";

export async function DELETE(req, { params }) {
  const { token } = await params;
  const c = await getClient(token);
  if (!c) return NextResponse.json({ error: "not found" }, { status: 404 });
  const { url } = await req.json().catch(() => ({}));
  let path = "";
  try { path = new URL(url).pathname; } catch {}
  if (!path.startsWith(`/clients/${token}/`)) return NextResponse.json({ error: "not allowed" }, { status: 403 });
  await del(url);
  return NextResponse.json({ ok: true });
}
