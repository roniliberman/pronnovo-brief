import { redirect } from "next/navigation";
import Shell from "../Shell";
import { isAdmin } from "@/lib/auth";
import { getClient, answeredCount } from "@/lib/db";
import { STATUS, answerRows, DETAILS, KIND } from "@/lib/labels";
import { RowActions } from "../Tools";

export const dynamic = "force-dynamic";

const fmt = (d) => d ? new Intl.DateTimeFormat("he-IL", { dateStyle: "short", timeStyle: "short", timeZone: "Asia/Jerusalem" }).format(new Date(d)) : "—";
const size = (b) => !b ? "" : b < 1048576 ? Math.round(b / 1024) + " KB" : (b / 1048576).toFixed(1) + " MB";
const safeUrl = (u) => /^https:\/\//.test(u || "") ? u : null;

function Text({ v }) {
  const s = String(v || "").trim();
  return s ? <p dir="auto">{s}</p> : <p className="none">לא נענה</p>;
}

export default async function Answers({ params }) {
  if (!(await isAdmin())) redirect("/admin");
  const { token } = await params;
  const c = await getClient(token);
  if (!c) redirect("/admin");
  const d = c.data || {};
  const rows = answerRows(d);
  const files = d.files || [];
  return (
    <Shell authed>
      <div className="adm-wrap">
        <p style={{ margin: "0 0 12px" }}><a href="/admin">→ כל הלקוחות</a></p>
        <div className="adm-card">
          <div className="ans-head">
            <p className="eb">שאלון היכרות{c.lang === "en" ? " · English" : ""}</p>
            <h1>{c.client}{c.project ? ` · ${c.project}` : ""}</h1>
            <div className="ans-meta">
              <span className="chip" data-s={c.status}><i />{STATUS[c.status] || c.status}</span>
              <span>{answeredCount(d)}/9 שאלות נענו</span>
              <span>עודכן {fmt(c.updated_at)}</span>
              {c.submitted_at && <span>הוגש {fmt(c.submitted_at)}</span>}
              <span style={{ flex: 1 }} />
              <RowActions token={c.token} full />
            </div>
          </div>
          <div className="ans-grid">
            {DETAILS(d).map(([k, v]) => <div key={k}><small>{k}</small><b dir="auto">{v || "—"}</b></div>)}
          </div>
          <h2 className="ans-sec">המוצר והמשתמשים</h2>
          {rows.slice(0, 4).map(([k, v]) => <div className="ans-q" key={k}><h3>{k}</h3><Text v={v} /></div>)}
          <h2 className="ans-sec">מיתוג וסגנון</h2>
          {rows.slice(4, 8).map(([k, v]) => <div className="ans-q" key={k}><h3>{k}</h3><Text v={v} /></div>)}
          <h2 className="ans-sec">לסיום</h2>
          <div className="ans-q"><h3>{rows[8][0]}</h3><Text v={rows[8][1]} /></div>
          <h2 className="ans-sec">קבצים שהועלו ({files.length})</h2>
          {files.length === 0 ? <p style={{ color: "var(--muted)", margin: "8px 0 0" }}>לא הועלו קבצים</p> : (
            <div className="files">
              {files.filter((f) => safeUrl(f.url)).map((f) => {
                const img = /^image\//.test(f.mime || "");
                return (
                  <a className="file-c" key={f.url} href={f.url} target="_blank" rel="noopener" download>
                    <span className="th" style={img ? { backgroundImage: `url("${encodeURI(f.url)}")` } : undefined}>{img ? "" : (f.name.split(".").pop() || "file").slice(0, 4)}</span>
                    <span style={{ minWidth: 0 }}><b dir="auto">{f.name}</b><small>{KIND[f.kind] || ""} · {size(f.size)}</small></span>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Shell>
  );
}
