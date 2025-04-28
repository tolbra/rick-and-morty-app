import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface EpisodeSkeletonProps {
  count?: number
}

export function EpisodeSkeleton({ count = 8 }: EpisodeSkeletonProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array(count)
        .fill(null)
        .map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-6 pt-6">
              <div className="mb-4 flex items-center justify-center">
                <Skeleton className="h-16 w-16 rounded-full" />
              </div>
              <Skeleton className="mx-auto h-6 w-3/4 mb-2" />
              <div className="mt-2 flex items-center justify-center gap-2">
                <Skeleton className="h-5 w-24" />
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-center">
              <Skeleton className="h-4 w-32" />
            </CardFooter>
          </Card>
        ))}
    </div>
  )
}
