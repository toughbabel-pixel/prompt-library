# Prompt Library Builder

A micro SaaS web app built with **Next.js + Tailwind CSS** to save, organize, search, and reuse AI prompts.

## Features

- Prompt dashboard with cards (title, category, description, tags)
- Add prompt modal with required fields
- Search by title and filter by category/tag
- Prompt details page with copy + edit flow
- API routes for prompt CRUD (create, read, update)
- Local JSON storage under `data/prompts.json`
- Default categories:
  - UX Design
  - Development
  - Marketing
  - Research
  - AI Tools

## Tech Stack

- Next.js (App Router)
- Tailwind CSS
- Node.js API Routes
- Local JSON file storage

## Run locally

```bash
npm install
npm run dev
```

Open: `http://localhost:3000`

## API

- `GET /api/prompts` — list prompts and categories
- `POST /api/prompts` — create prompt
- `GET /api/prompts/:id` — get a prompt
- `PUT /api/prompts/:id` — update prompt
