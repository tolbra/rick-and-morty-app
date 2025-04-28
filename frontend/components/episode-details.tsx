"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, Film, Users } from "lucide-react"
import { getEpisode, getCharactersForEpisode, type Episode, type Character } from "@/lib/api"

interface EpisodeDetailsProps {
  id: string
}

export function EpisodeDetails({ id }: EpisodeDetailsProps) {
  const [episode, setEpisode] = useState<Episode | null>(null)
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEpisodeDetails = async () => {
      setLoading(true)
      setError(null)

      try {
        const episodeData = await getEpisode(id)
        setEpisode(episodeData)

        // Fetch characters if there are any
        if (episodeData.characters && episodeData.characters.length > 0) {
          const charactersData = await getCharactersForEpisode(episodeData.characters)
          setCharacters(charactersData)
        }
      } catch (err) {
        console.error("Failed to fetch episode details:", err)
        setError("Failed to load episode details. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchEpisodeDetails()
  }, [id])

  if (loading) {
    return <EpisodeDetailsSkeleton />
  }

  if (error || !episode) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <h2 className="text-2xl font-bold">{error || "Episode not found"}</h2>
        <Link href="/episodes">
          <Button>Back to episodes</Button>
        </Link>
      </div>
    )
  }

  // Parse episode code (e.g., "S01E01")
  const episodeCode = episode.episode || ""
  const seasonNumber = episodeCode.substring(1, 3)
  const episodeNumber = episodeCode.substring(4, 6)

  return (
    <div className="animate-in fade-in duration-500">
      <Link href="/episodes">
        <Button variant="ghost" className="mb-6 gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to episodes
        </Button>
      </Link>

      <div className="grid gap-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
            <Film className="h-12 w-12 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{episode.name}</h1>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
              <Badge variant="outline" className="font-normal">
                Season {Number.parseInt(seasonNumber)} Episode {Number.parseInt(episodeNumber)}
              </Badge>
              <span className="text-muted-foreground">{episode.air_date}</span>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Users className="h-5 w-5" />
            <CardTitle>Characters</CardTitle>
          </CardHeader>
          <CardContent>
            {characters.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">No characters found</p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {characters.map((character) => (
                  <Link key={character.id} href={`/character/${character.id}`}>
                    <div className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-accent">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full">
                        <Image
                          src={character.image || "/placeholder.svg"}
                          alt={character.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                      <div className="flex-1 truncate">
                        <p className="truncate font-medium">{character.name}</p>
                        <p className="text-xs text-muted-foreground">{character.species}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function EpisodeDetailsSkeleton() {
  return (
    <div>
      <Skeleton className="mb-6 h-10 w-32" />

      <div className="grid gap-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div>
            <Skeleton className="mx-auto h-9 w-64" />
            <div className="mt-2 flex items-center justify-center gap-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-32" />
            </div>
          </div>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-5 w-32" />
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Array(8)
                .fill(null)
                .map((_, index) => (
                  <Skeleton key={index} className="h-16 w-full rounded-lg" />
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
