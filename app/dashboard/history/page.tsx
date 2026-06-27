"use client"

import { Clock, Download, ExternalLink, Upload } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function HistoryPage() {
  const mockHistory = [
    { file: "Software_Engineer_Resume.pdf", role: "Software Engineer", score: 85, date: "May 15, 2026" },
    { file: "Frontend_Developer_Resume.pdf", role: "Frontend Developer", score: 82, date: "May 10, 2026" },
    { file: "Product_Manager_Resume.pdf", role: "Product Manager", score: 76, date: "May 5, 2026" },
  ]

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analysis History</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            View your previously analyzed resumes.
          </p>
        </div>
        <Button className="rounded-xl gap-2 shadow-lg shadow-primary/20">
          <Upload className="size-4" />
          Upload New
        </Button>
      </div>

      <Card className="rounded-3xl border-border/40 bg-card/40 backdrop-blur-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/40 bg-muted/20">
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">File Name</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Target Role</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">ATS Score</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Analyzed On</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {mockHistory.map((item, i) => (
                <tr key={i} className="hover:bg-secondary/20 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Clock className="size-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{item.file}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{item.role}</td>
                  <td className="px-6 py-4">
                    <Badge variant="secondary" className="rounded-lg bg-success/10 text-success font-bold">
                      {item.score}/100
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{item.date}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                       <Button size="icon" variant="ghost" className="size-8 rounded-lg text-muted-foreground hover:text-primary">
                         <ExternalLink className="size-4" />
                       </Button>
                       <Button size="icon" variant="ghost" className="size-8 rounded-lg text-muted-foreground hover:text-primary">
                         <Download className="size-4" />
                       </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
