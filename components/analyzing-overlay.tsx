"use client"

import { motion } from "motion/react"
import { Check, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const steps = [
  "Reading Resume",
  "Understanding Job Description",
  "Matching Skills",
  "Finding Missing Keywords",
  "Generating Suggestions",
  "Calculating ATS Score",
]

export function AnalyzingOverlay() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev < steps.length - 1 ? prev + 1 : prev))
    }, 1100)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto w-full max-w-md rounded-3xl border border-border/70 bg-card/70 p-6 shadow-xl backdrop-blur sm:p-8"
    >
      <div className="mb-6 flex items-center gap-3">
        <span className="relative flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Loader2 className="size-5 animate-spin" />
        </span>
        <div>
          <p className="text-sm font-semibold">Analyzing your resume</p>
          <p className="text-xs text-muted-foreground">This usually takes a few seconds</p>
        </div>
      </div>

      <ul className="space-y-1">
        {steps.map((step, i) => {
          const isDone = i < active
          const isCurrent = i === active
          return (
            <li
              key={step}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors",
                isCurrent && "bg-secondary/60",
              )}
            >
              <span
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-full border text-xs transition-colors",
                  isDone && "border-success bg-success text-background",
                  isCurrent && "border-primary text-primary",
                  !isDone && !isCurrent && "border-border text-muted-foreground",
                )}
              >
                {isDone ? (
                  <Check className="size-3.5" />
                ) : isCurrent ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <span className="size-1.5 rounded-full bg-current" />
                )}
              </span>
              <span
                className={cn(
                  "text-sm transition-colors",
                  isDone || isCurrent ? "font-medium text-foreground" : "text-muted-foreground",
                )}
              >
                {step}
              </span>
            </li>
          )
        })}
      </ul>
    </motion.div>
  )
}
