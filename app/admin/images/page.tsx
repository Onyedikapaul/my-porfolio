"use client";
import { useState, useRef, useEffect } from "react";
import { Upload, Copy, Check, Image as ImageIcon, Link2, Trash2 } from "lucide-react";

interface UploadedImage { 
  _id: string;
  url: string; 
  publicId: string; 
  width: number; 
  height: number; 
  name: string;
  createdAt: string;
}

export default function ImagesPage() {
  const [images, setImages]       = useState<UploadedImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging]   = useState(false);
  const [copied, setCopied]       = useState<string | null>(null);
  const [error, setError]         = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/upload")
      .then(r => r.json())
      .then(data => Array.isArray(data) && setImages(data));
  }, []);

  const upload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError("");
    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) { setError("Only image files allowed."); continue; }
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (res.ok) {
        const data = await res.json();
        setImages(prev => [data, ...prev]);
      } else {
        setError("Upload failed. Check your Cloudinary env vars.");
      }
    }
    setUploading(false);
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  };

  const copyMarkdown = (url: string, name: string) => {
    navigator.clipboard.writeText(`![${name}](${url})`);
    setCopied(url + "md");
    setTimeout(() => setCopied(null), 2000);
  };

  const deleteImage = async (img: UploadedImage) => {
    if (!confirm("Delete this image? This cannot be undone.")) return;
    const res = await fetch("/api/upload", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: img._id, publicId: img.publicId }),
    });
    if (res.ok) setImages(prev => prev.filter(i => i._id !== img._id));
    else setError("Delete failed. Try again.");
  };

  return (
    <div style={{ padding: "2rem 1.5rem", maxWidth: 1000, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.5rem", marginBottom: 4 }}>Image Library</h1>
        <p style={{ color: "hsl(var(--muted-foreground))", fontSize: "0.875rem" }}>Upload images and copy their URLs to use in your blog posts.</p>
      </div>

      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); upload(e.dataTransfer.files); }}
        style={{
          border: `2px dashed ${dragging ? "hsl(var(--brand))" : "hsl(var(--border))"}`,
          borderRadius: 16, padding: "3rem 2rem", textAlign: "center", cursor: "pointer",
          background: dragging ? "hsl(var(--brand-muted))" : "hsl(var(--card))",
          transition: "all 0.2s", marginBottom: "1.5rem",
        }}
      >
        <input ref={inputRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={e => upload(e.target.files)} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: "hsl(var(--brand-muted))", border: "1px solid hsl(var(--brand)/0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "hsl(var(--brand))" }}>
            {uploading
              ? <div style={{ width: 20, height: 20, border: "2px solid hsl(var(--brand)/0.3)", borderTop: "2px solid hsl(var(--brand))", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
              : <Upload size={22} />}
          </div>
          <div>
            <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: "0.95rem", marginBottom: 4 }}>
              {uploading ? "Uploading..." : "Click or drag & drop images here"}
            </p>
            <p style={{ fontSize: "0.8rem", color: "hsl(var(--muted-foreground))" }}>PNG, JPG, GIF, WebP supported</p>
          </div>
        </div>
      </div>

      {error && (
        <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 10, padding: "0.75rem 1rem", color: "#ef4444", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
          {error}
        </div>
      )}

      {/* Instructions */}
      <div style={{ background: "hsl(var(--brand-muted))", border: "1px solid hsl(var(--brand)/0.2)", borderRadius: 12, padding: "1rem 1.25rem", marginBottom: "2rem", fontSize: "0.85rem", color: "hsl(var(--muted-foreground))" }}>
        <p style={{ fontWeight: 600, color: "hsl(var(--brand))", marginBottom: 4 }}>💡 How to use</p>
        <p>Upload an image → click <strong style={{ color: "hsl(var(--foreground))" }}>Copy URL</strong> for the direct link, or <strong style={{ color: "hsl(var(--foreground))" }}>Copy MD</strong> for a markdown tag. <strong style={{ color: "#ef4444" }}>Delete</strong> removes it from both the library and Cloudinary.</p>
      </div>

      {/* Images grid */}
      {images.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem 0", color: "hsl(var(--muted-foreground))" }}>
          <ImageIcon size={40} style={{ margin: "0 auto 1rem", opacity: 0.2 }} />
          <p>No images uploaded yet. Upload your first one above.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem" }}>
          {images.map((img, i) => (
            <div key={img._id || i} style={{
              background: "hsl(var(--card))", border: "1px solid hsl(var(--border))",
              borderRadius: 14, overflow: "hidden", transition: "border-color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "hsl(var(--brand)/0.4)")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "hsl(var(--border))")}
            >
              {/* Preview */}
              <div style={{ height: 160, background: "hsl(var(--secondary))", overflow: "hidden", position: "relative" }}>
                <img src={img.url} alt={img.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", bottom: 6, right: 6, background: "rgba(0,0,0,0.6)", borderRadius: 6, padding: "2px 6px", fontSize: "0.7rem", color: "#fff" }}>
                  {img.width}×{img.height}
                </div>
              </div>

              {/* Info + actions */}
              <div style={{ padding: "0.875rem" }}>
                <p style={{ fontSize: "0.8rem", fontWeight: 500, marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{img.name}</p>
                <p style={{ fontSize: "0.7rem", color: "hsl(var(--muted-foreground))", marginBottom: "0.75rem" }}>
                  {new Date(img.createdAt).toLocaleDateString()}
                </p>

                {/* URL preview */}
                <div style={{
                  background: "hsl(var(--background))", border: "1px solid hsl(var(--border))",
                  borderRadius: 8, padding: "0.4rem 0.6rem", fontSize: "0.7rem",
                  color: "hsl(var(--muted-foreground))", fontFamily: "monospace",
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: "0.75rem",
                }}>{img.url}</div>

                {/* Action buttons */}
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button onClick={() => copyUrl(img.url)} style={{
                    flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                    padding: "0.4rem 0.5rem", borderRadius: 8, border: "1px solid hsl(var(--border))",
                    background: copied === img.url ? "hsl(var(--brand-muted))" : "hsl(var(--background))",
                    color: copied === img.url ? "hsl(var(--brand))" : "hsl(var(--muted-foreground))",
                    fontSize: "0.75rem", fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
                  }}>
                    {copied === img.url ? <Check size={12} /> : <Link2 size={12} />}
                    {copied === img.url ? "Copied!" : "Copy URL"}
                  </button>

                  <button onClick={() => copyMarkdown(img.url, img.name)} style={{
                    flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                    padding: "0.4rem 0.5rem", borderRadius: 8, border: "1px solid hsl(var(--border))",
                    background: copied === img.url + "md" ? "hsl(var(--brand-muted))" : "hsl(var(--background))",
                    color: copied === img.url + "md" ? "hsl(var(--brand))" : "hsl(var(--muted-foreground))",
                    fontSize: "0.75rem", fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
                  }}>
                    {copied === img.url + "md" ? <Check size={12} /> : <Copy size={12} />}
                    {copied === img.url + "md" ? "Copied!" : "Copy MD"}
                  </button>

                  <button onClick={() => deleteImage(img)} style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    padding: "0.4rem 0.6rem", borderRadius: 8,
                    border: "1px solid rgba(239,68,68,0.3)",
                    background: "rgba(239,68,68,0.06)", color: "#ef4444",
                    cursor: "pointer", transition: "all 0.15s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.15)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(239,68,68,0.06)"; }}
                  title="Delete image">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}