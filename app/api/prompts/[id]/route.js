import { NextResponse } from 'next/server';
import { readStore, writeStore } from '@/lib/storage';

function normalizeTags(tags) {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags.map((tag) => tag.trim()).filter(Boolean);
  return tags
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export async function GET(_, { params }) {
  const store = await readStore();
  const prompt = store.prompts.find((item) => item.id === params.id);

  if (!prompt) {
    return NextResponse.json({ error: 'Prompt not found' }, { status: 404 });
  }

  return NextResponse.json(prompt);
}

export async function PUT(request, { params }) {
  const body = await request.json();
  const { title, category, description, promptText, tags } = body;

  const store = await readStore();
  const index = store.prompts.findIndex((item) => item.id === params.id);

  if (index < 0) {
    return NextResponse.json({ error: 'Prompt not found' }, { status: 404 });
  }

  const current = store.prompts[index];
  const updated = {
    ...current,
    title: title ?? current.title,
    category: category ?? current.category,
    description: description ?? current.description,
    promptText: promptText ?? current.promptText,
    tags: tags ? normalizeTags(tags) : current.tags,
    updatedAt: new Date().toISOString()
  };

  store.prompts[index] = updated;
  if (updated.category && !store.categories.includes(updated.category)) {
    store.categories.push(updated.category);
  }

  await writeStore(store);
  return NextResponse.json(updated);
}
