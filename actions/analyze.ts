"use server"

import { generateObject } from "ai"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { extractResumeText } from "@/lib/pdf"
import { analysisSchema, type Analysis } from "@/types/analysis"

export type AnalyzeResult = { ok: true; data: Analysis } | { ok: false; error: string }

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || undefined,
})

const model = google("gemini-2.5-flash")

export async function analyzeResume(formData: FormData): Promise<AnalyzeResult> {
  const jobTitle = String(formData.get("jobTitle") ?? "").trim()
  const jobDescription = String(formData.get("jobDescription") ?? "").trim()
  const file = formData.get("resume")

  // Validation
  if (!jobTitle) return { ok: false, error: "Please enter a job title." }
  if (jobDescription.length < 40) return { ok: false, error: "Please provide a longer job description." }
  if (!(file instanceof File) || file.size === 0) return { ok: false, error: "Please upload your resume PDF." }
  if (file.type !== "application/pdf") return { ok: false, error: "Only PDF resumes are supported." }
  if (file.size > 8 * 1024 * 1024) return { ok: false, error: "Resume must be under 8MB." }

  let resumeText: string
  try {
    resumeText = await extractResumeText(file)
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Failed to read the PDF." }
  }

  try {
    const { object } = await generateObject({
      model: model,
      schema: analysisSchema,
      system:
        "You are an expert technical recruiter and ATS (Applicant Tracking System) specialist. " +
        "You analyze how well a candidate's resume matches a specific job posting. " +
        "Be precise, honest, and constructive. Base every assessment strictly on the provided resume text and job description. " +
        "Never invent experience the candidate does not have. Scores must reflect genuine alignment.",
      prompt:
        `Analyze the following resume against the target role and return a complete structured analysis.\n\n` +
        `TARGET JOB TITLE:\n${jobTitle}\n\n` +
        `JOB DESCRIPTION:\n${jobDescription}\n\n` +
        `RESUME TEXT:\n${resumeText}\n\n` +
        `Provide an accurate ATS match score, keyword analysis (mark each keyword found or missing based on the resume text), ` +
        `skill gaps, prioritized improvements, interview readiness, a section heatmap, recruiter insight, a suggested headline, ` +
        `detected career level, and a realistic USD salary range for this role and seniority.`,
    })

    return { ok: true, data: object }
  } catch (err) {
    console.log("[v0] analyzeResume error:", err instanceof Error ? err.message : err)
    const message = err instanceof Error ? err.message : "AI analysis failed."
    if (/rate|quota|429/i.test(message)) {
      return { ok: false, error: "The AI service is busy right now. Please try again in a moment." }
    }
    return { ok: false, error: "We couldn't complete the analysis. Please try again." }
  }
}
