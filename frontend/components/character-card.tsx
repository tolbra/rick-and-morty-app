"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Character {
  id: number
  name: string
  status: string
  species: string
  image: string
}

interface CharacterCardProps {
  character: Character
}

export function CharacterCard({ character }: CharacterCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "alive":
        return "bg-green-500"
      case "dead":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Link href={`/character/${character.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={character.image || "/placeholder.svg"}
            alt={character.name}
            fill
            className="object-cover transition-transform hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-bold line-clamp-1 text-lg">{character.name}</h3>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="flex items-center gap-1 font-normal">
              <span className={`inline-block h-2 w-2 rounded-full ${getStatusColor(character.status)}`} />
              {character.status}
            </Badge>
            <span className="text-sm text-muted-foreground">{character.species}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
