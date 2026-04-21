import { Metadata } from "next";
import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import { formatDate } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Clock, ArrowRight } from "lucide-react";
import NewsletterSignup from "@/components/NewsLetterSignup";

export const metadata: Metadata = {
  title: "Blog — Paulcodes",
  description: "Real insights from real projects. Tips, tutorials, and lessons from a self-taught full-stack developer building for the web.",
  keywords: ["Paulcodes blog", "web development blog", "full-stack developer blog", "React tutorials", "Node.js tutorials", "freelancing tips", "developer blog Nigeria"],
  openGraph: {
    title: "Blog — Paulcodes",
    description: "Real insights from real projects. Tips, tutorials, and lessons from a self-taught full-stack developer.",
    url: "https://paulcodes.pro/blog",
    images: [
      {
        url: "https://paulcodes.pro/og-image.png",
        width: 1200,
        height: 630,
        alt: "Paulcodes Blog — Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Paulcodes",
    description: "Real insights from real projects. Tips, tutorials, and lessons from a self-taught full-stack developer.",
    images: ["https://paulcodes.pro/og-image.png"],
  },
};

async function getPosts(tag?: string) {
  await connectDB();
  const filter: Record<string, unknown> = { published: true };
  if (tag) filter.tags = tag;
  return Post.find(filter).sort({ publishedAt: -1 }).select("-content").lean();
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const posts = await getPosts(tag);
  const allTags = [
    ...new Set(posts.flatMap((p: { tags?: string[] }) => p.tags || [])),
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <p className="section-tag">Blog</p>
            <h1 className="font-display font-extrabold text-5xl sm:text-6xl tracking-tight mb-4">
              Thoughts &<br />
              <span className="text-muted-foreground">tutorials.</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              Writing about full-stack dev, freelancing, building products, and
              everything in between.
            </p>
          </div>

          {/* Tag filter */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              <Link
                href="/blog"
                className={`badge transition-colors ${!tag ? "badge-brand" : "badge-muted hover:bg-brand-muted hover:text-brand"}`}
              >
                All
              </Link>
              {allTags.map((t: string) => (
                <Link
                  key={t}
                  href={`/blog?tag=${t}`}
                  className={`badge transition-colors ${tag === t ? "badge-brand" : "badge-muted hover:bg-brand-muted hover:text-brand"}`}
                >
                  {t}
                </Link>
              ))}
            </div>
          )}

          {/* Posts */}
          {posts.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              No posts yet. Check back soon!
            </div>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {posts.map(
                (post: {
                  _id: string;
                  slug: string;
                  title: string;
                  excerpt: string;
                  coverImage?: string;
                  tags?: string[];
                  readTime?: number;
                  views?: number;
                  publishedAt?: string;
                }) => (
                  <Link
                    key={post._id.toString()}
                    href={`/blog/${post.slug}`}
                    className="card-hover group blog-card"
                    style={{
                      display: "flex",
                      alignItems: "stretch",
                      overflow: "hidden",
                      textDecoration: "none",
                    }}
                  >
                    {/* Cover image */}
                    {post.coverImage && (
                      <div
                        className="blog-card-img"
                        style={{
                          width: 200,
                          minWidth: 200,
                          height: 140,
                          flexShrink: 0,
                          overflow: "hidden",
                          borderRadius: "0.75rem 0 0 0.75rem",
                        }}
                      >
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.4s ease",
                            display: "block",
                          }}
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div
                      style={{
                        flex: 1,
                        minWidth: 0,
                        padding: "1.25rem 1.5rem",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 6,
                            marginBottom: 10,
                          }}
                        >
                          {post.tags?.map((t: string) => (
                            <span key={t} className="badge-brand">
                              {t}
                            </span>
                          ))}
                        </div>
                        <h2
                          style={{
                            fontFamily: "'Syne',sans-serif",
                            fontWeight: 700,
                            fontSize: "1.1rem",
                            marginBottom: 6,
                            transition: "color 0.2s",
                          }}
                          className="group-hover:text-brand"
                        >
                          {post.title}
                        </h2>
                        <p
                          style={{
                            color: "hsl(var(--muted-foreground))",
                            fontSize: "0.85rem",
                            lineHeight: 1.6,
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {post.excerpt}
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginTop: 12,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 16,
                            fontSize: "0.72rem",
                            color: "hsl(var(--muted-foreground))",
                          }}
                        >
                          {post.publishedAt && (
                            <span>{formatDate(post.publishedAt)}</span>
                          )}
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                            }}
                          >
                            <Clock size={11} />
                            {post.readTime || 1} min read
                          </span>
                          {/* <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                            }}
                          >
                            <Eye size={11} />
                            {post.views || 0} views
                          </span> */}
                        </div>
                        <ArrowRight
                          size={15}
                          style={{
                            color: "hsl(var(--muted-foreground))",
                            flexShrink: 0,
                            transition: "color 0.2s",
                          }}
                          className="group-hover:text-brand"
                        />
                      </div>
                    </div>
                  </Link>
                ),
              )}
            </div>
          )}
        </div>
      </main>
      <NewsletterSignup />
      <Footer />

      <style>{`
        @media (max-width: 640px) {
          .blog-card { flex-direction: column !important; }
          .blog-card-img { width: 100% !important; min-width: unset !important; height: 180px !important; border-radius: 0.75rem 0.75rem 0 0 !important; }
        }
      `}</style>
    </>
  );
}
