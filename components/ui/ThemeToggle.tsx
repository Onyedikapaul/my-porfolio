"use client";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Monitor } from "lucide-react";
import { useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const options: { value: "light" | "dark" | "system"; icon: React.ReactNode; label: string }[] = [
    { value: "light", icon: <Sun size={14} />, label: "Light" },
    { value: "dark",  icon: <Moon size={14} />, label: "Dark" },
    { value: "system",icon: <Monitor size={14} />, label: "System" },
  ];
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="btn-ghost p-2 rounded-lg" aria-label="Toggle theme">
        {resolvedTheme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-10 z-50 w-32 rounded-xl border border-border bg-card shadow-xl p-1">
            {options.map(o => (
              <button key={o.value} onClick={() => { setTheme(o.value); setOpen(false); }}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${theme === o.value ? "bg-brand-muted text-brand font-semibold" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>
                {o.icon}{o.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
