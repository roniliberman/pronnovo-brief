import { NextResponse } from "next/server";
import { handleUpload } from "@vercel/blob/client";
import { getClient } from "@/lib/db";

const TYPES = [
  "image/*", "application/pdf", "application/zip", "application/x-zip-compressed", "application/postscript",
  "application/illustrator", "application/octet-stream", "font/*", "application/font-*", "application/x-font-*",
  "application/vnd.*", "text/plain", "video/mp4", "video/quicktime"
];

export async function POST(req, { params }) {
  const { token } = await params;
  const body = await req.json();
  try {
    const json = await handleUpload({
      body, request: req,
      onBeforeGenerateToken: async (pathname) => {
        const c = await getClient(token);
        if (!c) throw new Error("invalid link");
        if (!pathname.startsWith(`clients/${token}/`)) throw new Error("bad path");
        return { allowedContentTypes: TYPES, maximumSizeInBytes: 50 * 1024 * 1024, addRandomSuffix: true };
      }
    });
    return NextResponse.json(json);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
