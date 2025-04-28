"use client"

import { useState, useEffect } from "react"
import { SearchBar } from "@/components/search-bar"
import { FilterDropdowns } from "@/components/filter-dropdowns"
import { CharacterGrid } from "@/components/character-grid"
import { Pagination } from "@/components/pagination"
import { CharacterSkeleton } from "@/components/character-skeleton"
import { getCharacters, type Character } from "@/lib/api"

type SearchFilters = {
  status: string
  gender: string
}

export function SearchPage() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<SearchFilters>({ status: "", gender: "" })
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isDrunkMode, setIsDrunkMode] = useState(false)

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true)
      try {
        const response = await getCharacters(currentPage, {
          name: searchQuery,
          status: filters.status,
          gender: filters.gender,
        })
        setCharacters(response.results)
        setTotalPages(response.info.pages)
      } catch (err) {
        console.error("Failed to fetch characters:", err)
        setCharacters([])
      } finally {
        setLoading(false)
      }
    }
    fetchCharacters()
  }, [searchQuery, filters, currentPage])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  const handleFilterChange = (newFilters: SearchFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div
      className={`
        flex flex-col gap-8
        filter transition-filter duration-2000 ease-in-out
        ${isDrunkMode ? "blur-sm animate-drunk" : "blur-0"}
      `}
    >
      <div className="self-end">
        <button
          onClick={() => setIsDrunkMode(prev => !prev)}
          className="px-4 py-2 bg-yellow-400 text-black rounded hover:opacity-90 transition-all"
        >
          {isDrunkMode ? "🛑 Disable Drunk Mode" : "🍻 Activate Drunk Mode"}
        </button>
      </div>
  

      <div className="flex flex-col gap-4">
        <SearchBar onSearch={handleSearch} placeholder="Search characters" />
        <FilterDropdowns filters={filters} onFilterChange={handleFilterChange} />
      </div>
  

      {loading 
        ? <CharacterSkeleton count={20} /> 
        : <CharacterGrid characters={characters} />
      }
  
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
  
}
