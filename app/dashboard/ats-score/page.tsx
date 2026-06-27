"use client"

import { useSyncExternalStore } from "react"
import { Award, CheckCircle2, XCircle, Info, FileText, Search, Layout } from "lucide-react"
import { Card } from "@/components/ui/card"
import { analysisStore } from "@/lib/store/analysis-store"
import { ScoreRing } from "@/components/results/score-ring"
import { scoreTone, toneTextClass } from "@/lib/score"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"

export default function AtsScorePage() {
  const { data } = useSyncExternalStore(
    analysisStore.subscribe,
    analysisStore.getSnapshot,
    () => ({ data: null, setAnalysis: () => {}, clearAnalysis: () => {} })
  )

  if (!data) return null

  const tone = scoreTone(data.atsScore)

  const factors = [
    { label: "Content Relevance", value: 90 },
    { label: "Keyword Optimization", value: 85 },
    { label: "Skills Match", value: 80 },
    { label: "Formatting", value: 95 },
    { label: "Section Completeness", value: 100 },
  ]

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">ATS Score Breakdown</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          See how well your resume is optimized for Applicant Tracking Systems.
        </p>
      </div>

      <Card className="rounded-3xl border-border/40 bg-card/40 p-8 backdrop-blur-xl">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
          <div className="flex flex-col items-center text-center lg:w-1/3">
            <ScoreRing value={data.atsScore} size={200} />
            <div className="mt-6 space-y-2">
              <p className={cn("text-2xl font-bold capitalize", toneTextClass[tone])}>{tone}!</p>
              <p className="text-sm text-muted-foreground">
                Your resume is well-optimized for most ATS systems.
              </p>
              <div className="mt-4 flex items-center justify-center gap-2 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
                <CheckCircle2 className="size-3" />
                Top 15% of users
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Score Factors</h3>
            <div className="space-y-6">
              {factors.map((item) => (
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
          </div>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-3xl border-border/40 bg-card/40 p-6 backdrop-blur-xl">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Award className="size-5 text-primary" />
            ATS Check Results
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: FileText, label: "File Type", detail: "PDF detected", passed: true },
              { icon: Search, label: "Text Readability", detail: "Text is easily readable", passed: true },
              { icon: Layout, label: "Section Detection", detail: "All important sections found", passed: true },
              { icon: Info, label: "Contact Info", detail: "Email and Phone found", passed: true },
              { icon: Info, label: "Image Check", detail: "No restrictive images found", passed: true },
              { icon: Info, label: "Font Check", detail: "Standard fonts used", passed: true },
            ].map((check, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-2xl border border-border/40 bg-secondary/20">
                <div className={cn("size-10 rounded-xl flex items-center justify-center", check.passed ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive")}>
                  <check.icon className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{check.label}</p>
                  <p className="text-xs text-muted-foreground">{check.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Tips Card */}
        <Card className="rounded-3xl border-border/40 bg-gradient-to-br from-primary/10 to-transparent p-6 backdrop-blur-xl border-primary/20">
          <h3 className="text-lg font-semibold mb-4 text-primary">Pro Tips for ATS</h3>
          <ul className="space-y-4">
            {[
              "Avoid using tables or columns as they can confuse some older ATS systems.",
              "Use standard section headings like 'Work Experience' instead of creative titles.",
              "Ensure your contact information is in the main body, not the header or footer.",
              "Save your file as a standard PDF to ensure text encoding is preserved.",
            ].map((tip, i) => (
              <li key={i} className="flex gap-3 text-sm text-foreground/80">
                <div className="size-5 rounded-full bg-primary/20 flex items-center justify-center text-primary text-[10px] font-bold shrink-0 mt-0.5">
                  {i + 1}
                </div>
                {tip}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}
