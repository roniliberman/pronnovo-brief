import Shell from "./Shell";
import { isAdmin } from "@/lib/auth";
import { db, answeredCount } from "@/lib/db";
import { STATUS } from "@/lib/labels";
import { NewClient, RowActions } from "./Tools";

export const dynamic = "force-dynamic";
export const metadata = { title: "Pronnovo · ניהול שאלונים" };

const fmt = (d) => d ? new Intl.DateTimeFormat("he-IL", { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit", timeZone: "Asia/Jerusalem" }).format(new Date(d)) : "—";

export default async function Admin({ searchParams }) {
  const sp = await searchParams;
  if (!(await isAdmin())) {
    return (
      <Shell>
        <div className="adm-wrap">
          <div className="adm-card adm-login">
            <form action="/api/admin/login" method="post">
              <h1>כניסה לניהול</h1>
              <p>שאלוני היכרות ללקוחות של פרונובו</p>
              <input type="password" name="password" placeholder="סיסמה" autoFocus required autoComplete="current-password" />
              {sp?.e && <p style={{ color: "var(--bad)" }}>סיסמה שגויה</p>}
              <button className="adm-btn" type="submit">כניסה</button>
            </form>
          </div>
        </div>
      </Shell>
    );
  }
  const sql = await db();
  const rows = await sql`SELECT token, client, project, lang, status, data, created_at, updated_at FROM clients ORDER BY COALESCE(updated_at, created_at) DESC`;
  const done = rows.filter((r) => r.status === "submitted").length;
  return (
    <Shell authed>
      <div className="adm-wrap">
        <div className="adm-card">
          <div className="adm-h">
            <div>
              <h1>שאלוני לקוח</h1>
              <p>{rows.length} לקוחות · {done} הגישו</p>
            </div>
            <span className="sp" />
            {rows.length > 0 && <a className="adm-btn sec" href="/api/admin/export">ייצוא לאקסל (CSV)</a>}
          </div>
          <NewClient />
          {rows.length === 0 ? (
            <div className="adm-empty">עדיין אין לקוחות. צרו לקוח ראשון למעלה, והקישור יועתק אוטומטית.</div>
          ) : (
            <table className="adm-table">
              <thead><tr><th>לקוח</th><th>סטטוס</th><th>התקדמות</th><th>עודכן</th><th></th></tr></thead>
              <tbody>
                {rows.map((r) => {
                  const n = answeredCount(r.data || {});
                  return (
                    <tr key={r.token}>
                      <td><a href={`/admin/${r.token}`} className="nm" style={{ color: "var(--ink)" }}>{r.client}</a><div className="sub">{r.project || " "}{r.lang === "en" ? " · EN" : ""}</div></td>
                      <td><span className="chip" data-s={r.status}><i />{STATUS[r.status] || r.status}</span></td>
                      <td><div className="meter"><span><i style={{ width: `${Math.round((n / 9) * 100)}%` }} /></span>{n}/9</div></td>
                      <td className="num">{fmt(r.updated_at || r.created_at)}</td>
                      <td className="acts-td"><RowActions token={r.token} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Shell>
  );
}
