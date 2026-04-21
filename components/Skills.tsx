"use client";
import { useEffect, useRef, useState } from "react";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiHtml5, SiCss,
  SiNodedotjs, SiExpress, SiJsonwebtokens, SiPython, SiLaravel, SiPhp,
  SiMongodb, SiPostgresql, SiMysql,
  SiGit, SiGithub, SiPostman, SiFigma,
  SiWordpress, SiShopify,
} from "react-icons/si";
import { FaServer, FaDatabase, FaTools, FaCode, FaCreditCard, FaBox, FaPlug } from "react-icons/fa";

const groups = [
  {
    label: "Frontend",
    color: "#3b82f6", bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.2)",
    groupIcon: <FaCode size={16} />,
    skills: [
      { name: "React.js",     icon: <SiReact />,       color: "#61dafb" },
      { name: "Next.js",      icon: <SiNextdotjs />,   color: "#ffffff" },
      { name: "TypeScript",   icon: <SiTypescript />,  color: "#3178c6" },
      { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#38bdf8" },
      { name: "HTML5",        icon: <SiHtml5 />,       color: "#e34f26" },
      { name: "CSS3",         icon: <SiCss />,        color: "#1572b6" },
    ],
  },
  {
    label: "Backend",
    color: "#10b981", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.2)",
    groupIcon: <FaServer size={16} />,
    skills: [
      { name: "Node.js",  icon: <SiNodedotjs />,    color: "#68a063" },
      { name: "Express",  icon: <SiExpress />,       color: "#ffffff" },
      { name: "Python",   icon: <SiPython />,        color: "#3776ab" },
      { name: "Laravel",  icon: <SiLaravel />,       color: "#ff2d20" },
      { name: "PHP",      icon: <SiPhp />,           color: "#8892be" },
      { name: "JWT Auth", icon: <SiJsonwebtokens />, color: "#d63aff" },
    ],
  },
  {
    label: "Databases",
    color: "#c8f060", bg: "rgba(200,240,96,0.08)", border: "rgba(200,240,96,0.2)",
    groupIcon: <FaDatabase size={16} />,
    skills: [
      { name: "MongoDB",    icon: <SiMongodb />,    color: "#47a248" },
      { name: "PostgreSQL", icon: <SiPostgresql />, color: "#336791" },
      { name: "MySQL",      icon: <SiMysql />,      color: "#4479a1" },
    ],
  },
  {
    label: "Tools & Platforms",
    color: "#f59e0b", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)",
    groupIcon: <FaTools size={16} />,
    skills: [
      { name: "WordPress",  icon: <SiWordpress />,  color: "#21759b" },
      { name: "Shopify",    icon: <SiShopify />,    color: "#95bf47" },
      { name: "Git",        icon: <SiGit />,        color: "#f05032" },
      { name: "GitHub",     icon: <SiGithub />,     color: "#ffffff" },
      { name: "Postman",    icon: <SiPostman />,    color: "#ff6c37" },
      { name: "Figma",      icon: <SiFigma />,      color: "#f24e1e" },
    ],
  },
];

