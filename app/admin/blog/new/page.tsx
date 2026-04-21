"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { ArrowLeft, Eye, Send, Save } from "lucide-react";
import Link from "next/link";

const RichEditor = dynamic(() => import("@/components/RichEditor"), { ssr: false, loading: () => <div className="border border-border rounded-xl h-64 flex items-center justify-center text-muted-foreground text-sm">Loading editor...</div> });

export default function NewPost() {
  const [form, setForm] = useState({ title: "", excerpt: "", tags: "", coverImage: "" });
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const router = useRouter();

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const save = async (publish: boolean) => {
    if (!form.title || !content) return alert("Title and content are required.");
    publish ? setPublishing(true) : setSaving(true);
    const tags = form.tags.split(",").map(t => t.trim()).filter(Boolean);
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, tags, content, published: publish }),
    });
    if (res.ok) {
      const post = await res.json();
      router.push(`/admin/blog/${post._id}/edit`);
    } else {
      alert("Something went wrong. Try again.");
      setSaving(false); setPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <Link href="/admin/dashboard" className="btn-ghost gap-1.5 text-xs"><ArrowLeft size={14}/>Dashboard</Link>
          <h1 className="font-display font-bold text-sm hidden sm:block">New Post</h1>
          <div className="flex items-center gap-2">
            <button onClick={() => save(false)} disabled={saving} className="btn-outline text-xs py-1.5">
              <Save size={13}/>{saving ? "Saving..." : "Save draft"}
            </button>
            <button onClick={() => save(true)} disabled={publishing} className="btn-primary text-xs py-1.5">
              <Send size={13}/>{publishing ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-5">
        {/* Title */}
        <div>
          <label className="label">Post title *</label>
          <input name="title" value={form.title} onChange={onChange} placeholder="Write an amazing title..." className="input text-lg font-medium" />
        </div>

        {/* Excerpt */}
        <div>
          <label className="label">Excerpt / description *</label>
          <textarea name="excerpt" value={form.excerpt} onChange={onChange} rows={2}
            placeholder="A short summary shown in the blog list and used for SEO..."
            className="input resize-none" />
        </div>

        {/* Tags & Cover */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Tags (comma separated)</label>
            <input name="tags" value={form.tags} onChange={onChange} placeholder="React, Node.js, Tutorial" className="input" />
          </div>
          <div>
            <label className="label">Cover image URL (optional)</label>
            <input name="coverImage" value={form.coverImage} onChange={onChange} placeholder="https://..." className="input" />
          </div>
        </div>

        {/* Editor */}
        <div>
          <label className="label">Content *</label>
          <RichEditor content={content} onChange={setContent} />
        </div>
      </div>
    </div>
  );
}
