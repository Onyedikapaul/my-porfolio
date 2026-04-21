import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { getSession } from "@/lib/auth";
import PageView from "@/models/PageView";
import Post from "@/models/Post";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();

  const now = new Date();
  const d7 = new Date(now.getTime() - 7*24*60*60*1000);
  const d30 = new Date(now.getTime() - 30*24*60*60*1000);

  const [total, last7, last30, topPosts, recentViews] = await Promise.all([
    PageView.countDocuments(),
    PageView.countDocuments({ createdAt: { $gte: d7 } }),
    PageView.countDocuments({ createdAt: { $gte: d30 } }),
    Post.find({ published: true }).sort({ views: -1 }).limit(5).select("title slug views readTime publishedAt").lean(),
    PageView.aggregate([
      { $match: { createdAt: { $gte: d7 } } },
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]),
  ]);

  return NextResponse.json({ total, last7, last30, topPosts, recentViews });
}
