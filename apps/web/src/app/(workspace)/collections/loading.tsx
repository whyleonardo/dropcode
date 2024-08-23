"use client"

import { CardSkeleton } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const CollectionsLoading = () => {
  return (
    <div className="flex size-full flex-col gap-8">
      <Skeleton className="h-10 w-[156px] self-end" />

      <div className="flex flex-wrap justify-center gap-8">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  )
}

export default CollectionsLoading
