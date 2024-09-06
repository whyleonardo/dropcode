"use client"

import { CardSkeleton } from "@/components/ui/card"

import { QueryKeyFactory } from "@/lib/keys"

import { fetchSnippets } from "@/data/fetch-snippets"
import { useServerActionQuery } from "@/hooks/server-action-hooks"

import { SnippetCard } from "./snippet-card"

export const SnippetsList = () => {
  const { data: snippets, isLoading: isLoadingSnippets } = useServerActionQuery(
    fetchSnippets,
    {
      input: {},
      queryKey: QueryKeyFactory.fetchSnippets(),
    }
  )

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
      {snippets?.map((snippet) => (
        <SnippetCard key={snippet.id} snippet={snippet} />
      ))}
    </div>
  )
}
