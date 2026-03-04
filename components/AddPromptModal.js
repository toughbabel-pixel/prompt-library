'use client';

import { useState } from 'react';

const initialState = {
  title: '',
  category: 'UX Design',
  description: '',
  promptText: '',
  tags: ''
};

export default function AddPromptModal({ categories, onCreated }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/prompts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        throw new Error('Unable to create prompt');
      }

      const newPrompt = await response.json();
      onCreated(newPrompt);
      setForm(initialState);
      setOpen(false);
    } catch (error) {
      console.error(error);
      alert('Could not save prompt.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
      >
        Add Prompt
      </button>

      {open && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Add New Prompt</h2>
              <button onClick={() => setOpen(false)} className="text-sm text-slate-500">
                Close
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required
                placeholder="Prompt title"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <select
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <textarea
                required
                placeholder="Description"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                rows={2}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
              <textarea
                required
                placeholder="Prompt text"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                rows={4}
                value={form.promptText}
                onChange={(e) => setForm({ ...form, promptText: e.target.value })}
              />
              <input
                placeholder="Tags (comma separated)"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
              />

              <button
                disabled={loading}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Prompt'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
