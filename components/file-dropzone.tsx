"use client"

import { FileText, UploadCloud, X } from "lucide-react"
import { useCallback, useRef, useState } from "react"
import { cn } from "@/lib/utils"

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

type FileDropzoneProps = {
  file: File | null
  onChange: (file: File | null) => void
  invalid?: boolean
}

export function FileDropzone({ file, onChange, invalid }: FileDropzoneProps) {
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const validateAndSet = useCallback(
    (incoming: File | undefined) => {
      setError(null)
      if (!incoming) return
      if (incoming.type !== "application/pdf") {
        setError("Only PDF files are supported.")
        return
      }
      if (incoming.size > 8 * 1024 * 1024) {
        setError("File must be under 8MB.")
        return
      }
      onChange(incoming)
    },
    [onChange],
  )

  return (
    <div className="space-y-2">
      {file ? (
        <div className="flex items-center gap-3 rounded-xl border border-border bg-secondary/50 p-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <FileText className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{file.name}</p>
            <p className="text-xs text-muted-foreground">{formatSize(file.size)} · PDF</p>
          </div>
          <button
            type="button"
            onClick={() => {
              onChange(null)
              if (inputRef.current) inputRef.current.value = ""
            }}
            className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
            aria-label="Remove file"
          >
            <X className="size-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragging(false)
            validateAndSet(e.dataTransfer.files?.[0])
          }}
          className={cn(
            "flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-7 text-center transition-colors",
            dragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-secondary/40",
            (invalid || error) && "border-destructive/60",
          )}
        >
          <span
            className={cn(
              "flex size-11 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors",
              dragging && "bg-primary/10 text-primary",
            )}
          >
            <UploadCloud className="size-5" />
          </span>
          <span className="text-sm font-medium">
            Drop your resume or <span className="text-primary">browse</span>
          </span>
          <span className="text-xs text-muted-foreground">PDF only · max 8MB</span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="sr-only"
        onChange={(e) => validateAndSet(e.target.files?.[0])}
      />

      {error && <p className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  )
}
