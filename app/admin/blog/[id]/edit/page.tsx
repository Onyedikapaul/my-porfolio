"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { ArrowLeft, Save, Send, Globe, EyeOff, Trash2, ExternalLink } from "lucide-react";
import Link from "next/link";

const RichEditor = dynamic(() => import("@/components/RichEditor"), { ssr: false, loading: () => <div className="border border-border rounded-xl h-64 flex items-center justify-center text-muted-foreground text-sm">Loading editor...</div> });

export default function EditPost({ params }: { params: Promise<{ id: string }> }) {
  const [form, setForm] = useState({ title: "", excerpt: "", tags: "", coverImage: "", published: false, slug: "" });
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [id, setId] = useState("");
  const router = useRouter();

  useEffect(() => {
    params.then(async ({ id }) => {
      setId(id);
      const res = await fetch(`/api/posts/${id}`);
      const post = await res.json();
      setForm({ title: post.title, excerpt: post.excerpt, tags: (post.tags||[]).join(", "), coverImage: post.coverImage||"", published: post.published, slug: post.slug });
      setContent(post.content);
      setLoading(false);
    });
  }, [params]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const save = async (extra?: Partial<typeof form>) => {
    setSaving(true);
    const tags = form.tags.split(",").map(t => t.trim()).filter(Boolean);
    await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, ...extra, tags, content }),
    });
    if (extra) setForm(p => ({ ...p, ...extra }));
    setSaving(false);
  };

  const deletePost = async () => {
    if (!confirm("Delete this post permanently?")) return;
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    router.push("/admin/dashboard");
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <Link href="/admin/dashboard" className="btn-ghost gap-1.5 text-xs"><ArrowLeft size={14}/>Dashboard</Link>
          <div className="flex items-center gap-1.5">
            {form.slug && (
              <Link href={`/blog/${form.slug}`} target="_blank" className="btn-ghost text-xs py-1.5 gap-1.5"><ExternalLink size={13}/>Preview</Link>
            )}
            <button onClick={() => save({ published: !form.published })} className="btn-outline text-xs py-1.5 gap-1.5">
              {form.published ? <><EyeOff size={13}/>Unpublish</> : <><Globe size={13}/>Publish</>}
            </button>
            <button onClick={() => save()} disabled={saving} className="btn-primary text-xs py-1.5 gap-1.5">
              <Save size={13}/>{saving ? "Saving..." : "Save"}
            </button>
            <button onClick={deletePost} className="btn-ghost text-xs py-1.5 text-red-500 hover:text-red-500 gap-1.5"><Trash2 size={13}/></button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-5">
        <div className="flex items-center gap-2">
          <span className={`badge ${form.published ? "badge-brand" : "badge-muted"}`}>{form.published ? "Published" : "Draft"}</span>
          {form.slug && <span className="text-xs text-muted-foreground font-mono">/blog/{form.slug}</span>}
        </div>
        <div>
          <label className="label">Post title *</label>
          <input name="title" value={form.title} onChange={onChange} className="input text-lg font-medium" />
        </div>
        <div>
          <label className="label">Excerpt</label>
          <textarea name="excerpt" value={form.excerpt} onChange={onChange} rows={2} className="input resize-none" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Tags</label>
            <input name="tags" value={form.tags} onChange={onChange} placeholder="React, Tutorial" className="input" />
          </div>
          <div>
            <label className="label">Cover image URL</label>
            <input name="coverImage" value={form.coverImage} onChange={onChange} placeholder="https://..." className="input" />
          </div>
        </div>
        <div>
          <label className="label">Content</label>
          <RichEditor content={content} onChange={setContent} />
        </div>
      </div>
    </div>
  );
}
