"use client"

import { useSyncExternalStore } from "react"
import { Lightbulb, CheckCircle2, ArrowRight, Zap, Target, BookOpen } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { analysisStore } from "@/lib/store/analysis-store"

export default function RecommendationsPage() {
  const { data } = useSyncExternalStore(
    analysisStore.subscribe,
    analysisStore.getSnapshot,
    () => ({ data: null, setAnalysis: () => {}, clearAnalysis: () => {} })
  )

  if (!data) return null

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Smart Recommendations</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          A prioritized roadmap to make your resume stand out to recruiters.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-3xl border-border/40 bg-card/40 p-6 backdrop-blur-xl">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Zap className="size-5 text-yellow-500" />
            Quick Wins
          </h3>
          <ul className="space-y-4">
            {data.improvements.filter(i => i.priority === "high").map((imp, i) => (
              <li key={i} className="flex gap-4 p-4 rounded-2xl bg-success/5 border border-success/10 group hover:border-success/30 transition-colors">
                <CheckCircle2 className="size-5 text-success shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold text-sm">{imp.title}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{imp.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="rounded-3xl border-border/40 bg-card/40 p-6 backdrop-blur-xl">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Target className="size-5 text-primary" />
            Strategic Adjustments
          </h3>
          <ul className="space-y-4">
            {data.improvements.filter(i => i.priority === "medium").map((imp, i) => (
              <li key={i} className="flex gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/10 group hover:border-primary/30 transition-colors">
                <Lightbulb className="size-5 text-primary shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold text-sm">{imp.title}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{imp.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="rounded-3xl border-border/40 bg-card/40 p-6 backdrop-blur-xl">
         <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <BookOpen className="size-5 text-blue-500" />
            Learning Paths for Missing Skills
         </h3>
         <div className="grid gap-4 sm:grid-cols-3">
            {data.missingSkills.slice(0, 3).map((skill, i) => (
              <div key={i} className="p-4 rounded-2xl border border-border/40 bg-secondary/20 space-y-3">
                <p className="font-bold text-primary">{skill}</p>
                <p className="text-xs text-muted-foreground italic">Recommended Course: Full Stack Mastery with {skill}</p>
                <Button variant="link" className="p-0 h-auto text-xs font-semibold text-primary group">
                  Explore Courses
                  <ArrowRight className="size-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            ))}
         </div>
      </Card>

      <div className="rounded-3xl bg-primary p-8 text-primary-foreground shadow-2xl shadow-primary/20 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold">Ready to land that job?</h2>
          <p className="opacity-90 max-w-lg">
            Follow these recommendations and update your resume. Once you&apos;re done, run another analysis to see your improved score!
          </p>
        </div>
        <Button className="bg-white text-primary hover:bg-neutral-100 rounded-2xl px-8 py-6 h-auto text-lg font-bold">
           Re-Analyze Now
        </Button>
      </div>
    </div>
  )
}
