import { Analyzer } from "@/components/analyzer"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export default function Home() {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <div
        aria-hidden="true"
        className="bg-grid mask-fade pointer-events-none absolute inset-x-0 top-0 h-[480px] opacity-60"
      />
      <Navbar />
      <main className="relative flex-1">
        <Analyzer />
      </main>
      <Footer />
    </div>
  )
}
