import { MetadataRoute } from "next";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connectDB();
  const posts = await Post.find({ published: true }).select("slug updatedAt").lean() as { slug: string; updatedAt: Date }[];

  const postUrls = posts.map(post => ({
    url: `https://paulcodes.pro/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    { url: "https://paulcodes.pro", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://paulcodes.pro/blog", lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    ...postUrls,
  ];
}