import { Gauge, Lightbulb, Radar } from "lucide-react"

const features = [
  {
    icon: Gauge,
    title: "ATS Score",
    description: "See exactly how applicant tracking systems rank your resume against the role.",
  },
  {
    icon: Radar,
    title: "Skill Gap Analysis",
    description: "Visualize where you meet the bar and which skills you still need to highlight.",
  },
  {
    icon: Lightbulb,
    title: "AI Resume Feedback",
    description: "Get prioritized, recruiter-grade suggestions to sharpen every section.",
  },
]

export function FeatureCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {features.map((f) => (
        <div
          key={f.title}
          className="group rounded-2xl border border-border/70 bg-card/40 p-5 transition-colors hover:border-primary/40"
        >
          <span className="mb-3 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <f.icon className="size-5" />
          </span>
          <h3 className="text-sm font-semibold">{f.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground text-pretty">{f.description}</p>
        </div>
      ))}
    </div>
  )
}
