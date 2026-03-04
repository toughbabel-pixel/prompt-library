'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function PromptDetailsPage({ params }) {
  const [prompt, setPrompt] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(null);

  useEffect(() => {
    async function loadPrompt() {
      const response = await fetch(`/api/prompts/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setPrompt(data);
        setForm({
          ...data,
          tags: data.tags?.join(', ') || ''
        });
      }
    }

    loadPrompt();
  }, [params.id]);

  async function copyPrompt() {
    if (prompt) {
      await navigator.clipboard.writeText(prompt.promptText);
    }
  }

  async function saveEdit(event) {
    event.preventDefault();
    const response = await fetch(`/api/prompts/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    if (response.ok) {
      const updated = await response.json();
      setPrompt(updated);
      setForm({
        ...updated,
        tags: updated.tags?.join(', ') || ''
      });
      setIsEditing(false);
    }
  }

  if (!prompt || !form) {
    return <div className="p-10 text-sm text-slate-500">Loading prompt...</div>;
  }

  return (
    <main className="mx-auto min-h-screen max-w-4xl p-6 md:p-10">
      <Link href="/" className="text-sm font-medium text-indigo-600">← Back to dashboard</Link>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        {isEditing ? (
          <form onSubmit={saveEdit} className="space-y-4">
            <input className="w-full rounded-lg border px-3 py-2" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <input className="w-full rounded-lg border px-3 py-2" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <textarea className="w-full rounded-lg border px-3 py-2" rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <textarea className="w-full rounded-lg border px-3 py-2" rows={6} value={form.promptText} onChange={(e) => setForm({ ...form, promptText: e.target.value })} />
            <input className="w-full rounded-lg border px-3 py-2" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
            <div className="flex gap-3">
              <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white">Save</button>
              <button type="button" onClick={() => setIsEditing(false)} className="rounded-lg border px-4 py-2 text-sm">Cancel</button>
            </div>
          </form>
        ) : (
          <>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">{prompt.category}</p>
                <h1 className="mt-1 text-2xl font-bold text-slate-900">{prompt.title}</h1>
                <p className="mt-2 text-slate-600">{prompt.description}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={copyPrompt} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">Copy Prompt</button>
                <button onClick={() => setIsEditing(true)} className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white">Edit</button>
              </div>
            </div>
            <pre className="mt-6 whitespace-pre-wrap rounded-lg bg-slate-900 p-4 text-sm text-slate-100">{prompt.promptText}</pre>
            <div className="mt-4 flex flex-wrap gap-2">
              {prompt.tags?.map((item) => (
                <span key={item} className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">#{item}</span>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
