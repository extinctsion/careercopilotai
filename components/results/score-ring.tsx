"use client"

import { animate, motion, useMotionValue, useTransform } from "motion/react"
import { useEffect } from "react"
import { scoreTone, toneColor } from "@/lib/score"
import { cn } from "@/lib/utils"

type ScoreRingProps = {
  value: number
  size?: number
  stroke?: number
  className?: string
}

export function ScoreRing({ value, size = 168, stroke = 12, className }: ScoreRingProps) {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const tone = scoreTone(value)
  const color = toneColor(tone)

  const progress = useMotionValue(0)
  const dashOffset = useTransform(progress, (p) => circumference - (p / 100) * circumference)
  const rounded = useTransform(progress, (p) => Math.round(p))

  useEffect(() => {
    const controls = animate(progress, value, { duration: 1.2, ease: "easeOut" })
    return controls.stop
  }, [value, progress])

  return (
    <div className={cn("relative", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--muted)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ strokeDashoffset: dashOffset }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span className="text-4xl font-bold tabular-nums" style={{ color }}>
          {rounded}
        </motion.span>
        <span className="text-xs font-medium text-muted-foreground">ATS Match</span>
      </div>
    </div>
  )
}