const services = [
  { icon: <FaCode size={22} />,       color: "#3b82f6", bg: "rgba(59,130,246,0.1)",  title: "Full-Stack Web Apps",   desc: "End-to-end — database to deployed UI. I handle everything so you don't have to." },
  { icon: <FaCreditCard size={22} />, color: "#10b981", bg: "rgba(16,185,129,0.1)",  title: "Fintech & Banking UIs", desc: "Dashboards, transaction flows, KYC — built them before, can build yours." },
  { icon: <FaBox size={22} />,        color: "#c8f060", bg: "rgba(200,240,96,0.1)",  title: "SaaS Products",         desc: "Got a product idea? I'll build your MVP fast, production-ready from day one." },
  { icon: <FaPlug size={22} />,       color: "#f59e0b", bg: "rgba(245,158,11,0.1)",  title: "API Development",       desc: "Clean, fast, documented REST APIs. Integrations, webhooks, third-party services." },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function Skills() {
  const header  = useInView(0.1);
  const grid    = useInView(0.05);
  const svcHead = useInView(0.1);
  const svcGrid = useInView(0.05);

  return (
    <section id="skills" style={{ padding: "6rem 1.5rem", background: "hsl(var(--secondary)/0.3)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div ref={header.ref} style={{
          marginBottom: "3.5rem",
          opacity: header.inView ? 1 : 0,
          transform: header.inView ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}>
          <span className="section-tag">Skills & Services</span>
          <h2 className="section-title" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
            What I work with.<br />
            <span style={{ color: "hsl(var(--muted-foreground))" }}>What I do for you.</span>
          </h2>
        </div>

        {/* Skill cards */}
        <div ref={grid.ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "1rem", marginBottom: "4rem" }}>
          {groups.map((g, gi) => (
            <div key={g.label} style={{
              background: "hsl(var(--card))",
              border: `1px solid ${g.border}`,
              borderRadius: 16,
              padding: "1.5rem",
              position: "relative",
              overflow: "hidden",
              opacity: grid.inView ? 1 : 0,
              transform: grid.inView ? "translateY(0) scale(1)" : "translateY(36px) scale(0.97)",
              transition: `opacity 0.6s ${gi * 120}ms ease, transform 0.6s ${gi * 120}ms ease`,
            }}>
              <div style={{ position: "absolute", top: -24, right: -24, width: 90, height: 90, borderRadius: "50%", background: g.bg, filter: "blur(24px)", pointerEvents: "none" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1.25rem" }}>
                <div style={{ color: g.color, display: "flex" }}>{g.groupIcon}</div>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, color: g.color, textTransform: "uppercase", letterSpacing: "0.12em" }}>{g.label}</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {g.skills.map((s, si) => (
                  <div key={s.name} style={{
                    display: "flex", alignItems: "center", gap: 6,
                    background: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8, padding: "0.35rem 0.65rem",
                    fontSize: "0.78rem", fontWeight: 500,
                    color: "hsl(var(--foreground))",
                    opacity: grid.inView ? 1 : 0,
                    transform: grid.inView ? "translateY(0)" : "translateY(10px)",
                    transition: `opacity 0.4s ${gi * 120 + si * 50 + 200}ms ease, transform 0.4s ${gi * 120 + si * 50 + 200}ms ease, border-color 0.2s, box-shadow 0.2s`,
                    cursor: "default",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = s.color + "80";
                    e.currentTarget.style.boxShadow = `0 0 12px ${s.color}35`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "hsl(var(--border))";
                    e.currentTarget.style.boxShadow = "none";
                  }}>
                    <span style={{ color: s.color, display: "flex", fontSize: 14 }}>{s.icon}</span>
                    {s.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Services heading */}
        <div ref={svcHead.ref} style={{
          marginBottom: "1.5rem",
          opacity: svcHead.inView ? 1 : 0,
          transform: svcHead.inView ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}>
          <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1.4rem", letterSpacing: "-0.02em" }}>What I can build for you</h3>
        </div>

        {/* Service cards */}
        <div ref={svcGrid.ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "1rem" }}>
          {services.map((s, i) => (
            <div key={s.title} style={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 16, padding: "1.5rem",
              opacity: svcGrid.inView ? 1 : 0,
              transform: svcGrid.inView ? "translateY(0)" : "translateY(28px)",
              transition: `opacity 0.6s ${i * 100}ms ease, transform 0.6s ${i * 100}ms ease, border-color 0.2s, box-shadow 0.2s`,
              cursor: "default",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = s.color + "50";
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = `0 12px 32px ${s.color}18`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "hsl(var(--border))";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: s.bg, border: `1px solid ${s.color}25`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem", color: s.color }}>
                {s.icon}
              </div>
              <h4 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: "0.5rem" }}>{s.title}</h4>
              <p style={{ fontSize: "0.875rem", color: "hsl(var(--muted-foreground))", lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}