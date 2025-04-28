"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FilterDropdownsProps {
  filters: {
    status: string
    gender: string
  }
  onFilterChange: (filters: { status: string; gender: string }) => void
}

export function FilterDropdowns({ filters, onFilterChange }: FilterDropdownsProps) {
  const handleStatusChange = (value: string) => {
    onFilterChange({ ...filters, status: value })
  }

  const handleGenderChange = (value: string) => {
    onFilterChange({ ...filters, gender: value })
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 sm:flex-row">
      <div className="flex-1">
        <Select value={filters.status} onValueChange={handleStatusChange}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="alive">Alive</SelectItem>
            <SelectItem value="dead">Dead</SelectItem>
            <SelectItem value="unknown">Unknown</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1">
        <Select value={filters.gender} onValueChange={handleGenderChange}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genders</SelectItem>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="genderless">Genderless</SelectItem>
            <SelectItem value="unknown">Unknown</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
