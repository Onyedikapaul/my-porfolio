"use client";
import { useEffect, useState } from "react";
import { Eye, FileText, Plus, ExternalLink, Pencil, Trash2, Globe, EyeOff } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface Post { _id: string; title: string; slug: string; published: boolean; views: number; readTime: number; publishedAt?: string; tags?: string[]; createdAt: string; }

export default function BlogListPage() {
  const [posts, setPosts]     = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts").then(r => r.json()).then(p => { setPosts(p); setLoading(false); });
  }, []);

  const deletePost = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    setPosts(ps => ps.filter(p => p._id !== id));
  };

  const togglePublish = async (post: Post) => {
    const res = await fetch(`/api/posts/${post._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !post.published }),
    });
    const updated = await res.json();
    setPosts(ps => ps.map(p => p._id === post._id ? updated : p));
  };

  return (
    <div style={{ padding: "2rem 1.5rem", maxWidth: 900, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.5rem", marginBottom: 4 }}>Posts</h1>
          <p style={{ color: "hsl(var(--muted-foreground))", fontSize: "0.875rem" }}>{posts.length} total · {posts.filter(p => p.published).length} published</p>
        </div>
        <Link href="/admin/blog/new" style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "hsl(var(--brand))", color: "hsl(var(--brand-foreground))",
          padding: "0.5rem 1rem", borderRadius: 9999,
          fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.8rem",
          textDecoration: "none",
        }}>
          <Plus size={14} /> New post
        </Link>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "4rem 0", color: "hsl(var(--muted-foreground))" }}>Loading...</div>
      ) : posts.length === 0 ? (
        <div style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 16, padding: "4rem", textAlign: "center", color: "hsl(var(--muted-foreground))" }}>
          <FileText size={36} style={{ margin: "0 auto 1rem", opacity: 0.2 }} />
          <p style={{ marginBottom: "1.25rem" }}>No posts yet.</p>
          <Link href="/admin/blog/new" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "hsl(var(--brand))", color: "hsl(var(--brand-foreground))", padding: "0.5rem 1.25rem", borderRadius: 9999, fontWeight: 700, fontSize: "0.875rem", textDecoration: "none" }}>
            <Plus size={14} /> Write your first post
          </Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {posts.map(post => (
            <div key={post._id} style={{
              background: "hsl(var(--card))", border: "1px solid hsl(var(--border))",
              borderRadius: 14, padding: "1rem 1.25rem",
              display: "flex", alignItems: "center", gap: "1rem",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "hsl(var(--brand)/0.3)")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "hsl(var(--border))")}
            >
              {/* Status dot */}
              <div style={{ width: 8, height: 8, borderRadius: "50%", flexShrink: 0, background: post.published ? "hsl(var(--brand))" : "hsl(var(--muted-foreground))", boxShadow: post.published ? "0 0 6px hsl(var(--brand)/0.5)" : "none" }} />

              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontWeight: 600, fontSize: "0.9rem", marginBottom: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{post.title}</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", fontSize: "0.75rem", color: "hsl(var(--muted-foreground))" }}>
                  <span style={{ color: post.published ? "hsl(var(--brand))" : "hsl(var(--muted-foreground))", fontWeight: 600 }}>{post.published ? "Published" : "Draft"}</span>
                  {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
                  <span style={{ display: "flex", alignItems: "center", gap: 3 }}><Eye size={11} />{post.views} views</span>
                  <span>{post.readTime} min read</span>
                  {post.tags?.map(t => (
                    <span key={t} style={{ background: "hsl(var(--brand-muted))", color: "hsl(var(--brand))", padding: "1px 6px", borderRadius: 9999, fontSize: "0.68rem", fontWeight: 600 }}>{t}</span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 2, flexShrink: 0 }}>
                {[
                  { icon: <ExternalLink size={14} />, title: "View", as: "link", href: `/blog/${post.slug}`, target: "_blank" },
                  { icon: <Pencil size={14} />, title: "Edit", as: "link", href: `/admin/blog/${post._id}/edit` },
                ].map(a => (
                  <Link key={a.title} href={a.href!} target={a.target} title={a.title} style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: 32, height: 32, borderRadius: 8,
                    color: "hsl(var(--muted-foreground))", transition: "all 0.15s",
                    background: "transparent",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "hsl(var(--secondary))"; e.currentTarget.style.color = "hsl(var(--foreground))"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "hsl(var(--muted-foreground))"; }}
                  >{a.icon}</Link>
                ))}
                <button onClick={() => togglePublish(post)} title={post.published ? "Unpublish" : "Publish"} style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: 32, height: 32, borderRadius: 8, border: "none",
                  color: "hsl(var(--muted-foreground))", background: "transparent", cursor: "pointer", transition: "all 0.15s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "hsl(var(--secondary))"; e.currentTarget.style.color = "hsl(var(--foreground))"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "hsl(var(--muted-foreground))"; }}
                >{post.published ? <EyeOff size={14} /> : <Globe size={14} />}</button>
                <button onClick={() => deletePost(post._id)} title="Delete" style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: 32, height: 32, borderRadius: 8, border: "none",
                  color: "hsl(var(--muted-foreground))", background: "transparent", cursor: "pointer", transition: "all 0.15s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; e.currentTarget.style.color = "#ef4444"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "hsl(var(--muted-foreground))"; }}
                ><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
