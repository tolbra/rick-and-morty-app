"use client"

import { useState, useEffect } from "react"
import { SearchBar } from "@/components/search-bar"
import { LocationGrid } from "@/components/location-grid"
import { Pagination } from "@/components/pagination"
import { LocationSkeleton } from "@/components/location-skeleton"
import { getLocations, type Location } from "@/lib/api"

interface LocationFilters {
  name?: string
  type?: string
  dimension?: string
}

export function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<LocationFilters>({})
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await getLocations(currentPage, {
          name: searchQuery,
          ...filters,
        })

        setLocations(response.results)
        setTotalPages(response.info.pages)
      } catch (err) {
        console.error("Failed to fetch locations:", err)
        setError("Failed to load locations. Please try again later.")
        setLocations([])
      } finally {
        setLoading(false)
      }
    }

    fetchLocations()
  }, [searchQuery, filters, currentPage])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1) // Reset to first page on new search
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Locations</h1>
        <p className="text-muted-foreground">Explore the various locations from the Rick and Morty universe.</p>
      </div>

      <div className="flex flex-col gap-4">
        <SearchBar onSearch={handleSearch} placeholder="Search locations..." />
      </div>

      {error && (
        <div className="rounded-lg bg-destructive/15 p-4 text-destructive">
          <p>{error}</p>
        </div>
      )}

      {loading ? <LocationSkeleton count={20} /> : <LocationGrid locations={locations} />}

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  )
}
