import { Navbar } from "@/components/navbar"
import { LocationDetails } from "@/components/location-detalis"

export default function LocationPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <LocationDetails id={params.id} />
      </div>
    </main>
  )
}
