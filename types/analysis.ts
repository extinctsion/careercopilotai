import { z } from "zod"

export const recommendationValues = ["Excellent Match", "Moderate Match", "Needs Improvement"] as const

export const careerLevelValues = ["Intern", "Junior", "Mid Level", "Senior", "Lead", "Principal"] as const

export const priorityValues = ["high", "medium", "low"] as const

export const strengthValues = ["strong", "medium", "weak"] as const

export const analysisSchema = z.object({
  atsScore: z.number().min(0).max(100).describe("Overall ATS match score from 0 to 100"),
  recommendation: z.enum(recommendationValues).describe("Overall verdict on the match"),
  careerLevel: z.enum(careerLevelValues).describe("Detected seniority of the candidate"),
  suggestedHeadline: z.string().describe("A polished professional headline the candidate could use"),
  summary: z.string().describe("A concise 2-3 sentence summary of the resume"),
  recruiterInsight: z
    .string()
    .describe("What a recruiter would notice in the first 15 seconds of scanning this resume"),

  strengths: z.array(z.string()).min(3).max(6).describe("Key strengths of the resume for this role"),
  missingSkills: z.array(z.string()).min(3).max(10).describe("Important skills from the job missing in the resume"),
  topMissingKeywords: z.array(z.string()).min(3).max(5).describe("The 5 most impactful missing keywords"),

  keywords: z
    .array(
      z.object({
        keyword: z.string(),
        found: z.boolean(),
      }),
    )
    .min(8)
    .max(18)
    .describe("Important keywords from the job description and whether they appear in the resume"),

  improvements: z
    .array(
      z.object({
        title: z.string(),
        detail: z.string(),
        priority: z.enum(priorityValues),
      }),
    )
    .min(3)
    .max(6)
    .describe("Prioritized, actionable resume improvements"),

  interviewReadiness: z
    .object({
      technical: z.number().min(0).max(100),
      communication: z.number().min(0).max(100),
      leadership: z.number().min(0).max(100),
      problemSolving: z.number().min(0).max(100),
    })
    .describe("Interview readiness ratings across four dimensions"),

  skillGap: z
    .array(
      z.object({
        skill: z.string(),
        resume: z.number().min(0).max(100).describe("Candidate's demonstrated level"),
        required: z.number().min(0).max(100).describe("Level required by the job"),
      }),
    )
    .min(5)
    .max(7)
    .describe("Skill gap comparison for a radar chart"),

  atsChecklist: z
    .array(
      z.object({
        item: z.string(),
        passed: z.boolean(),
      }),
    )
    .min(5)
    .max(8)
    .describe("ATS-friendliness checklist"),

  heatmap: z
    .array(
      z.object({
        section: z.string().describe("Resume section name, e.g. Experience, Skills, Education, Summary"),
        strength: z.enum(strengthValues),
        note: z.string().describe("Short reason for the rating"),
      }),
    )
    .min(4)
    .max(6)
    .describe("Strength rating per resume section"),

  salary: z
    .object({
      min: z.number().describe("Lower bound of estimated annual salary in USD"),
      max: z.number().describe("Upper bound of estimated annual salary in USD"),
      currency: z.string().default("USD"),
    })
    .describe("Estimated salary range based on resume and role"),
})

export type Analysis = z.infer<typeof analysisSchema>
export type Recommendation = (typeof recommendationValues)[number]
export type CareerLevel = (typeof careerLevelValues)[number]
export type Priority = (typeof priorityValues)[number]
export type StrengthLevel = (typeof strengthValues)[number]
