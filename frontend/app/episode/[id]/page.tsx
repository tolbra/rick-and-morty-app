// app/episode/[id]/page.tsx

import { Navbar } from "@/components/navbar"
import { EpisodeDetails } from "@/components/episode-details"

interface PageProps {
  params: {
    id: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function EpisodePage({ params }: PageProps) {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <EpisodeDetails id={params.id} />
      </div>
    </main>
  )
}
