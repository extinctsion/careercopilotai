"use client"

import { ArrowRight, Briefcase, FileUp, Loader2, ScrollText } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { FileDropzone } from "@/components/file-dropzone"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

type FormValues = {
  jobTitle: string
  jobDescription: string
}

const MAX_CHARS = 6000

export type ResumeFormValues = FormValues & { resume: File }

type ResumeFormProps = {
  onSubmit: (values: ResumeFormValues) => void
  loading: boolean
}

const cardClass =
  "flex flex-col gap-2.5 rounded-2xl border border-border/70 bg-card/60 p-4 shadow-sm backdrop-blur transition-colors"

export function ResumeForm({ onSubmit, loading }: ResumeFormProps) {
  const [file, setFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { jobTitle: "", jobDescription: "" },
  })

  const description = watch("jobDescription") ?? ""

  const submit = handleSubmit((values) => {
    if (!file) {
      setFileError(true)
      return
    }
    onSubmit({ ...values, resume: file })
  })

  return (
    <form onSubmit={submit} className="w-full">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className={cn(cardClass, "border-0 bg-transparent p-0 shadow-none")}>
          <div className={cardClass}>
            <Label htmlFor="jobTitle" className="flex items-center gap-2 text-sm font-medium">
              <Briefcase className="size-4 text-primary" />
              Job Title
            </Label>
            <Input
              id="jobTitle"
              placeholder="Software Engineer"
              autoComplete="off"
              aria-invalid={!!errors.jobTitle}
              {...register("jobTitle", {
                required: "Enter a job title",
                minLength: { value: 2, message: "Enter a job title" },
              })}
            />
            <p className="min-h-4 text-xs text-destructive">{errors.jobTitle?.message}</p>
          </div>
        </Card>

        <Card className={cn(cardClass, "border-0 bg-transparent p-0 shadow-none md:col-span-2")}>
          <div className={cardClass}>
            <div className="flex items-center justify-between">
              <Label htmlFor="jobDescription" className="flex items-center gap-2 text-sm font-medium">
                <ScrollText className="size-4 text-primary" />
                Job Description
              </Label>
              <span
                className={cn(
                  "text-xs tabular-nums text-muted-foreground",
                  description.length > MAX_CHARS && "text-destructive",
                )}
              >
                {description.length.toLocaleString()} / {MAX_CHARS.toLocaleString()}
              </span>
            </div>
            <Textarea
              id="jobDescription"
              placeholder="Paste the full job description here — responsibilities, requirements, and preferred skills..."
              rows={4}
              maxLength={MAX_CHARS}
              aria-invalid={!!errors.jobDescription}
              className="resize-none"
              {...register("jobDescription", {
                required: "Add a job description",
                minLength: { value: 40, message: "Add a more detailed job description" },
              })}
            />
            <p className="min-h-4 text-xs text-destructive">{errors.jobDescription?.message}</p>
          </div>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <Card className={cn(cardClass, "border-0 bg-transparent p-0 shadow-none md:col-span-2")}>
          <div className={cardClass}>
            <Label className="flex items-center gap-2 text-sm font-medium">
              <FileUp className="size-4 text-primary" />
              Resume
            </Label>
            <FileDropzone
              file={file}
              invalid={fileError && !file}
              onChange={(f) => {
                setFile(f)
                if (f) setFileError(false)
              }}
            />
            <p className="min-h-4 text-xs text-destructive">
              {fileError && !file ? "Please upload your resume." : ""}
            </p>
          </div>
        </Card>

        <div className="flex items-stretch">
          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="h-full w-full rounded-2xl text-base shadow-lg shadow-primary/20"
          >
            {loading ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Analyzing
              </>
            ) : (
              <>
                Analyze Resume
                <ArrowRight className="size-5" />
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  )
}
