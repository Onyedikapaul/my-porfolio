"use client";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const roles = [
  "Full-Stack Developer",
  "React Engineer",
  "Node.js Expert",
  "Product Builder",
];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = roles[roleIdx];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < target.length)
      t = setTimeout(
        () => setDisplayed(target.slice(0, displayed.length + 1)),
        60,
      );
    else if (!deleting && displayed.length === target.length)
      t = setTimeout(() => setDeleting(true), 2400);
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    else {
      setDeleting(false);
      setRoleIdx((roleIdx + 1) % roles.length);
    }
    return () => clearTimeout(t);
  }, [displayed, deleting, roleIdx]);

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "5rem 1.5rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* BG glow */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, hsl(var(--brand)/0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          width: "100%",
          position: "relative",
        }}
      >
        {/* Available badge */}
        <div
          className="animate-fadeUp"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "hsl(var(--brand-muted))",
            border: "1px solid hsl(var(--brand)/0.2)",
            borderRadius: "9999px",
            padding: "0.25rem 0.85rem",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "hsl(var(--brand))",
            marginBottom: "2rem",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "hsl(var(--brand))",
              display: "inline-block",
              boxShadow: "0 0 8px hsl(var(--brand))",
            }}
          />
          Available for new projects
        </div>

        <h1
          className="animate-fadeUp delay-100 opacity-0-init section-title"
          style={{
            fontSize: "clamp(2.8rem,7vw,5.5rem)",
            lineHeight: 1.05,
            marginBottom: "1.5rem",
          }}
        >
          I build things
          <br />
          <span style={{ color: "hsl(var(--muted-foreground))" }}>
            for the web.
          </span>
        </h1>

        <div
          className="animate-fadeUp delay-200 opacity-0-init"
          style={{
            fontFamily: "'Syne',sans-serif",
            fontWeight: 700,
            color: "hsl(var(--brand))",
            marginBottom: "1.5rem",
            height: "2rem",
            display: "flex",
            alignItems: "center",
            fontSize: "clamp(1rem,2.5vw,1.35rem)",
          }}
        >
          {displayed}
          <span
            className="animate-blink"
            style={{
              display: "inline-block",
              width: "2px",
              height: "1.2em",
              background: "hsl(var(--brand))",
              marginLeft: "2px",
              verticalAlign: "middle",
            }}
          />
        </div>

        <p
          className="animate-fadeUp delay-300 opacity-0-init"
          style={{
            color: "hsl(var(--muted-foreground))",
            fontSize: "1.05rem",
            maxWidth: 520,
            lineHeight: 1.8,
            marginBottom: "2.5rem",
          }}
        >
          Self-taught full-stack developer building fast, production-ready web
          applications—from fintech platforms to scalable e-commerce solutions
          and beyond.
        </p>

        <div
          className="animate-fadeUp delay-400 opacity-0-init"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            marginBottom: "3.5rem",
          }}
        >
          <a href="#work" className="btn-primary">
            See my work <ArrowRight size={14} />
          </a>
          <a href="#contact" className="btn-outline">
            Get in touch
          </a>
        </div>

        {/* Stats */}
        <div
          className="animate-fadeUp delay-400 opacity-0-init"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2.5rem",
            marginBottom: "3rem",
          }}
        >
          {[
            ["20+", "Projects shipped"],
            ["6+", "Years building"],
            ["100%", "Remote ready"],
          ].map(([v, l]) => (
            <div key={l}>
              <div
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontWeight: 800,
                  fontSize: "2rem",
                  color: "hsl(var(--foreground))",
                  lineHeight: 1,
                }}
              >
                {v}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "hsl(var(--muted-foreground))",
                  marginTop: 4,
                }}
              >
                {l}
              </div>
            </div>
          ))}
        </div>

        {/* Socials */}
        {/* <div className="animate-fadeUp delay-500 opacity-0-init" style={{ display:"flex", gap:"0.5rem" }}>
          {[
            { icon:<Code2 size={15}/>, href:"https://github.com", label:"GitHub" },
            { icon:<Briefcase size={15}/>, href:"https://linkedin.com", label:"LinkedIn" },
            { icon:<MessageSquare size={15}/>, href:"https://twitter.com", label:"Twitter" },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="btn-ghost"
              style={{ padding:"0.5rem 0.75rem", borderRadius:"0.75rem", border:"1px solid hsl(var(--border))" }} aria-label={s.label}>
              {s.icon}
            </a>
          ))}
        </div> */}
      </div>
    </section>
  );
}
