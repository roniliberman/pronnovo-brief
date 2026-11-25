import { NextResponse } from "next/server";
import { passwordOk, setAdminCookie } from "@/lib/auth";

export async function POST(req) {
  const form = await req.formData();
  const url = new URL("/admin", req.url);
  if (!passwordOk(form.get("password"))) {
    url.searchParams.set("e", "1");
    await new Promise((r) => setTimeout(r, 600));
    return NextResponse.redirect(url, 303);
  }
  await setAdminCookie();
  return NextResponse.redirect(url, 303);
}
