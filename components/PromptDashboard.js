'use client';

import { useMemo, useState } from 'react';
import AddPromptModal from './AddPromptModal';
import PromptCard from './PromptCard';
import Sidebar from './Sidebar';

export default function PromptDashboard({ initialPrompts, initialCategories }) {
  const [prompts, setPrompts] = useState(initialPrompts);
  const [categories, setCategories] = useState(initialCategories);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [tag, setTag] = useState('All');

  const allTags = useMemo(() => {
    const tags = new Set();
    prompts.forEach((prompt) => prompt.tags?.forEach((t) => tags.add(t)));
    return ['All', ...Array.from(tags)];
  }, [prompts]);

  const filtered = prompts.filter((prompt) => {
    const titleMatch = prompt.title.toLowerCase().includes(query.toLowerCase());
    const categoryMatch = category === 'All' || prompt.category === category;
    const tagMatch = tag === 'All' || prompt.tags?.includes(tag);
    return titleMatch && categoryMatch && tagMatch;
  });

  function handleCreated(prompt) {
    setPrompts((prev) => [prompt, ...prev]);
    if (!categories.includes(prompt.category)) {
      setCategories((prev) => [...prev, prompt.category]);
    }
  }

  return (
    <div className="min-h-screen md:flex">
      <Sidebar total={prompts.length} />
      <main className="flex-1 p-4 md:p-8">
        <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Prompt Dashboard</h2>
            <p className="text-sm text-slate-500">Save, organize, and reuse your best AI prompts.</p>
          </div>
          <AddPromptModal categories={categories} onCreated={handleCreated} />
        </header>

        <div className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-3">
          <input
            placeholder="Search by title"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option>All</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            {allTags.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
          {!filtered.length && (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
              No prompts found for the current filters.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
