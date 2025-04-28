"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft } from "lucide-react"
import { getCharacter, type Character, type Episode, fetchApi} from "@/lib/api"

interface CharacterDetailsProps {
  id: string
}

export function CharacterDetails({ id }: CharacterDetailsProps) {
  const [character, setCharacter] = useState<Character | null>(null)
  const [loading, setLoading] = useState(true)
  const [episodeNames, setEpisodeNames] = useState<string[]>([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const char = await getCharacter(id)
        setCharacter(char)
        const epsIds = char.episode
          .map((url) => url.split("/").pop())
          .filter((x): x is string => !!x)

        if (epsIds.length) {
          const res = await fetchApi<Episode[]>(`/episodes/${epsIds.join(",")}`)
          const epsArray = Array.isArray(res) ? res : [res]
          setEpisodeNames(epsArray.map((e) => e.name))
        }
      } catch (err) {
        console.error("Failed to fetch character or episodes:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "alive": return "bg-green-500"
      case "dead":  return "bg-red-500"
      default:      return "bg-gray-500"
    }
  }

  if (loading) {
    return <CharacterDetailsSkeleton />
  }
  if (!character) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <h2 className="text-2xl font-bold">Character not found</h2>
        <Link href="/">
          <Button>Back to search</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="animate-in fade-in duration-500">
      <Link href="/">
        <Button variant="ghost" className="mb-6 gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to search
        </Button>
      </Link>

      <div className="grid gap-8 md:grid-cols-[300px_1fr]">
        <div className="relative aspect-square overflow-hidden rounded-xl">
          <Image
            src={character.image || "/placeholder.svg"}
            alt={character.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 300px"
            priority
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{character.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1 font-normal">
                <span
                  className={`inline-block h-2 w-2 rounded-full ${getStatusColor(
                    character.status
                  )}`}
                />
                {character.status}
              </Badge>
              <span className="text-muted-foreground">
                {character.species} • {character.gender}
              </span>
            </div>
          </div>

          <Card>
            <CardContent className="grid gap-4 p-6 sm:grid-cols-2">
              <div>
                <h3 className="mb-2 text-sm font-medium text-muted-foreground">Origin</h3>
                <p>{character.origin.name}</p>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                  Last known location
                </h3>
                <p>{character.location.name}</p>
              </div>
            </CardContent>
          </Card>

          <div>
            <h3 className="mb-3 text-lg font-medium">Episodes</h3>
            {episodeNames.length === 0 ? (
              <p className="text-muted-foreground">No episodes found</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {episodeNames.map((name, idx) => (
                  <Badge key={idx} variant="secondary">
                    {name}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function CharacterDetailsSkeleton() {
  return (
    <div>
      <Skeleton className="mb-6 h-10 w-32" />
      {/* … */}
    </div>
  )
}
