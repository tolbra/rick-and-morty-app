"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { getCharacter, type Character } from "@/lib/api"

function getDayOfYear(date = new Date()): number {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
  
    const diffMs = date.getTime() - startOfYear.getTime();

    return Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
  }



export function CharacterOfTheDay() {
  const [character, setCharacter] = useState<Character | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCharacterOfTheDay = async () => {
      setLoading(true)

      try {

        const today = new Date()
        const dayOfYear = getDayOfYear(today)
        const characterId = (dayOfYear % 826) + 1

        const characterData = await getCharacter(characterId.toString())
        setCharacter(characterData)
      } catch (err) {
        console.error("Failed to fetch character of the day:", err)

        try {
          const fallbackCharacter = await getCharacter("1") 
          setCharacter(fallbackCharacter)
        } catch (fallbackErr) {
          console.error("Failed to fetch fallback character:", fallbackErr)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchCharacterOfTheDay()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "alive":
        return "bg-green-500"
      case "dead":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  if (loading) {
    return (
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-7 w-48" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-32" />
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-[1fr_2fr]">
          <Skeleton className="aspect-square rounded-md" />
          <div className="space-y-4">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-32" />
        </CardFooter>
      </Card>
    )
  }

  if (!character) {
    return null
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary/5">
        <CardTitle>Character of the Day</CardTitle>
        <CardDescription>A new character featured every day</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-6 sm:grid-cols-[1fr_2fr]">
          <div className="relative aspect-square overflow-hidden rounded-md">
            <Image
              src={character.image || "/placeholder.svg"}
              alt={character.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 300px"
              priority
            />
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">{character.name}</h3>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1 font-normal">
                <span className={`inline-block h-2 w-2 rounded-full ${getStatusColor(character.status)}`} />
                {character.status}
              </Badge>
              <span className="text-muted-foreground">
                {character.species} • {character.gender}
              </span>
            </div>
            <div className="grid gap-2">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Origin</p>
                <p>{character.origin.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Last known location</p>
                <p>{character.location.name}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-primary/5 px-6 py-4">
        <Link href={`/character/${character.id}`}>
          <Button>View Full Profile</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

