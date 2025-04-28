import { Navbar } from "@/components/navbar"
import { EpisodesPage } from "@/components/episodes-page"

export default function Episodes() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <EpisodesPage />
      </div>
    </main>
  )
}
