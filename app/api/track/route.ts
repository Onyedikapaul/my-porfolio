import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import PageView from "@/models/PageView";
import Post from "@/models/Post";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { path, postId } = await req.json();
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    const userAgent = req.headers.get("user-agent") || "";
    await PageView.create({ path, postId, ip, userAgent });
    if (postId) await Post.findByIdAndUpdate(postId, { $inc: { views: 1 } });
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ ok: false }); }
}
