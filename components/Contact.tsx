"use client";
import { useState } from "react";
import { Send, Mail, Code2, Briefcase, MessageCircle } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    budget: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      alert("Please fill in your name, email and message.");
      return;
    }
    setStatus("sending");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setStatus("sent");
    } else {
      setStatus("idle");
      alert("Something went wrong. Try WhatsApp instead.");
    }
  };

  const links = [
    {
      icon: <Mail size={15} />,
      label: "Email",
      value: "hello@paulcodes.pro",
      href: "mailto:hello@paulcodes.pro",
    },
    {
      icon: <Briefcase size={15} />,
      label: "LinkedIn",
      value: "linkedin.com/in/onyedika-paul",
      href: "https://www.linkedin.com/in/onyedika-paul-139990339",
    },
    {
      icon: <MessageCircle size={15} />,
      label: "WhatsApp",
      value: "+234 912 578 0998",
      href: "https://wa.me/2349125780998",
    },
  ];
  return (
    <section
      id="contact"
      style={{
        padding: "6rem 1.5rem",
        background: "hsl(var(--secondary)/0.3)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <span className="section-tag">Contact</span>
        <h2
          className="section-title"
          style={{ fontSize: "clamp(2rem,4vw,3rem)", marginBottom: "3.5rem" }}
        >
          Let's build something.
          <br />
          <span style={{ color: "hsl(var(--muted-foreground))" }}>
            Together.
          </span>
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: "2.5rem",
            alignItems: "start",
          }}
        >
          <div className="card" style={{ padding: "2rem" }}>
            {status === "sent" ? (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
                <h3
                  style={{
                    fontFamily: "'Syne',sans-serif",
                    fontWeight: 700,
                    fontSize: "1.25rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  Message sent!
                </h3>
                <p style={{ color: "hsl(var(--muted-foreground))" }}>
                  I'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  <div>
                    <label className="label">Your name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={onChange}
                      placeholder="Your name"
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="label">Email</label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      placeholder="Your email"
                      className="input"
                    />
                  </div>
                </div>
                <div>
                  <label className="label">Budget range</label>
                  <select
                    name="budget"
                    value={form.budget}
                    onChange={onChange}
                    className="input"
                  >
                    <option value="">Select a range...</option>
                    <option>Under $500</option>
                    <option>$500 – $1,500</option>
                    <option>$1,500 – $5,000</option>
                    <option>$5,000+</option>
                    <option>Let's discuss</option>
                  </select>
                </div>
                <div>
                  <label className="label">Tell me about your project</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    rows={5}
                    placeholder="What are you building? What problem are you solving?"
                    className="input"
                    style={{ resize: "vertical" }}
                  />
                </div>
                <button
                  onClick={onSubmit}
                  disabled={status === "sending"}
                  className="btn-primary"
                  style={{ justifyContent: "center" }}
                >
                  {status === "sending" ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send size={14} />
                      Send message
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <h3
              style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 700,
                fontSize: "1.1rem",
              }}
            >
              Reach me directly
            </h3>
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="card"
                style={{
                  padding: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  textDecoration: "none",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "hsl(var(--brand)/0.4)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "hsl(var(--border))")
                }
              >
                <span style={{ color: "hsl(var(--muted-foreground))" }}>
                  {l.icon}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      color: "hsl(var(--muted-foreground))",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {l.label}
                  </p>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {l.value}
                  </p>
                </div>
              </a>
            ))}
            <div
              className="card"
              style={{
                padding: "1rem",
                background: "hsl(var(--brand-muted))",
                borderColor: "hsl(var(--brand)/0.2)",
              }}
            >
              <p
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "hsl(var(--brand))",
                  marginBottom: "0.25rem",
                }}
              >
                ⚡ Quick response
              </p>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "hsl(var(--muted-foreground))",
                }}
              >
                I reply within{" "}
                <strong style={{ color: "hsl(var(--foreground))" }}>
                  24 hours
                </strong>
                . For urgent projects, WhatsApp is fastest.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
