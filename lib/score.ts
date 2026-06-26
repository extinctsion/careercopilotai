export type ScoreTone = "good" | "warn" | "bad"

export function scoreTone(value: number): ScoreTone {
  if (value >= 75) return "good"
  if (value >= 50) return "warn"
  return "bad"
}

/** Returns the CSS color token (var) for a given score tone. */
export function toneColor(tone: ScoreTone): string {
  switch (tone) {
    case "good":
      return "var(--success)"
    case "warn":
      return "var(--warning)"
    case "bad":
      return "var(--destructive)"
  }
}

export const toneTextClass: Record<ScoreTone, string> = {
  good: "text-success",
  warn: "text-warning",
  bad: "text-destructive",
}
