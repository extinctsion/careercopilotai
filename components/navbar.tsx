import { Sparkles, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 glass">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="/" className="flex items-center gap-2.5" aria-label="CareerCopilot home">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Sparkles className="size-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight">CareerCopilot</span>
        </a>

        <nav className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            className="hidden rounded-full sm:inline-flex"
            render={
              <a href="#analyze">
                <Zap className="size-4" />
                Analyze resume
              </a>
            }
          />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
