import { Suspense } from "react"

import { CardSkeleton } from "@/components/ui/card"

import { QueryKeyFactory } from "@/lib/keys"
import { prefetchQuery } from "@/lib/tanstack-query/server-actions-prefetch"

import { fetchSnippets } from "@/data/fetch-snippets"

import { HydrationBoundary, dehydrate } from "@tanstack/react-query"

import { CreateNewSnippetDrawer } from "./_components/create-new-snippet-drawer"
import { CreateNewSnippetModal } from "./_components/create-new-snippet-modal"
import { NoSnippetsAction } from "./_components/no-snippets-action"
import { SnippetsList } from "./_components/snippets-list"

const SnippetPage = async () => {
  const queryClient = await prefetchQuery(fetchSnippets, {
    input: {},
    queryKey: QueryKeyFactory.fetchSnippets(),
  })

  return (
    <div className="flex size-full flex-col gap-4">
      <span className="mt-10 text-2xl font-semibold tracking-tight md:mt-0 md:hidden">
        Snippets
      </span>

      <CreateNewSnippetDrawer triggerClassName="fixed md:hidden z-50 bottom-4 right-4" />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <CreateNewSnippetModal
          triggerClassName="hidden min-h-10 w-fit self-end md:inline-flex"
          willHidden
        />

        <NoSnippetsAction />
      </HydrationBoundary>

      <Suspense
        fallback={
          <div className="flex flex-wrap justify-center gap-8">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        }
      >
        <SnippetsList />
      </Suspense>
    </div>
  )
}

export default SnippetPage
