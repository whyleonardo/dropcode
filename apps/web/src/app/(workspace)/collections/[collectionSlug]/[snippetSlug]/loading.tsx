"use client"

import { Skeleton } from "@/components/ui/skeleton"

const SnippetSlugLoading = () => {
  return (
    <div className="bg-background flex size-full items-center justify-center">
      <Skeleton className="h-4 w-[156px]" />
    </div>
  )
}

export default SnippetSlugLoading
