"use client";
import { useState } from "react";
import { Send, Check, AlertCircle, Sparkles } from "lucide-react";

interface Props {
  title?: string;
  description?: string;
  compact?: boolean;
}

export default function NewsletterSignup({
  title = "Stay in the loop",
  description = "Get notified when I publish new posts.",
  compact = false,
}: Props) {
  const [email, setEmail]     = useState("");
  const [status, setStatus]   = useState<"idle"|"loading"|"success"|"error"|"exists">("idle");
  const [message, setMessage] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (res.ok) {
      setStatus("success"); setMessage(data.message); setEmail("");
    } else if (res.status === 409) {
      setStatus("exists"); setMessage(data.error);
    } else {
      setStatus("error"); setMessage(data.error);
    }
  };

  /* ── COMPACT ── */
  if (compact) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6">
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand/5 blur-2xl pointer-events-none" />

        <div className="flex items-center gap-2 mb-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-brand/20 bg-brand-muted text-brand shrink-0">
            <Sparkles size={13} />
          </div>
          <p className="font-display font-bold text-sm">{title}</p>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed mb-4">{description}</p>

        {status === "success" ? (
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-muted border border-brand/20 px-4 py-1.5 text-brand text-xs font-bold">
            <Check size={13} /> {message}
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com" required
              onKeyDown={e => e.key === "Enter" && submit(e as never)}
              className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
            <button
              type="button" onClick={submit} disabled={status === "loading"}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground transition-all hover:opacity-85 hover:scale-105 active:scale-95 disabled:opacity-60"
            >
              {status === "loading"
                ? <div className="h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                : <Send size={14} />}
            </button>
          </div>
        )}

        {(status === "error" || status === "exists") && (
          <p className={`mt-2 flex items-center gap-1.5 text-xs ${status === "exists" ? "text-brand" : "text-red-500"}`}>
            <AlertCircle size={11} />{message}
          </p>
        )}
      </div>
    );
  }

  /* ── FULL ── */
  return (
    <div className="relative w-[95%] max-w-4xl justify-self-center my-10 overflow-hidden rounded-3xl border border-brand/20 bg-card px-6 py-12 text-center sm:px-12">
      {/* Glows */}
      <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-brand/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-brand/5 blur-3xl" />

      {/* Badge */}
      <div className="relative inline-flex items-center gap-1.5 rounded-full border border-brand/25 bg-brand-muted px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand mb-6">
        <Sparkles size={11} /> Newsletter
      </div>

      <h3 className="relative font-display font-extrabold tracking-tight text-foreground mb-3" style={{ fontSize: "clamp(1.4rem,3vw,1.8rem)" }}>
        {title}
      </h3>
      <p className="relative text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto mb-8">
        {description}
      </p>

      {status === "success" ? (
        <div className="relative inline-flex items-center gap-2.5 rounded-full border border-brand/30 bg-brand-muted px-6 py-3 text-brand font-bold text-sm">
          <Check size={16} /> {message} 🎉
        </div>
      ) : (
        <div className="relative mx-auto max-w-md">
          <div className="flex items-center rounded-full border border-border bg-background pl-5 pr-1.5 py-1.5 transition-all focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20 shadow-sm">
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email address" required
              className="flex-1 min-w-0 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground"
            />
            <button
              type="button" onClick={submit} disabled={status === "loading"}
              className="shrink-0 flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 font-display font-bold text-brand-foreground text-sm transition-all hover:opacity-90 hover:scale-[1.02] active:scale-95 disabled:opacity-60"
            >
              {status === "loading" ? (
                <><div className="h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Subscribing...</>
              ) : (
                <><Send size={14} /> Subscribe</>
              )}
            </button>
          </div>
        </div>
      )}

      {(status === "error" || status === "exists") && (
        <p className={`relative mt-3 flex items-center justify-center gap-1.5 text-xs ${status === "exists" ? "text-brand" : "text-red-500"}`}>
          <AlertCircle size={12} />{message}
        </p>
      )}

      <p className="relative mt-4 text-xs text-muted-foreground">
        No spam ever. Unsubscribe anytime.
      </p>
    </div>
  );
}