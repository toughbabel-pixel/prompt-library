import PromptDashboard from '@/components/PromptDashboard';
import { readStore } from '@/lib/storage';

export default async function HomePage() {
  const store = await readStore();

  return (
    <PromptDashboard
      initialPrompts={store.prompts}
      initialCategories={store.categories}
    />
  );
}
