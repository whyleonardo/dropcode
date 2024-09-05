"use client"

import { CardSkeleton } from "@/components/ui/card"

import { QueryKeyFactory } from "@/lib/keys"

import { fetchCollections } from "@/actions/fetch-collections"
import { useServerActionQuery } from "@/hooks/server-action-hooks"

import { CollectionCard } from "./collection-card"

export const CollectionsList = () => {
  const { data: collections, isLoading: isLoadingCollections } =
    useServerActionQuery(fetchCollections, {
      input: {},
      queryKey: QueryKeyFactory.fetchCollections(),
    })

  if (isLoadingCollections)
    return (
      <div className="flex flex-wrap justify-center gap-8">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    )

  return (
    <div className="flex flex-wrap justify-center gap-8 overflow-y-auto">
      {collections?.map((collection) => (
        <CollectionCard
          collection={collection}
          key={collection.id}
          snippetCount={collection._count.snippets}
        />
      ))}
    </div>
  )
}
