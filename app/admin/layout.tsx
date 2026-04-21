"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, FileText, Image, Plus, LogOut,
  ExternalLink, Menu, X, ChevronRight,
} from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", icon: <LayoutDashboard size={16} />, label: "Dashboard" },
  { href: "/admin/blog",      icon: <FileText size={16} />,        label: "Posts" },
  { href: "/admin/blog/new",  icon: <Plus size={16} />,            label: "New Post" },
  { href: "/admin/images",    icon: <Image size={16} />,           label: "Images" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (pathname === "/admin/login") return <>{children}</>;

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const Sidebar = ({ mobile = false }) => (
    <div style={{
      width: mobile ? "100%" : 220,
      height: mobile ? "auto" : "100vh",
      background: "hsl(var(--card))",
      borderRight: mobile ? "none" : "1px solid hsl(var(--border))",
      borderBottom: mobile ? "1px solid hsl(var(--border))" : "none",
      display: "flex",
      flexDirection: "column",
      position: mobile ? "relative" : "fixed",
      top: 0, left: 0,
      zIndex: 50,
      padding: "1.25rem 0.75rem",
    }}>
      {/* Logo */}
      <div style={{ padding: "0 0.5rem", marginBottom: "2rem" }}>
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.1rem" }}>
          Paul<span style={{ color: "hsl(var(--brand))" }}>codes</span>
          <span style={{ color: "hsl(var(--muted-foreground))", fontWeight: 400, fontSize: "0.75rem", marginLeft: 6 }}>Admin</span>
        </h1>
      </div>

      {/* Nav */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
        {navItems.map(item => {
          const active = pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "0.55rem 0.75rem",
              borderRadius: 8,
              fontSize: "0.85rem",
              fontWeight: active ? 600 : 400,
              color: active ? "hsl(var(--brand))" : "hsl(var(--muted-foreground))",
              background: active ? "hsl(var(--brand-muted))" : "transparent",
              border: active ? "1px solid hsl(var(--brand)/0.2)" : "1px solid transparent",
              textDecoration: "none",
              transition: "all 0.15s",
            }}
            onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "hsl(var(--secondary))"; e.currentTarget.style.color = "hsl(var(--foreground))"; } }}
            onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "hsl(var(--muted-foreground))"; } }}
            >
              {item.icon}
              {item.label}
              {active && <ChevronRight size={12} style={{ marginLeft: "auto" }} />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div style={{ display: "flex", flexDirection: "column", gap: 2, paddingTop: "1rem", borderTop: "1px solid hsl(var(--border))" }}>
        <Link href="/" target="_blank" style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "0.55rem 0.75rem", borderRadius: 8,
          fontSize: "0.85rem", color: "hsl(var(--muted-foreground))",
          textDecoration: "none", transition: "all 0.15s",
        }}
        onMouseEnter={e => { e.currentTarget.style.background = "hsl(var(--secondary))"; e.currentTarget.style.color = "hsl(var(--foreground))"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "hsl(var(--muted-foreground))"; }}
        >
          <ExternalLink size={16} /> View site
        </Link>
        <button onClick={logout} style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "0.55rem 0.75rem", borderRadius: 8,
          fontSize: "0.85rem", color: "hsl(var(--muted-foreground))",
          background: "transparent", border: "none", cursor: "pointer",
          transition: "all 0.15s", width: "100%", textAlign: "left",
        }}
        onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; e.currentTarget.style.color = "#ef4444"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "hsl(var(--muted-foreground))"; }}
        >
          <LogOut size={16} /> Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "hsl(var(--background))" }}>
      {/* Desktop sidebar */}
      <div style={{ display: "none" }} className="admin-desktop-sidebar">
        <Sidebar />
      </div>

      {/* Mobile top bar */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 60,
        height: 52, background: "hsl(var(--card))",
        borderBottom: "1px solid hsl(var(--border))",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 1rem",
      }} className="admin-mobile-bar">
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1rem" }}>
          Paul<span style={{ color: "hsl(var(--brand))" }}>codes</span>
        </h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "none", border: "none", cursor: "pointer", color: "hsl(var(--foreground))", padding: 6 }}>
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {sidebarOpen && (
        <div style={{ position: "fixed", top: 52, left: 0, right: 0, zIndex: 55 }} className="admin-mobile-bar">
          <Sidebar mobile />
        </div>
      )}

      {/* Main content */}
      <main style={{ flex: 1, marginLeft: 220, minHeight: "100vh" }} className="admin-main">
        {children}
      </main>

      <style>{`
        @media (max-width: 768px) {
          .admin-desktop-sidebar { display: none !important; }
          .admin-mobile-bar { display: flex !important; }
          .admin-main { margin-left: 0 !important; padding-top: 52px; }
        }
        @media (min-width: 769px) {
          .admin-desktop-sidebar { display: block !important; }
          .admin-mobile-bar { display: none !important; }
        }
      `}</style>
    </div>
  );
}
