import { isAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { answerRows, DETAILS, STATUS } from "@/lib/labels";

const q = (v) => '"' + String(v ?? "").replace(/"/g, '""') + '"';

export async function GET() {
  if (!(await isAdmin())) return new Response("unauthorized", { status: 401 });
  const sql = await db();
  const rows = await sql`SELECT * FROM clients ORDER BY created_at DESC`;
  const head = ["לקוח", "פרויקט", "סטטוס", "עודכן", ...DETAILS({}).map((x) => x[0]), ...answerRows({}).map((x) => x[0]), "קבצים"];
  const lines = [head.map(q).join(",")];
  for (const r of rows) {
    const d = r.data || {};
    lines.push([
      r.client, r.project, STATUS[r.status] || r.status, r.updated_at ? new Date(r.updated_at).toISOString().slice(0, 16).replace("T", " ") : "",
      ...DETAILS(d).map((x) => x[1]), ...answerRows(d).map((x) => x[1]),
      (d.files || []).map((f) => f.url).join("\n")
    ].map(q).join(","));
  }
  return new Response("﻿" + lines.join("\r\n"), {
    headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": 'attachment; filename="pronnovo-briefs.csv"' }
  });
}
