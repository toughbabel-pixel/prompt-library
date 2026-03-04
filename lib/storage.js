import fs from 'fs/promises';
import path from 'path';
import { DEFAULT_CATEGORIES } from './categories';

const dataDir = path.join(process.cwd(), 'data');
const promptsFile = path.join(dataDir, 'prompts.json');

async function ensureStorage() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(promptsFile);
  } catch {
    await fs.writeFile(
      promptsFile,
      JSON.stringify({ prompts: [], categories: DEFAULT_CATEGORIES }, null, 2),
      'utf8'
    );
  }
}

export async function readStore() {
  await ensureStorage();
  const content = await fs.readFile(promptsFile, 'utf8');
  return JSON.parse(content);
}

export async function writeStore(store) {
  await ensureStorage();
  await fs.writeFile(promptsFile, JSON.stringify(store, null, 2), 'utf8');
}
