import { extractText, getDocumentProxy } from "unpdf"

/**
 * Extracts plain text from a PDF File on the server.
 * Throws a descriptive error if the file is not a readable PDF.
 */
export async function extractResumeText(file: File): Promise<string> {
  if (file.type !== "application/pdf") {
    throw new Error("Only PDF files are supported.")
  }

  const buffer = new Uint8Array(await file.arrayBuffer())

  let text = ""
  try {
    const pdf = await getDocumentProxy(buffer)
    const result = await extractText(pdf, { mergePages: true })
    text = Array.isArray(result.text) ? result.text.join("\n") : result.text
  } catch {
    throw new Error("We couldn't read this PDF. It may be corrupted or password protected.")
  }

  const cleaned = text.replace(/\s+\n/g, "\n").replace(/[ \t]{2,}/g, " ").trim()

  if (cleaned.length < 50) {
    throw new Error("This PDF appears to be empty or image-based. Please upload a text-based resume.")
  }

  return cleaned
}
