"use client"

import { motion } from "motion/react"
import {
  Award,
  BadgeCheck,
  Brain,
  CheckCircle2,
  ClipboardCheck,
  Copy,
  DollarSign,
  Eye,
  FileText,
  Flame,
  KeyRound,
  ListChecks,
  RotateCcw,
  Sparkles,
  Target,
  TrendingUp,
  XCircle,
} from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScoreRing } from "@/components/results/score-ring"
import { SectionCard } from "@/components/results/section-card"
import { SkillGapChart } from "@/components/results/skill-gap-chart"
import { scoreTone, toneColor, toneTextClass } from "@/lib/score"
import { cn } from "@/lib/utils"
import type { Analysis, Priority, Recommendation, StrengthLevel } from "@/types/analysis"

const recommendationStyles: Record<Recommendation, { tone: string; ring: string }> = {
  "Excellent Match": { tone: "text-success", ring: "border-success/40 bg-success/10" },
  "Moderate Match": { tone: "text-warning", ring: "border-warning/40 bg-warning/10" },
  "Needs Improvement": { tone: "text-destructive", ring: "border-destructive/40 bg-destructive/10" },
}

const priorityStyles: Record<Priority, string> = {
  high: "bg-destructive/10 text-destructive",
  medium: "bg-warning/10 text-warning",
  low: "bg-success/10 text-success",
}

const strengthStyles: Record<StrengthLevel, { label: string; class: string }> = {
  strong: { label: "Strong", class: "bg-success/10 text-success border-success/30" },
  medium: { label: "Medium", class: "bg-warning/10 text-warning border-warning/30" },
  weak: { label: "Weak", class: "bg-destructive/10 text-destructive border-destructive/30" },
}

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
}

