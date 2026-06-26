import { Sparkles } from "lucide-react"

const tech = ["Next.js", "Tailwind CSS", "shadcn/ui", "Gemini AI"]

export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Sparkles className="size-4 text-primary" />
          <span>CareerCopilot</span>
        </div>
        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
          <span>Built with</span>
          {tech.map((t, i) => (
            <span key={t} className="flex items-center gap-2">
              <span className="font-medium text-foreground">{t}</span>
              {i < tech.length - 1 && <span className="text-border">·</span>}
            </span>
          ))}
        </p>
      </div>
    </footer>
  )
}
