"use client"

import { AnimatePresence, motion } from "motion/react"
import { Sparkles } from "lucide-react"
import { useRef, useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { analyzeResume } from "@/actions/analyze"
import { AnalyzingOverlay } from "@/components/analyzing-overlay"
import { FeatureCards } from "@/components/feature-cards"
import { ResumeForm, type ResumeFormValues } from "@/components/resume-form"
import { ResultsView } from "@/components/results/results-view"
import type { Analysis } from "@/types/analysis"
import { analysisStore } from "@/lib/store/analysis-store"

type Status = "idle" | "loading" | "done"

export function Analyzer() {
  const router = useRouter()
  const [status, setStatus] = useState<Status>("idle")
  const [result, setResult] = useState<Analysis | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  async function handleSubmit(values: ResumeFormValues) {
    setStatus("loading")
    const startedAt = Date.now()

    const formData = new FormData()
    formData.set("jobTitle", values.jobTitle)
    formData.set("jobDescription", values.jobDescription)
    formData.set("resume", values.resume)

    const res = await analyzeResume(formData)

    // Let the loading animation breathe for a beat
    const elapsed = Date.now() - startedAt
    if (elapsed < 2200) await new Promise((r) => setTimeout(r, 2200 - elapsed))

    if (!res.ok) {
      toast.error(res.error)
      setStatus("idle")
      return
    }

    analysisStore.setAnalysis(res.data)
    router.push("/dashboard")
  }

  function reset() {
    setResult(null)
    setStatus("idle")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status !== "done" && (
          <motion.section
            key="intro"
            exit={{ opacity: 0, y: -12 }}
            className="mx-auto flex max-w-4xl flex-col items-center px-4 pt-12 pb-10 sm:px-6 sm:pt-16"
          >
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <Sparkles className="size-3.5 text-primary" />
              Powered by Gemini AI
            </div>
            <h1 className="text-center text-4xl font-bold tracking-tight text-balance sm:text-5xl">
              Land More Interviews with AI
            </h1>
            <p className="mt-3 max-w-xl text-center text-base text-muted-foreground text-pretty sm:text-lg">
              Match your resume against any job description and get an instant ATS score, skill gap analysis, and
              recruiter-grade feedback.
            </p>

            <div className="mt-9 w-full">
              {status === "idle" ? (
                <ResumeForm onSubmit={handleSubmit} loading={false} />
              ) : (
                <div className="flex justify-center py-6">
                  <AnalyzingOverlay />
                </div>
              )}
            </div>

            {status === "idle" && (
              <div className="mt-10 w-full">
                <FeatureCards />
              </div>
            )}
          </motion.section>
        )}

        {status === "done" && result && (
          <motion.section
            key="results"
            ref={resultsRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-auto max-w-5xl px-4 pt-10 pb-16 sm:px-6"
          >
            <ResultsView data={result} onReset={reset} />
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  )
}
