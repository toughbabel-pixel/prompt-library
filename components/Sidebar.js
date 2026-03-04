export default function Sidebar({ total }) {
  return (
    <aside className="hidden w-64 border-r border-slate-200 bg-white p-6 md:block">
      <h1 className="text-xl font-bold text-slate-900">Prompt Library Builder</h1>
      <p className="mt-2 text-sm text-slate-500">Micro SaaS prompt workspace</p>

      <nav className="mt-8 space-y-2 text-sm">
        <div className="rounded-lg bg-slate-900 px-3 py-2 font-medium text-white">Dashboard</div>
        <div className="rounded-lg px-3 py-2 text-slate-600">All Prompts</div>
      </nav>

      <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs uppercase tracking-wide text-slate-500">Saved Prompts</p>
        <p className="mt-2 text-2xl font-bold text-slate-900">{total}</p>
      </div>
    </aside>
  );
}
