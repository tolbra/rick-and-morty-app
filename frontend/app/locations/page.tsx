import { Navbar } from "@/components/navbar"
import { LocationsPage } from "@/components/location-page"

export default function Locations() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <LocationsPage />
      </div>
    </main>
  )
}
