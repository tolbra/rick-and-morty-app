"use client"

import { useState, useEffect } from "react"
import { SearchBar } from "@/components/search-bar"
import { EpisodeGrid } from "@/components/episode-grid"
import { Pagination } from "@/components/pagination"
import { EpisodeSkeleton } from "@/components/episode-skeleton"
import { getEpisodes, type Episode } from "@/lib/api"

interface EpisodeFilters {
  name?: string
  episode?: string
}

export function EpisodesPage() {
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<EpisodeFilters>({})
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchEpisodes = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await getEpisodes(currentPage, {
          name: searchQuery,
          ...filters,
        })

        setEpisodes(response.results)
        setTotalPages(response.info.pages)
      } catch (err) {
        console.error("Failed to fetch episodes:", err)
        setError("Failed to load episodes. Please try again later.")
        setEpisodes([])
      } finally {
        setLoading(false)
      }
    }

    fetchEpisodes()
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
        <h1 className="text-3xl font-bold tracking-tight">Episodes</h1>
        <p className="text-muted-foreground">Explore episodes from the Rick and Morty series.</p>
      </div>

      <div className="flex flex-col gap-4">
        <SearchBar onSearch={handleSearch} placeholder="Search episodes..." />
      </div>

      {error && (
        <div className="rounded-lg bg-destructive/15 p-4 text-destructive">
          <p>{error}</p>
        </div>
      )}

      {loading ? <EpisodeSkeleton count={20} /> : <EpisodeGrid episodes={episodes} />}

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  )
}
