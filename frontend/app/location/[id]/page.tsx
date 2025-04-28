// app/location/[id]/page.tsx

import { Navbar } from "@/components/navbar"
import { LocationDetails } from "@/components/location-detalis"

interface PageProps {
  params: {
    id: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function LocationPage({ params }: PageProps) {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <LocationDetails id={params.id} />
      </div>
    </main>
  )
}
