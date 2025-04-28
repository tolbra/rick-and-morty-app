"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SpaceIcon as Planet } from "lucide-react"
import type { Location } from "@/lib/api.ts"

interface LocationCardProps {
  location: Location
}

export function LocationCard({ location }: LocationCardProps) {
  return (
    <Link href={`/location/${location.id}`}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-md">
        <CardContent className="p-6 pt-6">
          <div className="mb-4 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Planet className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h3 className="text-center text-xl font-bold line-clamp-1">{location.name}</h3>
          <div className="mt-2 flex flex-col items-center gap-2">
            <Badge variant="outline" className="font-normal">
              {location.type || "Unknown Type"}
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 text-center text-sm text-muted-foreground">
          {location.dimension || "Unknown Dimension"}
        </CardFooter>
      </Card>
    </Link>
  )
}
