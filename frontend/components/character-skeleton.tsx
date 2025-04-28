import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

interface CharacterSkeletonProps {
  count?: number
}

export function CharacterSkeleton({ count = 8 }: CharacterSkeletonProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array(count)
        .fill(null)
        .map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <Skeleton className="aspect-square" />
            <CardContent className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <div className="flex items-center gap-2 mt-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-20" />
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  )
}
