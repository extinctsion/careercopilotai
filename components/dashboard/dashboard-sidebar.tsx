"use client"

import {
  Award,
  Brain,
  LayoutDashboard,
  Lightbulb,
  MessageSquare,
  Users,
  History,
  CreditCard,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/ats-score", label: "ATS Score", icon: Award },
  { href: "/dashboard/skill-gap", label: "Skill Gap", icon: Brain },
  { href: "/dashboard/feedback", label: "AI Feedback", icon: MessageSquare },
  { href: "/dashboard/recommendations", label: "Recommendations", icon: Lightbulb },
  { href: "/dashboard/matched-roles", label: "Matched Roles", icon: Users },
]

const footerItems = [
  { href: "/dashboard/payment", label: "Payment", icon: CreditCard },
  { href: "/dashboard/history", label: "History", icon: History },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "relative flex flex-col border-r border-border/40 bg-card/40 backdrop-blur-xl transition-all duration-300 ease-in-out",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex h-16 items-center border-b border-border/40 px-6">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
            <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
              <span className="text-xl">C</span>
            </div>
            <span className="text-xl text-foreground">CareerCopilot</span>
          </Link>
        )}
        {collapsed && (
          <div className="size-8 rounded-lg bg-primary mx-auto flex items-center justify-center text-primary-foreground">
            <span className="text-xl">C</span>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const Active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                Active
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className={cn("size-5 shrink-0", Active ? "" : "text-muted-foreground group-hover:text-foreground")} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      <div className="space-y-1 p-4 border-t border-border/40">
        {footerItems.map((item) => {
          const Active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                Active
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className={cn("size-5 shrink-0", Active ? "" : "text-muted-foreground group-hover:text-foreground")} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-20 flex size-8 rounded-full border border-border bg-background shadow-sm hover:bg-secondary sm:flex"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
      </Button>

      {!collapsed && (
        <div className="p-4">
          <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-4 border border-primary/10">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Need Help?</p>
            <p className="text-xs text-muted-foreground mb-3">Book a 1:1 career coaching session.</p>
            <Button size="sm" className="w-full rounded-xl">Book Now</Button>
          </div>
        </div>
      )}
    </aside>
  )
}
