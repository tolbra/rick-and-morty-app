"use client"

import { LocationCard } from "@/components/location-card"
import type { Location } from "@/lib/api.ts"

interface LocationGridProps {
  locations: Location[]
}

export function LocationGrid({ locations }: LocationGridProps) {
  if (locations.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
        <p className="text-center text-muted-foreground">No locations found. Try adjusting your search.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {locations.map((location) => (
        <LocationCard key={location.id} location={location} />
      ))}
    </div>
  )
}
