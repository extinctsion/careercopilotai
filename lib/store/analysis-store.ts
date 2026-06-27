import type { Analysis } from "@/types/analysis"

type AnalysisState = {
  data: Analysis | null
  setAnalysis: (data: Analysis) => void
  clearAnalysis: () => void
}

let state: AnalysisState = {
  data: null,
  setAnalysis: (data) => {
    state.data = data
    notify()
  },
  clearAnalysis: () => {
    state.data = null
    notify()
  },
}

const listeners = new Set<() => void>()
const notify = () => listeners.forEach((l) => l())

export const analysisStore = {
  getSnapshot: () => state,
  subscribe: (listener: () => void) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  setAnalysis: (data: Analysis) => state.setAnalysis(data),
  clearAnalysis: () => state.clearAnalysis(),
}
