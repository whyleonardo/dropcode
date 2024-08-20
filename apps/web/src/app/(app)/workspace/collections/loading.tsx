"use client"

import { CardSkeleton } from "@/components/ui/card"

const CollectionsLoading = () => {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-wrap justify-start gap-4 px-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  )
}

export default CollectionsLoading
