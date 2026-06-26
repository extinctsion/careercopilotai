"use client"

import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from "recharts"
import type { Analysis } from "@/types/analysis"

export function SkillGapChart({ data }: { data: Analysis["skillGap"] }) {
  return (
    <div>
      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius="72%">
            <PolarGrid stroke="var(--border)" />
            <PolarAngleAxis
              dataKey="skill"
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
            />
            <Radar
              name="Required"
              dataKey="required"
              stroke="var(--muted-foreground)"
              fill="var(--muted-foreground)"
              fillOpacity={0.12}
              strokeWidth={1.5}
            />
            <Radar
              name="You"
              dataKey="resume"
              stroke="var(--chart-2)"
              fill="var(--chart-2)"
              fillOpacity={0.35}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 flex items-center justify-center gap-5 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full" style={{ background: "var(--chart-2)" }} />
          You
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-muted-foreground" />
          Required
        </span>
      </div>
    </div>
  )
}
