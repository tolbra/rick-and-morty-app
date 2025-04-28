// app/character/[id]/page.tsx

import { Navbar } from "@/components/navbar"
import { CharacterDetails } from "@/components/character-details"

interface PageProps {
  params: {
    id: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function CharacterPage({ params }: PageProps) {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <CharacterDetails id={params.id} />
      </div>
    </main>
  )
}
