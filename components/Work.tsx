"use client";
import { useEffect, useRef, useState } from "react";
import {
  SiNodedotjs,
  SiMongodb,
  SiNextdotjs,
  SiPostgresql,
  SiExpress,
} from "react-icons/si";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

const techIcons: Record<string, React.ReactNode> = {
  "Node.js": <SiNodedotjs color="#68a063" />,
  MongoDB: <SiMongodb color="#47a248" />,
  "Next.js": <SiNextdotjs />,
  PostgreSQL: <SiPostgresql color="#336791" />,
  Express: <SiExpress />,
  "WhatsApp API": <FaWhatsapp color="#25d366" />,
};

const projects = [
  {
    title: "EasyBooking",
    tag: "SaaS Booking",
    color: "#c8f060",
    image: "/images/easy-booking.png",
    desc: "A SaaS booking platform where service providers get a custom link, list their services, and customers book via WhatsApp.",
    tech: ["Next.js", "PostgreSQL", "WhatsApp API"],
    plain:
      "Think Calendly — built from scratch. Providers set availability, customers book a slot, everyone gets notified.",
    year: "2025",
    link: "https://easy-booking-beta.vercel.app",
    featured: true,
  },
  {
    title: "GreenBeam Solar",
    tag: "Solar Landing Page",
    color: "#10b981",
    image: "/images/greenbeam.webp",
    desc: "A modern, responsive landing page for a solar materials business. Showcases products, highlights solar energy benefits, and drives leads directly to WhatsApp for instant customer conversations.",
    tech: ["Next.js", "Tailwind CSS", "WhatsApp API"],
    plain:
      "Customers browse solar products, see the benefits, and tap 'Get a Quote' — it opens WhatsApp instantly so the business can close the deal in chat.",
    year: "2024",
    link: "https://green-beam.vercel.app",
  },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function Work() {
  const header = useInView(0.1);
  const grid = useInView(0.05);

  return (
    <section id="work" style={{ padding: "6rem 1.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div
          ref={header.ref}
          style={{
            marginBottom: "3.5rem",
            opacity: header.inView ? 1 : 0,
            transform: header.inView ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <span className="section-tag">Selected Work</span>
          <h2
            className="section-title"
            style={{ fontSize: "clamp(2rem,4vw,3rem)" }}
          >
            Real projects.
            <br />
            <span style={{ color: "hsl(var(--muted-foreground))" }}>
              Real clients.
            </span>
          </h2>
        </div>

        {/* Grid */}
        <div
          ref={grid.ref}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(480px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {projects.map((p, i) => (
            <div
              key={p.title}
              style={{
                background: "hsl(var(--card))",
                border: `1px solid ${p.featured ? p.color + "40" : "hsl(var(--border))"}`,
                borderRadius: 20,
                overflow: "hidden",
                opacity: grid.inView ? 1 : 0,
                transform: grid.inView ? "translateY(0)" : "translateY(36px)",
                transition: `opacity 0.6s ${i * 120}ms ease, transform 0.6s ${i * 120}ms ease, border-color 0.2s, box-shadow 0.2s`,
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = p.color + "60";
                e.currentTarget.style.boxShadow = `0 16px 40px ${p.color}12`;
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = p.featured
                  ? p.color + "40"
                  : "hsl(var(--border))";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Image */}
              <div
                style={{
                  position: "relative",
                  height: 220,
                  overflow: "hidden",
                }}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.04)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
                {/* Gradient overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(to top, hsl(var(--card)) 0%, transparent 60%)`,
                  }}
                />
                {/* Badges on image */}
                <div
                  style={{
                    position: "absolute",
                    top: 14,
                    left: 14,
                    display: "flex",
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      background: p.color + "22",
                      color: p.color,
                      border: `1px solid ${p.color}40`,
                      borderRadius: 9999,
                      padding: "0.2rem 0.7rem",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {p.tag}
                  </span>
                  {p.featured && (
                    <span
                      style={{
                        background: "hsl(var(--brand-muted))",
                        color: "hsl(var(--brand))",
                        border: "1px solid hsl(var(--brand)/0.3)",
                        borderRadius: 9999,
                        padding: "0.2rem 0.7rem",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      ⭐ Featured
                    </span>
                  )}
                </div>
                <div style={{ position: "absolute", top: 14, right: 14 }}>
                  <span
                    style={{
                      background: "hsl(var(--background)/0.8)",
                      color: "hsl(var(--muted-foreground))",
                      borderRadius: 9999,
                      padding: "0.2rem 0.65rem",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {p.year}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "1.5rem" }}>
                <h3
                  style={{
                    fontFamily: "'Syne',sans-serif",
                    fontWeight: 700,
                    fontSize: "1.2rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "hsl(var(--muted-foreground))",
                    lineHeight: 1.7,
                    marginBottom: "1rem",
                  }}
                >
                  {p.desc}
                </p>

                {/* Plain English */}
                <div
                  style={{
                    background: "hsl(var(--secondary)/0.5)",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 10,
                    padding: "0.75rem 1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      color: "hsl(var(--muted-foreground))",
                      marginBottom: 4,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    In plain English
                  </p>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "hsl(var(--muted-foreground))",
                    }}
                  >
                    {p.plain}
                  </p>
                </div>

                {/* Tech + link */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                    }}
                  >
                    {p.tech.map((t) => (
                      <div
                        key={t}
                        title={t}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 8,
                          background: "hsl(var(--secondary))",
                          border: "1px solid hsl(var(--border))",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 14,
                        }}
                      >
                        {techIcons[t] ?? (
                          <span
                            style={{
                              fontSize: 9,
                              fontWeight: 700,
                              color: "hsl(var(--muted-foreground))",
                            }}
                          >
                            {t.slice(0, 2)}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                  <Link
                    href={p.link}
                    target="_blank"
                    style={{
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      color: p.color,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      transition: "gap 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.gap = "8px")}
                    onMouseLeave={(e) => (e.currentTarget.style.gap = "4px")}
                  >
                    View project →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
