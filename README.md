# CareerCopilot

AI-powered resume analyzer that scores how well your resume matches a job posting and tells you exactly how to improve it.

## Features

- ATS match score with an animated circular indicator
- Resume summary and recruiter "first 15 seconds" insight
- Strengths, missing skills, and keyword match chips (found vs. missing)
- Skill gap radar chart (you vs. role requirements)
- Interview readiness ratings (technical, communication, leadership, problem solving)
- Prioritized, actionable resume improvements
- Resume heatmap, interactive ATS checklist, suggested headline
- Top 5 missing keywords (click to copy), career level detection, salary estimate
- Premium animated loading flow, dark/light mode, fully responsive

## Tech Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 + shadcn/ui
- React Hook Form + Zod validation
- Motion (animations) + Recharts (radar chart)
- AI SDK with Google Gemini via the Vercel AI Gateway
- `unpdf` for server-side PDF text extraction

## Getting Started

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Configure environment variables. Copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

   Set `AI_GATEWAY_API_KEY` (create one at https://vercel.com/ai-gateway). On Vercel/v0 this is provided automatically.

3. Run the dev server:

   ```bash
   pnpm dev
   ```

   Open http://localhost:3000.

## How It Works

1. Enter a job title, paste the job description, and upload a PDF resume.
2. The resume PDF is parsed to text on the server (`lib/pdf.ts`).
3. A server action (`actions/analyze.ts`) sends the resume + job context to Gemini and returns a structured analysis validated by a Zod schema (`types/analysis.ts`).
4. Results render in animated cards.

## Project Structure

```
app/            App Router pages, layout, global styles
actions/        Server action for AI analysis
components/     UI components (form, loading, results, navbar, footer)
components/ui/  shadcn/ui primitives
lib/            PDF parsing + score helpers
types/          Zod schema and shared types
```

## Notes

The resume must be a text-based PDF (not a scanned image). Files are processed in-memory and never stored.
