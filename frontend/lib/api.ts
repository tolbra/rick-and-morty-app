export interface Character {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: { name: string; url: string }
  location: { name: string; url: string }
  image: string
  episode: string[]
  url: string
  created: string
}

export interface Location {
  id: number
  name: string
  type: string
  dimension: string
  residents: string[]
  url: string
  created: string
}

export interface Episode {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
  url: string
  created: string
}

export interface PaginatedResponse<T> {
  info: {
    count: number
    pages: number
    next: string | null
    prev: string | null
  }
  results: T[]
}

const API_BASE_URL = "http://localhost:8000"

export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, options)
  if (!res.ok) {
    throw new Error(`Backend error: ${res.status} ${res.statusText}`)
  }
  return res.json() as Promise<T>
}


export async function getCharacters(
  page = 1,
  filters: { name?: string; status?: string; gender?: string } = {}
): Promise<PaginatedResponse<Character>> {
  const params = new URLSearchParams({ page: String(page) })
  if (filters.name)   params.append("name", filters.name)
  if (filters.gender && filters.gender !== "all") {
    params.append("gender", filters.gender)
    }
  if (filters.status && filters.status !== "all") {
    params.append("status", filters.status)
      }
  return fetchApi<PaginatedResponse<Character>>(`/characters?${params}`)
}


export async function getCharacter(id: string): Promise<Character> {
  return fetchApi<Character>(`/character/${id}`)
}


export async function getCharactersByIds(ids: string[]): Promise<Character[]> {
  if (!ids.length) return []
  const joined = ids.join(",")
  const data = await fetchApi<Character[]>(`/characters/${joined}`)
  return Array.isArray(data) ? data : [data]
}


export async function getLocations(
  page = 1,
  filters: { name?: string; type?: string; dimension?: string } = {}
): Promise<PaginatedResponse<Location>> {
  const params = new URLSearchParams({ page: String(page) })
  if (filters.name)      params.append("name", filters.name)
  if (filters.type)      params.append("type", filters.type)
  if (filters.dimension) params.append("dimension", filters.dimension)
  return fetchApi<PaginatedResponse<Location>>(`/locations?${params}`)
}


export async function getLocation(id: string): Promise<Location> {
  return fetchApi<Location>(`/locations/${id}`)
}

export async function getResidentsForLocation(
  residentUrls: string[]
): Promise<Character[]> {
  const ids = residentUrls.map(u => u.split("/").pop()!).filter(Boolean)
  return getCharactersByIds(ids)
}


export async function getEpisodess(
  page = 1,
  filters: { name?: string; episode?: string } = {}
): Promise<PaginatedResponse<Episode>> {
  const params = new URLSearchParams({ page: String(page) })
  if (filters.name)    params.append("name", filters.name)
  if (filters.episode) params.append("episode", filters.episode)
  return fetchApi<PaginatedResponse<Episode>>(`/episodes?${params}`)
}

export async function getEpisodee(id: string): Promise<Episode> {
  return fetchApi<Episode>(`/episodes/${id}`)
}


export async function getCharactersForEpisode(
  characterUrls: string[]
): Promise<Character[]> {
  const ids = characterUrls.map(u => u.split("/").pop()!).filter(Boolean)
  return getCharactersByIds(ids)
}

export async function getEpisodes(
  page = 1,
  filters: { name?: string; episode?: string } = {}
): Promise<PaginatedResponse<Episode>> {
  const params = new URLSearchParams({ page: String(page) })
  if (filters.name)    params.append("name", filters.name)
  if (filters.episode) params.append("episode", filters.episode)
  return fetchApi<PaginatedResponse<Episode>>(`/episodes?${params}`)
}

export async function getEpisode(id: string): Promise<Episode> {
  return fetchApi<Episode>(`/episodes/${id}`)
}
