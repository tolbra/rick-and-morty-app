"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Film } from "lucide-react"
import { getEpisode, type Episode } from "@/lib/api"

function getDayOfYear(date = new Date()): number {
  const start = new Date(date.getFullYear(), 0, 1)
  return Math.floor((date.getTime() - start.getTime()) / 86400000) + 1
}

interface EpisodeOfTheDayProps {
  onAsk: (question: string) => void
}

export function EpisodeOfTheDay({ onAsk }: EpisodeOfTheDayProps) {
  const [ep, setEp] = useState<Episode | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const day = getDayOfYear()
        const id = (day % 51) + 1
        setEp(await getEpisode(String(id)))
      } catch {
        setEp(await getEpisode("1"))
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading || !ep) {
    return (
      <Card className="h-full overflow-hidden">
        {/* сюда можно вставить Skeleton */}
      </Card>
    )
  }

  const season = parseInt(ep.episode.slice(1, 3), 10)
  const num    = parseInt(ep.episode.slice(4, 6), 10)

  const handleAskClick = () => {
    onAsk(`What is the episode "${ep.name}" about?`)
  }

  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="bg-primary/5">
        <CardTitle>Episode of the Day</CardTitle>
        <CardDescription>Featured every day</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Film className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-center">{ep.name}</h3>
        <div className="flex justify-center">
          <Badge variant="outline">
            Season {season} • Episode {num}
          </Badge>
        </div>
        <div className="text-center text-muted-foreground">
          Air Date: {ep.air_date}
        </div>
        <p className="text-center text-sm">
          {ep.characters.length} characters
        </p>
      </CardContent>
      <CardFooter className="bg-primary/5 px-6 py-4 flex gap-2">
        <Link href={`/episode/${ep.id}`}>
          <Button>View Details</Button>
        </Link>
        <Button variant="outline" onClick={handleAskClick}>
          Ask Rick!
        </Button>
      </CardFooter>
    </Card>
  )
}
