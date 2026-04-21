import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { getSession } from "@/lib/auth";
import Post from "@/models/Post";
import { slugify, readTime } from "@/lib/utils";

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const isAdmin = !!(await getSession());
  const filter = isAdmin ? {} : { published: true };
  const tag = searchParams.get("tag");
  if (tag) Object.assign(filter, { tags: tag });
  const posts = await Post.find(filter).sort({ publishedAt: -1, createdAt: -1 }).select("-content").lean();
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const body = await req.json();
  const slug = slugify(body.title);
  const rt = readTime(body.content);
  const post = await Post.create({
    ...body, slug, readTime: rt,
    publishedAt: body.published ? new Date() : undefined,
  });
  return NextResponse.json(post, { status: 201 });
}
