import { Navbar } from "@/components/navbar"
import { CharacterDetails } from "@/components/character-details"
import type { Metadata } from "next"

interface CharacterPageProps {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: "Character Details",
}

export default function CharacterPage({ params }: CharacterPageProps) {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <CharacterDetails id={params.id} />
      </div>
    </main>
  );
}
