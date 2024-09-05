"use client"

import { notFound } from "next/navigation"

import { CardSkeleton } from "@/components/ui/card"

import { QueryKeyFactory } from "@/lib/keys"

import { fetchCollectionBySlug } from "@/actions/fetch-collection-by-slug"
import { useServerActionQuery } from "@/hooks/server-action-hooks"

import { SnippetCard } from "./snippet-card"

interface SnippetsListProps {
  collectionSlug: string
}

export const SnippetsList = ({ collectionSlug }: SnippetsListProps) => {
  const { data: collection, isLoading: isLoadingSnippets } =
    useServerActionQuery(fetchCollectionBySlug, {
      input: {
        collectionSlug: collectionSlug,
      },
      queryKey: QueryKeyFactory.fetchCollectionBySlug({
        collectionSlug: collectionSlug,
      }),
    })

  if (!collection) {
    notFound()
  }

  if (isLoadingSnippets)
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
      {collection?.snippets?.map((snippet) => (
        <SnippetCard
          key={snippet.id}
          collectionSlug={collectionSlug}
          snippet={snippet}
        />
      ))}
    </div>
  )
}
