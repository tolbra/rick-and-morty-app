"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, SpaceIcon as Planet, Users } from "lucide-react"
import { getLocation, getResidentsForLocation, type Location, type Character } from "@/lib/api"

interface LocationDetailsProps {
  id: string
}

export function LocationDetails({ id }: LocationDetailsProps) {
  const [location, setLocation] = useState<Location | null>(null)
  const [residents, setResidents] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLocationDetails = async () => {
      setLoading(true)
      setError(null)

      try {
        const locationData = await getLocation(id)
        setLocation(locationData)

        // Fetch residents if there are any
        if (locationData.residents && locationData.residents.length > 0) {
          const residentsData = await getResidentsForLocation(locationData.residents)
          setResidents(residentsData)
        }
      } catch (err) {
        console.error("Failed to fetch location details:", err)
        setError("Failed to load location details. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchLocationDetails()
  }, [id])

  if (loading) {
    return <LocationDetailsSkeleton />
  }

  if (error || !location) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <h2 className="text-2xl font-bold">{error || "Location not found"}</h2>
        <Link href="/locations">
          <Button>Back to locations</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="animate-in fade-in duration-500">
      <Link href="/locations">
        <Button variant="ghost" className="mb-6 gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to locations
        </Button>
      </Link>

      <div className="grid gap-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
            <Planet className="h-12 w-12 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{location.name}</h1>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
              <Badge variant="outline" className="font-normal">
                {location.type || "Unknown Type"}
              </Badge>
              <span className="text-muted-foreground">{location.dimension || "Unknown Dimension"}</span>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Users className="h-5 w-5" />
            <CardTitle>Residents</CardTitle>
          </CardHeader>
          <CardContent>
            {residents.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">No known residents</p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {residents.map((resident) => (
                  <Link key={resident.id} href={`/character/${resident.id}`}>
                    <div className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-accent">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full">
                        <Image
                          src={resident.image || "/placeholder.svg"}
                          alt={resident.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                      <div className="flex-1 truncate">
                        <p className="truncate font-medium">{resident.name}</p>
                        <p className="text-xs text-muted-foreground">{resident.species}</p>
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

function LocationDetailsSkeleton() {
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
