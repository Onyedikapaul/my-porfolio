import { Metadata } from "next";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import { formatDate } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrackView from "@/components/TrackView";
import { Clock, Eye, ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import NewsletterSignup from "@/components/NewsLetterSignup";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await connectDB();
  const { slug } = await params;
  const post = (await Post.findOne({ slug, published: true }).lean()) as {
    title?: string;
    excerpt?: string;
    coverImage?: string;
    tags?: string[];
  } | null;

  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} — Paulcodes`,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: `${post.title} — Paulcodes`,
      description: post.excerpt,
      url: `https://paulcodes.pro/blog/${slug}`,
      type: "article",
      images: [
        {
          url: post.coverImage || "https://paulcodes.pro/og-image.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} — Paulcodes`,
      description: post.excerpt,
      images: [post.coverImage || "https://paulcodes.pro/og-image.png"],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  await connectDB();
  const { slug } = await params;
  const post = (await Post.findOne({ slug, published: true }).lean()) as {
    _id: string;
    title: string;
    excerpt: string;
    content: string;
    coverImage?: string;
    tags?: string[];
    readTime?: number;
    views?: number;
    publishedAt?: string;
  } | null;
  if (!post) notFound();

  return (
    <>
      <Navbar />
      <TrackView postId={post._id.toString()} path={`/blog/${slug}`} />
      <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
          >
            <ArrowLeft size={14} /> Back to blog
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {post.tags?.map((t) => (
              <span key={t} className="badge-brand">
                {t}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight leading-tight mb-5">
            {post.title}
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground pb-8 border-b border-border mb-10">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {post.publishedAt ? formatDate(post.publishedAt) : ""}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {post.readTime || 1} min read
            </span>
            {/* <span className="flex items-center gap-1.5">
              <Eye size={14} />
              {post.views || 0} views
            </span> */}
          </div>

          {/* Content */}
          <article
            className="prose-paulcodes"
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{
              ["--prose-img-max-height" as string]: "400px",
            }}
          />
          {/* Footer CTA */}
          <div className="mt-16 pt-10 border-t border-border">
            <div className="card bg-brand-muted border-brand/20 p-6 sm:p-8 text-center">
              <h3 className="font-display font-bold text-xl mb-2">
                Want to work together?
              </h3>
              <p className="text-muted-foreground mb-5 text-sm">
                I'm available for freelance projects and full-time remote roles.
              </p>
              <a href="/#contact" className="btn-primary">
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </main>
      <NewsletterSignup />
      <Footer />
    </>
  );
}
