import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function LoadingSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Current Weather Skeleton */}
      <Card className="w-full glassmorphism">
        <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center">
          <div className="space-y-4 flex-grow">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-20 w-1/3" />
          </div>
          <Skeleton className="h-40 w-40 rounded-full" />
        </CardContent>
      </Card>

      {/* Details Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="glassmorphism">
            <CardContent className="p-4 space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-8 w-1/3" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Forecasts Skeleton */}
      <Card className="w-full glassmorphism">
          <CardContent className="p-4">
              <Skeleton className="h-10 w-1/2 mx-auto mb-4" />
              <Skeleton className="h-48 w-full" />
          </CardContent>
      </Card>
    </div>
  );
}
