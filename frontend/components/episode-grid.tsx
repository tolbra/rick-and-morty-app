"use client"

import { EpisodeCard } from "@/components/episode-card"
import type { Episode } from "@/lib/api"

interface EpisodeGridProps {
  episodes: Episode[]
}

export function EpisodeGrid({ episodes }: EpisodeGridProps) {
  if (episodes.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
        <p className="text-center text-muted-foreground">No episodes found. Try adjusting your search.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {episodes.map((episode) => (
        <EpisodeCard key={episode.id} episode={episode} />
      ))}
    </div>
  )
}
