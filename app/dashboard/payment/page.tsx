"use client"

import { Check, Zap, Shield, Crown } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for getting started",
      features: ["1 Resume Analysis /month", "Basic ATS Score", "Limited Feedback"],
      icon: Zap,
      cta: "Get Started",
      variant: "outline"
    },
    {
      name: "Pro",
      price: "$9.99",
      description: "For serious job seekers",
      features: ["Unlimited Resume Analysis", "Detailed Skill Gap Analysis", "AI-Powered Feedback", "Download Reports"],
      icon: Shield,
      cta: "Start Free Trial",
      variant: "default",
      popular: true
    },
    {
      name: "Premium",
      price: "$19.99",
      description: "For advanced career growth",
      features: ["Everything in Pro", "Priority Support", "1:1 Career Coaching"],
      icon: Crown,
      cta: "Start Free Trial",
      variant: "outline"
    }
  ]

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Choose Your Plan</h1>
        <p className="text-muted-foreground">Simple, transparent pricing to help you land your dream job.</p>
        <div className="flex items-center justify-center gap-4 mt-6">
           <span className="text-sm font-medium">Monthly</span>
           <div className="w-10 h-6 bg-primary/20 rounded-full flex items-center px-1">
              <div className="size-4 bg-primary rounded-full ml-auto" />
           </div>
           <span className="text-sm font-medium text-muted-foreground">Yearly <span className="text-success">(Save 20%)</span></span>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3 pt-8">
        {plans.map((plan, i) => (
          <Card key={i} className={`relative rounded-3xl border-border/40 bg-card/40 p-8 backdrop-blur-xl flex flex-col items-center text-center transition-all hover:scale-[1.02] ${plan.popular ? 'border-primary/50 shadow-2xl shadow-primary/10 lg:scale-110 lg:z-10 bg-gradient-to-b from-primary/5 to-transparent' : ''}`}>
            {plan.popular && (
              <Badge className="absolute -top-3 bg-primary text-primary-foreground font-bold">MOST POPULAR</Badge>
            )}
            <div className={`size-12 rounded-2xl flex items-center justify-center mb-6 ${plan.popular ? 'bg-primary text-primary-foreground' : 'bg-secondary text-primary'}`}>
               <plan.icon className="size-6" />
            </div>
            <h3 className="text-xl font-bold">{plan.name}</h3>
            <div className="mt-4 flex items-baseline gap-1">
               <span className="text-4xl font-bold">{plan.price}</span>
               <span className="text-sm text-muted-foreground">/month</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
            
            <ul className="mt-8 space-y-4 w-full text-left">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm">
                  <Check className="size-4 text-primary shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button variant={plan.variant as any} className={`mt-10 w-full rounded-2xl py-6 h-auto font-bold tracking-tight ${plan.popular ? 'shadow-lg shadow-primary/20' : ''}`}>
              {plan.cta}
            </Button>
          </Card>
        ))}
      </div>

      <p className="text-center text-xs text-muted-foreground mt-12 pb-8 flex items-center justify-center gap-2">
         <Shield className="size-3" />
         All plans include bank-level security and data privacy.
      </p>
    </div>
  )
}
