import { randomUUID } from 'crypto';
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

export async function GET() {
  const store = await readStore();
  return NextResponse.json(store);
}

export async function POST(request) {
  const body = await request.json();
  const { title, category, description, promptText, tags } = body;

  if (!title || !category || !description || !promptText) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const store = await readStore();
  const newPrompt = {
    id: randomUUID(),
    title,
    category,
    description,
    promptText,
    tags: normalizeTags(tags),
    createdAt: new Date().toISOString()
  };

  store.prompts = [newPrompt, ...store.prompts];
  if (!store.categories.includes(category)) {
    store.categories.push(category);
  }

  await writeStore(store);
  return NextResponse.json(newPrompt, { status: 201 });
}
