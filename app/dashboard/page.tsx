"use client"

import { useSyncExternalStore, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Download,
  Upload,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Brain,
  MessageSquare,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { analysisStore } from "@/lib/store/analysis-store"
import { ScoreRing } from "@/components/results/score-ring"
import { scoreTone, toneTextClass, toneColor } from "@/lib/score"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"

export default function DashboardPage() {
  const router = useRouter()
  const { data } = useSyncExternalStore(
    analysisStore.subscribe,
    analysisStore.getSnapshot,
    () => ({ data: null, setAnalysis: () => {}, clearAnalysis: () => {} })
  )

  useEffect(() => {
    if (!data) {
      // For now, if no data, redirect to home or show error
      // In a real app, we might fetch from a DB
      // router.push("/")
    }
  }, [data, router])

  if (!data) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center space-y-4">
        <div className="size-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-muted-foreground font-medium">Loading your analysis...</p>
      </div>
    )
  }

  const tone = scoreTone(data.atsScore)

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resume Overview</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Here&apos;s how your resume performed for this role.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl border-border/40 gap-2">
            <Download className="size-4" />
            Download Report
          </Button>
          <Button className="rounded-xl gap-2" onClick={() => router.push("/")}>
            <Upload className="size-4" />
            Upload New
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* ATS Score Card */}
        <Card className="col-span-1 rounded-3xl border-border/40 bg-card/40 p-8 backdrop-blur-xl flex flex-col items-center text-center">
          <h3 className="text-lg font-semibold mb-6">ATS Score</h3>
          <ScoreRing value={data.atsScore} size={180} />
          <div className="mt-6 space-y-2">
            <p className={cn("text-xl font-bold capitalize", toneTextClass[tone])}>{tone} Match</p>
            <p className="text-sm text-muted-foreground text-balance px-4">
              Your resume is well-optimized for most ATS systems.
            </p>
          </div>
          <Button variant="link" className="mt-4 text-primary font-medium" onClick={() => router.push("/dashboard/ats-score")}>
            View Details →
          </Button>
        </Card>

        {/* Strengths & Improvements */}
        <div className="col-span-2 space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <Card className="rounded-3xl border-border/40 bg-card/40 p-6 backdrop-blur-xl">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2 mb-4">
                <CheckCircle2 className="size-4 text-success" />
                Top Strengths
              </h3>
              <ul className="space-y-3">
                {data.strengths.slice(0, 4).map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                    <span className="text-foreground/80">{s}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="rounded-3xl border-border/40 bg-card/40 p-6 backdrop-blur-xl">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2 mb-4">
                <XCircle className="size-4 text-destructive" />
                Areas to Improve
              </h3>
              <ul className="space-y-3">
                {data.improvements.slice(0, 4).map((imp, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <XCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
                    <span className="text-foreground/80">{imp.title}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Score Breakdown */}
          <Card className="rounded-3xl border-border/40 bg-card/40 p-6 backdrop-blur-xl">
            <h3 className="text-lg font-semibold mb-6">Score Breakdown</h3>
            <div className="space-y-6">
              {[
                { label: "Content Relevance", value: 90 },
                { label: "Keyword Optimization", value: 85 },
                { label: "Skills Match", value: 80 },
                { label: "Formatting", value: 95 },
              ].map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span>{item.value}/100</span>
                  </div>
                  <div className="h-2 w-full bg-secondary/30 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Next Steps */}
      <div className="grid gap-6 sm:grid-cols-3">
        <h3 className="col-span-full text-xl font-bold mt-4">Next Steps</h3>
        <NextStepCard
          icon={Brain}
          title="View detailed skill gap"
          description="Find missing skills for your target role"
          onClick={() => router.push("/dashboard/skill-gap")}
        />
        <NextStepCard
          icon={MessageSquare}
          title="Get AI Feedback"
          description="Personalized suggestions to improve"
          onClick={() => router.push("/dashboard/feedback")}
        />
        <NextStepCard
          icon={Users}
          title="See Matched Roles"
          description="Explore jobs that match your profile"
          onClick={() => router.push("/dashboard/matched-roles")}
        />
      </div>
    </div>
  )
}

function NextStepCard({ icon: Icon, title, description, onClick }: { icon: any, title: string, description: string, onClick: () => void }) {
  return (
    <Card
      className="rounded-2xl border-border/40 bg-card/40 p-5 backdrop-blur-xl hover:bg-secondary/20 transition-colors cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <Icon className="size-5" />
        </div>
        <div className="flex-1 space-y-1">
          <p className="font-semibold text-sm flex items-center justify-between">
            {title}
            <ArrowRight className="size-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
    </Card>
  )
}