function StatBar({ label, value }: { label: string; value: number }) {
  const tone = scoreTone(value)
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className={cn("font-semibold tabular-nums", toneTextClass[tone])}>{value}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full"
          style={{ background: toneColor(tone) }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

export function ResultsView({ data, onReset }: { data: Analysis; onReset: () => void }) {
  const [checklist, setChecklist] = useState(data.atsChecklist.map((c) => c.passed))
  const rec = recommendationStyles[data.recommendation]

  const copyKeyword = (keyword: string) => {
    navigator.clipboard?.writeText(keyword)
    toast.success(`Copied "${keyword}"`)
  }

  const salaryFmt = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: data.salary.currency || "USD", maximumFractionDigits: 0 }).format(n)

  return (
    <motion.div initial="initial" animate="animate" className="space-y-4">
      {/* Header / hero result */}
      <motion.div variants={fadeUp} transition={{ duration: 0.4 }}>
        <Card className="overflow-hidden rounded-3xl border-border/70 bg-card/60 p-0 backdrop-blur">
          <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8">
            <div className="flex justify-center sm:justify-start">
              <ScoreRing value={data.atsScore} />
            </div>
            <div className="flex-1 space-y-3 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-semibold", rec.ring, rec.tone)}>
                  <Award className="size-4" />
                  {data.recommendation}
                </span>
                <Badge variant="secondary" className="gap-1.5">
                  <TrendingUp className="size-3.5" />
                  {data.careerLevel}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Suggested headline</p>
                <p className="text-lg font-semibold text-balance">{data.suggestedHeadline}</p>
              </div>
            </div>
            <div className="flex sm:flex-col sm:justify-center">
              <Button variant="outline" onClick={onReset} className="w-full rounded-xl sm:w-auto">
                <RotateCcw className="size-4" />
                New analysis
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Summary + Recruiter insight */}
      <div className="grid gap-4 lg:grid-cols-2">
        <motion.div variants={fadeUp} transition={{ duration: 0.4 }}>
          <SectionCard icon={FileText} title="Resume Summary">
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{data.summary}</p>
          </SectionCard>
        </motion.div>
        <motion.div variants={fadeUp} transition={{ duration: 0.4 }}>
          <SectionCard icon={Eye} title="Recruiter Insight" description="First 15 seconds">
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{data.recruiterInsight}</p>
          </SectionCard>
        </motion.div>
      </div>

      {/* Strengths + Missing skills */}
      <div className="grid gap-4 lg:grid-cols-2">
        <motion.div variants={fadeUp} transition={{ duration: 0.4 }}>
          <SectionCard icon={CheckCircle2} title="Strengths">
            <ul className="space-y-2.5">
              {data.strengths.map((s) => (
                <li key={s} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                  <span className="text-pretty">{s}</span>
                </li>
              ))}
            </ul>
          </SectionCard>
        </motion.div>
        <motion.div variants={fadeUp} transition={{ duration: 0.4 }}>
          <SectionCard icon={Target} title="Missing Skills">
            <div className="flex flex-wrap gap-2">
              {data.missingSkills.map((s) => (
                <span
                  key={s}
                  className="rounded-lg border border-destructive/30 bg-destructive/10 px-2.5 py-1 text-sm font-medium text-destructive"
                >
                  {s}
                </span>
              ))}
            </div>
          </SectionCard>
        </motion.div>
      </div>

      {/* Skill gap radar + Interview readiness */}
      <div className="grid gap-4 lg:grid-cols-2">
        <motion.div variants={fadeUp} transition={{ duration: 0.4 }}>
          <SectionCard icon={Brain} title="Skill Gap" description="You vs. role requirements">
            <SkillGapChart data={data.skillGap} />
          </SectionCard>
        </motion.div>
        <motion.div variants={fadeUp} transition={{ duration: 0.4 }}>
          <SectionCard icon={BadgeCheck} title="Interview Readiness">
            <div className="space-y-4 pt-1">
              <StatBar label="Technical Skills" value={data.interviewReadiness.technical} />
              <StatBar label="Communication" value={data.interviewReadiness.communication} />
              <StatBar label="Leadership" value={data.interviewReadiness.leadership} />
              <StatBar label="Problem Solving" value={data.interviewReadiness.problemSolving} />
            </div>
          </SectionCard>
        </motion.div>
      </div>

      {/* Keyword match */}
      <motion.div variants={fadeUp} transition={{ duration: 0.4 }}>
        <SectionCard icon={KeyRound} title="Keyword Match" description="Found vs. missing in your resume">
          <div className="flex flex-wrap gap-2">
            {data.keywords.map((k) => (
              <span
                key={k.keyword}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
                  k.found
                    ? "border-success/30 bg-success/10 text-success"
                    : "border-destructive/30 bg-destructive/10 text-destructive",
                )}
              >
                {k.found ? <CheckCircle2 className="size-3.5" /> : <XCircle className="size-3.5" />}
                {k.keyword}
              </span>
            ))}
          </div>
        </SectionCard>
      </motion.div>

      {/* Top missing keywords (clickable) */}
      <motion.div variants={fadeUp} transition={{ duration: 0.4 }}>
        <SectionCard icon={Sparkles} title="Top 5 Missing Keywords" description="Click to copy into your resume">
          <div className="flex flex-wrap gap-2">
            {data.topMissingKeywords.map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => copyKeyword(k)}
                className="group inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                {k}
                <Copy className="size-3.5 opacity-60 transition-opacity group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </SectionCard>
      </motion.div>

      {/* Improvements */}
      <motion.div variants={fadeUp} transition={{ duration: 0.4 }}>
        <SectionCard icon={ListChecks} title="Resume Improvements" description="Prioritized and actionable">
          <ul className="space-y-3">
            {data.improvements.map((imp) => (
              <li key={imp.title} className="flex gap-3 rounded-xl border border-border/60 bg-secondary/30 p-3">
                <span className={cn("h-fit rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide", priorityStyles[imp.priority])}>
                  {imp.priority}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium">{imp.title}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground text-pretty">{imp.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </motion.div>

      {/* Heatmap + ATS checklist */}
      <div className="grid gap-4 lg:grid-cols-2">
        <motion.div variants={fadeUp} transition={{ duration: 0.4 }}>
          <SectionCard icon={Flame} title="Resume Heatmap" description="Strength by section">
            <ul className="space-y-2">
              {data.heatmap.map((h) => {
                const s = strengthStyles[h.strength]
                return (
                  <li key={h.section} className="flex items-center justify-between gap-3 rounded-lg border border-border/60 px-3 py-2">
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{h.section}</p>
                      <p className="truncate text-xs text-muted-foreground">{h.note}</p>
                    </div>
                    <span className={cn("shrink-0 rounded-full border px-2 py-0.5 text-xs font-semibold", s.class)}>
                      {s.label}
                    </span>
                  </li>
                )
              })}
            </ul>
          </SectionCard>
        </motion.div>

        <motion.div variants={fadeUp} transition={{ duration: 0.4 }}>
          <SectionCard icon={ClipboardCheck} title="ATS Checklist" description="Check off as you fix them">
            <ul className="space-y-1">
              {data.atsChecklist.map((c, i) => (
                <li key={c.item}>
                  <button
                    type="button"
                    onClick={() => setChecklist((prev) => prev.map((v, idx) => (idx === i ? !v : v)))}
                    className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-secondary/50"
                  >
                    <span
                      className={cn(
                        "flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors",
                        checklist[i] ? "border-success bg-success text-background" : "border-border",
                      )}
                    >
                      {checklist[i] && <CheckCircle2 className="size-3.5" />}
                    </span>
                    <span className={cn("text-sm", checklist[i] ? "text-muted-foreground line-through" : "")}>
                      {c.item}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </SectionCard>
        </motion.div>
      </div>

      {/* Salary insight */}
      <motion.div variants={fadeUp} transition={{ duration: 0.4 }}>
        <SectionCard icon={DollarSign} title="Salary Insight" description="Estimated range for this role & level">
          <div className="flex flex-col items-center gap-2 py-2 sm:flex-row sm:justify-between">
            <p className="text-3xl font-bold tracking-tight">
              {salaryFmt(data.salary.min)} <span className="text-muted-foreground">–</span> {salaryFmt(data.salary.max)}
            </p>
            <Badge variant="secondary" className="gap-1.5">
              <TrendingUp className="size-3.5" />
              {data.careerLevel}
            </Badge>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Estimate based on the role, detected seniority, and your resume. Actual compensation varies by location and company.
          </p>
        </SectionCard>
      </motion.div>
    </motion.div>
  )
}
