"use client"

import { useSyncExternalStore } from "react"
import { Users, Briefcase, TrendingUp, ArrowUpRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { analysisStore } from "@/lib/store/analysis-store"

export default function MatchedRolesPage() {
  const { data } = useSyncExternalStore(
    analysisStore.subscribe,
    analysisStore.getSnapshot,
    () => ({ data: null, setAnalysis: () => {}, clearAnalysis: () => {} })
  )

  if (!data) return null

  const mockRoles = [
    {
      title: "Frontend Developer",
      match: 90,
      salary: "$110k - $130k",
      skills: ["React", "JavaScript", "HTML", "CSS"],
    },
    {
      title: "Full Stack Developer",
      match: 85,
      salary: "$120k - $150k",
      skills: ["Node.js", "React", "MongoDB", "Express.js"],
    },
    {
      title: "Software Engineer",
      match: 78,
      salary: "$100k - $140k",
      skills: ["Python", "AWS", "Docker", "SQL"],
    },
    {
      title: "JavaScript Engineer",
      match: 75,
      salary: "$115k - $145k",
      skills: ["Java", "Spring Boot", "React", "MySQL"],
    },
  ]

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Matched Roles</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Top job roles that match your profile and skills.
        </p>
      </div>

      <div className="space-y-4">
        {mockRoles.map((role, i) => (
          <Card key={i} className="rounded-2xl border-border/40 bg-card/40 p-6 backdrop-blur-xl group hover:border-primary/30 transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between md:justify-start gap-4">
                  <h3 className="text-lg font-bold">{role.title}</h3>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-24 bg-secondary/30 rounded-full overflow-hidden">
                      <div className="h-full bg-success transition-all duration-1000" style={{ width: `${role.match}%` }} />
                    </div>
                    <span className="text-xs font-bold text-success">{role.match}% Match</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                   {role.skills.map(skill => (
                     <Badge key={skill} variant="secondary" className="rounded-lg bg-secondary/40 text-muted-foreground px-2 py-1 text-[10px] font-medium">
                       {skill}
                     </Badge>
                   ))}
                </div>
              </div>

              <div className="flex items-center justify-between md:flex-col md:items-end gap-2 md:w-48">
                <div className="space-y-1 md:text-right">
                   <p className="text-sm font-bold text-foreground">{role.salary}</p>
                   <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Est. Salary Range</p>
                </div>
                <Button variant="outline" className="rounded-xl px-4 py-2 h-auto text-xs font-bold border-border/60 hover:bg-primary hover:text-primary-foreground group">
                  View Jobs
                  <ArrowUpRight className="size-3 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="rounded-3xl border-border/40 bg-card/40 p-1 overflow-hidden">
         <div className="p-8 bg-gradient-to-br from-primary/5 to-transparent flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Want better matches?</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Update your resume with the recommended skills to unlock higher-tier roles and better salary packages.
              </p>
            </div>
            <Button className="rounded-xl px-8 py-4 h-auto font-bold shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90">
              Optimize Profile
            </Button>
         </div>
      </Card>
    </div>
  )
}
