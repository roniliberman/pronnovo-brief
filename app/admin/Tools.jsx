"use client";
import { useState } from "react";

function useToast() {
  const [msg, setMsg] = useState("");
  const show = (m) => { setMsg(m); setTimeout(() => setMsg(""), 2400); };
  return [msg ? <div className="toast-a" role="status">{msg}</div> : null, show];
}
async function copy(text) {
  try { await navigator.clipboard.writeText(text); return true; } catch { return false; }
}
const linkFor = (token) => `${location.origin}/b/${token}`;

export function NewClient() {
  const [busy, setBusy] = useState(false);
  const [made, setMade] = useState(null);
  const [err, setErr] = useState("");
  const [toast, show] = useToast();
  async function submit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true); setErr("");
    try {
      const r = await fetch("/api/admin/clients", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(f)) });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "שגיאה");
      setMade(j.link); e.currentTarget?.reset?.();
      if (await copy(j.link)) show("הקישור הועתק");
      setTimeout(() => location.reload(), 2500);
    } catch (x) { setErr(x.message); } finally { setBusy(false); }
  }
  return (
    <form className="adm-new" onSubmit={submit}>
      <label>שם הלקוח<input name="client" required placeholder="לדוגמה: COMMIT" /></label>
      <label>פרויקט<input name="project" placeholder="לא חובה" /></label>
      <label>שפת השאלון<select name="lang" defaultValue="he"><option value="he">עברית</option><option value="en">English</option></select></label>
      <button className="adm-btn" disabled={busy} type="submit">{busy ? "יוצר…" : "+ לקוח חדש"}</button>
      {made && <div className="adm-made"><b>✓ הקישור מוכן</b><code>{made}</code><button type="button" className="adm-btn sec" onClick={async () => show((await copy(made)) ? "הועתק" : "סמנו והעתיקו ידנית")}>העתקה</button></div>}
      {err && <div className="adm-err">{err}</div>}
      {toast}
    </form>
  );
}

export function RowActions({ token, full }) {
  const [toast, show] = useToast();
  async function remove() {
    if (!confirm("למחוק את הלקוח, התשובות והקבצים שהעלה? אי אפשר לשחזר.")) return;
    const r = await fetch("/api/admin/clients", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token }) });
    if (r.ok) location.href = "/admin"; else show("המחיקה נכשלה");
  }
  return (
    <div className="acts">
      <button type="button" className="adm-btn sec" onClick={async () => show((await copy(linkFor(token))) ? "הקישור הועתק" : linkFor(token))}>העתקת קישור</button>
      {!full && <a className="adm-btn ghost" href={`/admin/${token}`}>תשובות</a>}
      {full && <a className="adm-btn ghost" href={`/b/${token}`} target="_blank" rel="noopener">פתיחת הטופס</a>}
      {full && <button type="button" className="adm-btn danger" onClick={remove}>מחיקה</button>}
      {toast}
    </div>
  );
}
