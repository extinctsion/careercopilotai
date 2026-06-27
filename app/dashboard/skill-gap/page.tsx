"use client"

import { useSyncExternalStore } from "react"
import { Brain, Search, Info, Lightbulb, CheckCircle2, XCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { analysisStore } from "@/lib/store/analysis-store"
import { SkillGapChart } from "@/components/results/skill-gap-chart"
import { cn } from "@/lib/utils"

export default function SkillGapPage() {
  const { data } = useSyncExternalStore(
    analysisStore.subscribe,
    analysisStore.getSnapshot,
    () => ({ data: null, setAnalysis: () => {}, clearAnalysis: () => {} })
  )

  if (!data) return null

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Skill Gap Analysis</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Compare your skills with the requirements for your target role.
          </p>
        </div>
        <Card className="flex items-center gap-4 px-4 py-2 border-border/40 bg-card/40 backdrop-blur-xl rounded-2xl">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Target Role</div>
          <div className="font-bold text-primary">Software Engineer</div>
          <Button variant="outline" size="sm" className="rounded-xl h-8">Change Role</Button>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-3xl border-border/40 bg-card/40 p-6 backdrop-blur-xl">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Brain className="size-5 text-primary" />
            Skill Gap Chart
          </h3>
          <div className="h-[300px] flex items-center justify-center">
             <SkillGapChart data={data.skillGap} />
          </div>
        </Card>

        <Card className="rounded-3xl border-border/40 bg-card/40 p-6 backdrop-blur-xl flex flex-col">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-6 flex items-center gap-2">
            <CheckCircle2 className="size-4 text-success" />
            Your Skills ({data.keywords.filter(k => k.found).length})
          </h3>
          <div className="flex flex-wrap gap-2 mb-8">
            {data.keywords.filter(k => k.found).map((k) => (
              <Badge key={k.keyword} variant="secondary" className="rounded-lg bg-success/10 text-success border-success/20 px-3 py-1.5 text-xs font-medium">
                {k.keyword}
              </Badge>
            ))}
            <button className="text-xs text-primary font-medium hover:underline px-2">+ Add Skills</button>
          </div>

          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
            <XCircle className="size-4 text-destructive" />
            Missing Skills ({data.missingSkills.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.missingSkills.map((s) => (
              <Badge key={s} variant="secondary" className="rounded-lg bg-orange-500/10 text-orange-500 border-orange-500/20 px-3 py-1.5 text-xs font-medium">
                {s}
              </Badge>
            ))}
          </div>
        </Card>
      </div>

      <Card className="rounded-3xl border-border/40 bg-gradient-to-r from-primary/10 to-transparent p-6 backdrop-blur-xl border-primary/20">
        <div className="flex items-start gap-4">
          <div className="size-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
             <Lightbulb className="size-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold">Recommendations</h3>
            <p className="text-muted-foreground text-sm">
              Adding these skills to your resume can increase your match score by up to <span className="text-primary font-bold">35%</span>. 
              We recommend acquiring <span className="text-foreground font-semibold">Docker</span> and <span className="text-foreground font-semibold">Kubernetes</span> if you&apos;re targeting Senior roles.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
