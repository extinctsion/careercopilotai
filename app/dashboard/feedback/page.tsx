"use client"

import { useSyncExternalStore } from "react"
import { Sparkles, MessageSquare, PlusCircle, CheckCircle2, AlertCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { analysisStore } from "@/lib/store/analysis-store"
import { cn } from "@/lib/utils"

const impactStyles = {
  high: "bg-success/10 text-success border-success/20",
  medium: "bg-warning/10 text-warning border-warning/20",
  low: "bg-secondary/10 text-muted-foreground border-border/40",
}

export default function AIFeedbackPage() {
  const { data } = useSyncExternalStore(
    analysisStore.subscribe,
    analysisStore.getSnapshot,
    () => ({ data: null, setAnalysis: () => {}, clearAnalysis: () => {} })
  )

  if (!data) return null

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI-Powered Feedback</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Personalized suggestions to improve your resume.
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="rounded-xl p-1 bg-card/40 backdrop-blur-xl border border-border/40 mb-8">
          <TabsTrigger value="all" className="rounded-lg px-6">All Feedback</TabsTrigger>
          <TabsTrigger value="content" className="rounded-lg px-6">Content</TabsTrigger>
          <TabsTrigger value="skills" className="rounded-lg px-6">Skills</TabsTrigger>
          <TabsTrigger value="format" className="rounded-lg px-6">Format</TabsTrigger>
          <TabsTrigger value="impact" className="rounded-lg px-6">Impact</TabsTrigger>
        </TabsList>

        <div className="space-y-4">
          {data.improvements.map((imp, i) => (
            <Card key={i} className="rounded-2xl border-border/40 bg-card/40 p-5 backdrop-blur-xl group hover:border-primary/30 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mt-0.5">
                    <Sparkles className="size-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold">{imp.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed italic">&quot;{imp.detail}&quot;</p>
                  </div>
                </div>
                <Badge variant="outline" className={cn("rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider", impactStyles[imp.priority])}>
                  {imp.priority} Impact
                </Badge>
              </div>
            </Card>
          ))}

          {/* Example additional items from mockup */}
          <Card className="rounded-2xl border-border/40 bg-card/40 p-5 backdrop-blur-xl group hover:border-primary/30 transition-colors">
             <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mt-0.5">
                    <CheckCircle2 className="size-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold">Check formatting consistency</p>
                    <p className="text-sm text-muted-foreground leading-relaxed italic">&quot;Ensure consistent formatting for a professional look.&quot;</p>
                  </div>
                </div>
                <Badge variant="outline" className={cn("rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider", impactStyles.low)}>
                  Low Impact
                </Badge>
              </div>
          </Card>
        </div>
      </Tabs>

      <Card className="rounded-3xl border-border/40 bg-card/40 p-1 lg:p-1 overflow-hidden">
         <div className="p-8 bg-gradient-to-br from-primary/5 to-transparent flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-xl font-bold">Apply these changes?</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Our AI can help you rewrite your resume sections to incorporate this feedback automatically.
              </p>
            </div>
            <Button className="rounded-xl px-8 py-6 h-auto text-lg font-bold shadow-lg shadow-primary/20">
              <PlusCircle className="size-5 mr-2" />
              AI Resume Refactor
            </Button>
         </div>
      </Card>
    </div>
  )
}
