import { Navbar } from "@/components/navbar"
import { EpisodeDetails } from "@/components/episode-details"

export default function EpisodePage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <EpisodeDetails id={params.id} />
      </div>
    </main>
  )
}
