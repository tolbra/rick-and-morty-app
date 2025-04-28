"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Navbar } from "@/components/navbar"
import { CharacterOfTheDay } from "@/components/character-of-the-day"
import { EpisodeOfTheDay } from "@/components/episode-of-the-day"
import { SearchPage } from "@/components/search-page"
import { AskRick } from "@/components/AskRick"

// таймер рендерится только на клиенте
const CountdownTimer = dynamic(
  () => import("@/components/countdown-timer").then((mod) => mod.CountdownTimer),
  { ssr: false }
)

export default function Home() {

  const [episodeQuestion, setEpisodeQuestion] = useState<string>("")

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Today</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="w-full max-w-sm mx-auto">
              <CharacterOfTheDay />
            </div>
            <div className="w-full max-w-sm mx-auto">
              <CountdownTimer />
            </div>
            <div className="w-full max-w-sm mx-auto">
              <EpisodeOfTheDay onAsk={(q) => setEpisodeQuestion(q)} />
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Characters</h1>
          <p className="text-muted-foreground">
            Explore characters from the Rick and Morty universe.
          </p>
        </div>
        <SearchPage />
        <div id="ask-rick" className="mt-12">
          <AskRick initialQuestion={episodeQuestion} />
        </div>
      </div>
    </main>
  )
}
