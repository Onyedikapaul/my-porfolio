"use client";
import { useEffect } from "react";

export default function TrackView({ postId, path }: { postId: string; path: string }) {
  useEffect(() => {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId, path }),
    }).catch(() => {});
  }, [postId, path]);
  return null;
}
