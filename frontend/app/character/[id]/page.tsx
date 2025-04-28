import { Navbar } from "@/components/navbar"
import { CharacterDetails } from "@/components/character-details"

export default function CharacterPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <CharacterDetails id={params.id} />
      </div>
    </main>
  )
}
