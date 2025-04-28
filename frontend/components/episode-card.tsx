"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Film } from "lucide-react"
import type { Episode } from "@/lib/api"

interface EpisodeCardProps {
  episode: Episode
}

export function EpisodeCard({ episode }: EpisodeCardProps) {
  // Parse episode code (e.g., "S01E01")
  const episodeCode = episode.episode || ""
  const seasonNumber = episodeCode.substring(1, 3)
  const episodeNumber = episodeCode.substring(4, 6)

  return (
    <Link href={`/episode/${episode.id}`}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-md">
        <CardContent className="p-6 pt-6">
          <div className="mb-4 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Film className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h3 className="text-center text-xl font-bold line-clamp-1">{episode.name}</h3>
          <div className="mt-2 flex flex-col items-center gap-2">
            <Badge variant="outline" className="font-normal">
              S{seasonNumber} E{episodeNumber}
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 text-center text-sm text-muted-foreground">
          {episode.air_date || "Unknown air date"}
        </CardFooter>
      </Card>
    </Link>
  )
}
