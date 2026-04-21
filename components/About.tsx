"use client";
import { useEffect, useRef, useState } from "react";

const timeline = [
  {
    year: "2021",
    title: "The beginning",
    desc: "Opened a code editor for the first time. No degree, no bootcamp — just curiosity, YouTube, and a stubborn refusal to quit.",
  },
  {
    year: "2022",
    title: "First paying client",
    desc: "Someone trusted me with real money for real work. I delivered a full web app end-to-end and never looked back.",
  },
  {
    year: "2023",
    title: "Deep in the real world",
    desc: "Built banking platforms, courier dashboards, and delivery tracking systems for actual businesses with actual users. No tutorials — just pressure and solutions.",
  },
  {
    year: "2024",
    title: "Levelling up the stack",
    desc: "Expanded into Next.js, PostgreSQL, and SaaS architecture. Started thinking less like a freelancer and more like a product engineer.",
  },
  {
    year: "2025",
    title: "Open for the right work",
    desc: "Currently taking on freelance projects and open to full-time remote roles. I'm not chasing any job — I'm looking for work that's worth building.",
  },
];

const stats = [
  { value: "20+", label: "Projects shipped" },
  { value: "3+", label: "Years building" },
  { value: "5+", label: "Industries served" },
  { value: "100%", label: "Remote" },
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

export default function About() {
  const left = useInView(0.1);
  const statsRef = useInView(0.1);
  const timeline = useInView(0.05);

  const items = [
    {
      year: "2021",
      title: "The beginning",
      desc: "Opened a code editor for the first time. No degree, no bootcamp — just curiosity, YouTube, and a stubborn refusal to quit.",
    },
    {
      year: "2022",
      title: "First paying client",
      desc: "Someone trusted me with real money for real work. I delivered a full web app end-to-end and never looked back.",
    },
    {
      year: "2023",
      title: "Deep in the real world",
      desc: "Built banking platforms, courier dashboards, and delivery tracking systems for actual businesses with actual users. No tutorials — just pressure and solutions.",
    },
    {
      year: "2024",
      title: "Levelling up the stack",
      desc: "Expanded into Next.js, PostgreSQL, and SaaS architecture. Started thinking less like a freelancer and more like a product engineer.",
    },
    {
      year: "2025",
      title: "Open for the right work",
      desc: "Currently taking on freelance projects and open to full-time remote roles. I'm not chasing any job — I'm looking for work that's worth building.",
    },
  ];

  return (
    <section id="about" style={{ padding: "6rem 1.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "4rem",
            alignItems: "start",
          }}
        >
          {/* Left — story */}
          <div
            ref={left.ref}
            style={{
              opacity: left.inView ? 1 : 0,
              transform: left.inView ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <span className="section-tag">About</span>
            <h2
              className="section-title"
              style={{
                fontSize: "clamp(2rem,4vw,3rem)",
                marginBottom: "1.5rem",
              }}
            >
              Self-taught.
              <br />
              <span style={{ color: "hsl(var(--muted-foreground))" }}>
                Battle-tested.
              </span>
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                color: "hsl(var(--muted-foreground))",
                lineHeight: 1.8,
                marginBottom: "2rem",
              }}
            >
              <p>
                I'm{" "}
                <strong style={{ color: "hsl(var(--foreground))" }}>
                  Onyedika Paul
                </strong>{" "}
                — I didn't take the traditional route. No CS degree, no
                bootcamp, no shortcuts. I learned by doing — by taking on real
                clients, hitting real problems, and figuring it out under
                pressure.
              </p>
              <p>
                That means the code I write isn't tutorial code. It's been
                stress-tested in production, debugged at midnight, and delivered
                to people who were counting on it.
              </p>
              <p>
                Based in{" "}
                <strong style={{ color: "hsl(var(--foreground))" }}>
                  Nigeria
                </strong>
                , working fully remote, and selectively taking on projects where
                I can actually move the needle — not just fill a seat.
              </p>
            </div>

            {/* Tags */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginBottom: "2.5rem",
              }}
            >
              {[
                "Remote-first",
                "Fast delivery",
                "Clean code",
                "Always available",
                "No BS",
              ].map((t, i) => (
                <span
                  key={t}
                  className="badge-brand"
                  style={{
                    opacity: left.inView ? 1 : 0,
                    transform: left.inView
                      ? "translateY(0)"
                      : "translateY(8px)",
                    transition: `opacity 0.4s ${300 + i * 80}ms ease, transform 0.4s ${300 + i * 80}ms ease`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div
              ref={statsRef.ref}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  style={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 12,
                    padding: "1rem 1.25rem",
                    opacity: statsRef.inView ? 1 : 0,
                    transform: statsRef.inView
                      ? "translateY(0)"
                      : "translateY(16px)",
                    transition: `opacity 0.5s ${i * 100}ms ease, transform 0.5s ${i * 100}ms ease`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Syne',sans-serif",
                      fontWeight: 800,
                      fontSize: "1.75rem",
                      color: "hsl(var(--brand))",
                      lineHeight: 1,
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "hsl(var(--muted-foreground))",
                      marginTop: 4,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — timeline */}
          <div>
            <h3
              style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                color: "hsl(var(--muted-foreground))",
                marginBottom: "2rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              My journey
            </h3>
            <div ref={timeline.ref} style={{ position: "relative" }}>
              {/* Line */}
              <div
                style={{
                  position: "absolute",
                  left: 13,
                  top: 0,
                  bottom: 0,
                  width: 1,
                  background: `linear-gradient(to bottom, hsl(var(--brand)/0.6), hsl(var(--border)))`,
                }}
              />

              {items.map((t, i) => (
                <div
                  key={t.year}
                  style={{
                    display: "flex",
                    gap: "1.5rem",
                    marginBottom: i < items.length - 1 ? "2rem" : 0,
                    position: "relative",
                    opacity: timeline.inView ? 1 : 0,
                    transform: timeline.inView
                      ? "translateX(0)"
                      : "translateX(-16px)",
                    transition: `opacity 0.5s ${i * 120}ms ease, transform 0.5s ${i * 120}ms ease`,
                  }}
                >
                  {/* Dot */}
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background:
                        i === items.length - 1
                          ? "hsl(var(--brand))"
                          : "hsl(var(--card))",
                      border: `2px solid ${i === items.length - 1 ? "hsl(var(--brand))" : "hsl(var(--brand)/0.4)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      zIndex: 1,
                      boxShadow:
                        i === items.length - 1
                          ? "0 0 16px hsl(var(--brand)/0.4)"
                          : "none",
                    }}
                  >
                    {i < items.length - 1 && (
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: "hsl(var(--brand))",
                        }}
                      />
                    )}
                    {i === items.length - 1 && (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="hsl(var(--brand-foreground))"
                        stroke="none"
                      >
                        <polyline
                          points="20 6 9 17 4 12"
                          strokeWidth="3"
                          stroke="hsl(var(--brand-foreground))"
                          fill="none"
                        />
                      </svg>
                    )}
                  </div>

                  {/* Content */}
                  <div
                    style={{
                      background:
                        i === items.length - 1
                          ? "hsl(var(--brand-muted))"
                          : "transparent",
                      border:
                        i === items.length - 1
                          ? "1px solid hsl(var(--brand)/0.2)"
                          : "none",
                      borderRadius: i === items.length - 1 ? 12 : 0,
                      padding: i === items.length - 1 ? "0.75rem 1rem" : "0",
                      flex: 1,
                    }}
                  >
                    <p
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 800,
                        color: "hsl(var(--brand))",
                        marginBottom: 3,
                        letterSpacing: "0.06em",
                      }}
                    >
                      {t.year}
                    </p>
                    <h4
                      style={{
                        fontFamily: "'Syne',sans-serif",
                        fontWeight: 700,
                        fontSize: "0.95rem",
                        marginBottom: 4,
                        color: "hsl(var(--foreground))",
                      }}
                    >
                      {t.title}
                    </h4>
                    <p
                      style={{
                        fontSize: "0.85rem",
                        color: "hsl(var(--muted-foreground))",
                        lineHeight: 1.7,
                      }}
                    >
                      {t.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
