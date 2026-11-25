import { neon } from "@neondatabase/serverless";

let _sql, _ready;

function url() {
  const u = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!u) throw new Error("DATABASE_URL is not set. Connect a Neon database to this Vercel project.");
  return u;
}

/** Tagged-template SQL client; creates the table on first use. */
export async function db() {
  if (!_sql) _sql = neon(url());
  if (!_ready) {
    _ready = _sql`
      CREATE TABLE IF NOT EXISTS clients (
        token        text PRIMARY KEY,
        client       text NOT NULL,
        project      text NOT NULL DEFAULT '',
        lang         text NOT NULL DEFAULT 'he',
        status       text NOT NULL DEFAULT 'new',
        data         jsonb NOT NULL DEFAULT '{}'::jsonb,
        created_at   timestamptz NOT NULL DEFAULT now(),
        updated_at   timestamptz,
        submitted_at timestamptz
      )`.catch((e) => { _ready = null; throw e; });
  }
  await _ready;
  return _sql;
}

export const TOKEN_RE = /^[a-z0-9]{16,40}$/;

export async function getClient(token) {
  if (!TOKEN_RE.test(token || "")) return null;
  const sql = await db();
  const rows = await sql`SELECT * FROM clients WHERE token = ${token}`;
  return rows[0] || null;
}

export function newToken() {
  const a = new Uint8Array(12);
  crypto.getRandomValues(a);
  return Array.from(a, (b) => b.toString(16).padStart(2, "0")).join("");
}

/** Number of the 9 questions that have an answer (same rules as the form). */
export function answeredCount(d = {}) {
  const f = (s) => !!String(s || "").trim();
  const url = (a) => (a || []).some((r) => f(r.url));
  const files = d.files || [];
  return [
    f(d.q1), f(d.q2), f(d.q3) || (d.devices || []).length > 0 || !!d.freq, f(d.q4),
    !!d.brandNone || f(d.brandLink) || files.some((x) => x.kind === "logo" || x.kind === "brand"),
    (d.feel || []).some(f), url(d.brandRefs) || files.some((x) => x.kind === "refs"), url(d.appRefs), f(d.q9)
  ].filter(Boolean).length;
}
