export default function Loading() {
  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "hsl(var(--background))",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      zIndex: 9999,
    }}>
      {/* Logo */}
      <div style={{
        fontFamily: "'Syne', sans-serif",
        fontWeight: 800,
        fontSize: "2rem",
        letterSpacing: "-0.03em",
        marginBottom: "2.5rem",
        animation: "pulse 1.5s ease-in-out infinite",
      }}>
        Paul<span style={{ color: "hsl(var(--brand))" }}>codes</span><span style={{ color: "hsl(var(--brand))" }}>.</span>
      </div>

      {/* Animated bars */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 36 }}>
        {[0, 1, 2, 3, 4].map(i => (
          <div key={i} style={{
            width: 4,
            borderRadius: 9999,
            background: i === 2 ? "hsl(var(--brand))" : `hsl(var(--brand) / ${1 - i * 0.15})`,
            animation: `bar 1s ease-in-out infinite`,
            animationDelay: `${i * 0.12}s`,
          }} />
        ))}
      </div>

      {/* Subtle text */}
      <p style={{
        marginTop: "1.75rem",
        fontSize: "0.75rem",
        color: "hsl(var(--muted-foreground))",
        fontFamily: "'DM Sans', sans-serif",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        animation: "fadeIn 0.5s ease forwards",
      }}>
        Loading...
      </p>

      <style>{`
        @keyframes bar {
          0%, 100% { height: 12px; opacity: 0.4; }
          50%       { height: 36px; opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.6; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}