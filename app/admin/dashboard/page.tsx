"use client";
import { useEffect, useState } from "react";
import { Eye, FileText, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface Analytics { total: number; last7: number; last30: number; topPosts: Post[]; recentViews: { _id: string; count: number }[]; }
interface Post { _id: string; title: string; slug: string; published: boolean; views: number; readTime: number; publishedAt?: string; }

export default function Dashboard() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [posts, setPosts]         = useState<Post[]>([]);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/analytics").then(r => r.json()),
      fetch("/api/posts").then(r => r.json()),
    ]).then(([a, p]) => { setAnalytics(a); setPosts(p); setLoading(false); });
  }, []);

  const stats = analytics ? [
    { icon: <Eye size={18} />,       label: "Total views",  value: analytics.total.toLocaleString(),  sub: `+${analytics.last7} this week` },
    { icon: <Users size={18} />,     label: "Last 30 days", value: analytics.last30.toLocaleString(), sub: "page views" },
    { icon: <FileText size={18} />,  label: "Total posts",  value: posts.length.toString(),           sub: `${posts.filter(p => p.published).length} published` },
    { icon: <TrendingUp size={18} />,label: "This week",    value: analytics.last7.toString(),        sub: "views" },
  ] : [];

  return (
    <div style={{ padding: "2rem 1.5rem", maxWidth: 1000, margin: "0 auto" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.5rem", marginBottom: 4 }}>Overview</h1>
        <p style={{ color: "hsl(var(--muted-foreground))", fontSize: "0.875rem" }}>Your site at a glance.</p>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "4rem 0", color: "hsl(var(--muted-foreground))" }}>Loading...</div>
      ) : (
        <>
          {/* Stat cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "1rem", marginBottom: "2rem" }}>
            {stats.map(s => (
              <div key={s.label} style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 14, padding: "1.25rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "hsl(var(--muted-foreground))", marginBottom: "0.75rem", fontSize: "0.8rem" }}>{s.icon}{s.label}</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.75rem", lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: "0.75rem", color: "hsl(var(--muted-foreground))", marginTop: 4 }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Views chart */}
          {analytics && analytics.recentViews.length > 0 && (
            <div style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 14, padding: "1.5rem", marginBottom: "2rem" }}>
              <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: "1.5rem" }}>Views — last 7 days</h3>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 120 }}>
                {analytics.recentViews.map(d => {
                  const max = Math.max(...analytics.recentViews.map(x => x.count), 1);
                  const pct = (d.count / max) * 100;
                  return (
                    <div key={d._id} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, height: "100%" }}>
                      <span style={{ fontSize: "0.7rem", color: "hsl(var(--muted-foreground))" }}>{d.count}</span>
                      <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
                        <div style={{ width: "100%", height: `${Math.max(pct, 4)}%`, background: "hsl(var(--brand))", borderRadius: "4px 4px 0 0", opacity: 0.85 }} />
                      </div>
                      <span style={{ fontSize: "0.68rem", color: "hsl(var(--muted-foreground))" }}>{d._id.slice(5)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Top posts */}
          {analytics && analytics.topPosts.length > 0 && (
            <div style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 14, padding: "1.5rem" }}>
              <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: "1.25rem" }}>Top posts</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                {analytics.topPosts.map((p, i) => (
                  <div key={p._id} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "hsl(var(--border))", width: 28, flexShrink: 0 }}>{i + 1}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Link href={`/blog/${p.slug}`} target="_blank" style={{ fontSize: "0.875rem", fontWeight: 500, color: "hsl(var(--foreground))", textDecoration: "none", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "hsl(var(--brand))")}
                        onMouseLeave={e => (e.currentTarget.style.color = "hsl(var(--foreground))")}
                      >{p.title}</Link>
                      <p style={{ fontSize: "0.75rem", color: "hsl(var(--muted-foreground))" }}>{p.readTime} min · {p.publishedAt ? formatDate(p.publishedAt) : "Draft"}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.875rem", fontWeight: 600, color: "hsl(var(--muted-foreground))", flexShrink: 0 }}>
                      <Eye size={13} />{p.views}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
