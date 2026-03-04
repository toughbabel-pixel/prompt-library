'use client';

import Link from 'next/link';

export default function PromptCard({ prompt }) {
  async function copyPrompt() {
    await navigator.clipboard.writeText(prompt.promptText);
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{prompt.title}</h3>
          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-indigo-600">{prompt.category}</p>
        </div>
        <button
          onClick={copyPrompt}
          className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
        >
          Copy Prompt
        </button>
      </div>
      <p className="mt-3 text-sm text-slate-600">{prompt.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {prompt.tags?.map((tag) => (
          <span key={tag} className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">
            #{tag}
          </span>
        ))}
      </div>
      <Link href={`/prompts/${prompt.id}`} className="mt-4 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-500">
        View details →
      </Link>
    </div>
  );
}
