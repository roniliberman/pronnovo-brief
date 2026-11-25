import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE = "pb_admin";

function expected() {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return null;
  return createHmac("sha256", pw).update("pronnovo-brief-admin-v1").digest("hex");
}

export function passwordOk(input) {
  const pw = process.env.ADMIN_PASSWORD || "";
  const a = Buffer.from(String(input || "")), b = Buffer.from(pw);
  return pw.length > 0 && a.length === b.length && timingSafeEqual(a, b);
}

export async function isAdmin() {
  const exp = expected();
  if (!exp) return false;
  const v = (await cookies()).get(COOKIE)?.value || "";
  return v.length === exp.length && timingSafeEqual(Buffer.from(v), Buffer.from(exp));
}

export async function setAdminCookie() {
  (await cookies()).set(COOKIE, expected(), {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30
  });
}

export async function clearAdminCookie() {
  (await cookies()).delete(COOKIE);
}
