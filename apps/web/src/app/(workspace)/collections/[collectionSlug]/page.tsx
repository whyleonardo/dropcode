import { QueryKeyFactory } from "@/lib/keys"
import { prefetchQuery } from "@/lib/tanstack-query/server-actions-prefetch"

import { fetchCollectionBySlug } from "@/actions/fetch-collection-by-slug"

import { HydrationBoundary, dehydrate } from "@tanstack/react-query"

import { CreateNewSnippetDrawer } from "./_components/create-new-snippet-drawer"
import { CreateNewSnippetModal } from "./_components/create-new-snippet-modal"
import { NoSnippetsAction } from "./_components/no-snippets-action"
import { SnippetsList } from "./_components/snippets-list"

interface CollectionSlugPageProps {
  params: {
    collectionSlug: string
  }
}

const CollectionSlugPage = async ({
  params: { collectionSlug },
}: CollectionSlugPageProps) => {
  const queryClient = await prefetchQuery(fetchCollectionBySlug, {
    input: {
      collectionSlug,
    },
    queryKey: QueryKeyFactory.fetchCollectionBySlug({ collectionSlug }),
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
          collectionSlug={collectionSlug}
          willHidden
        />

        <SnippetsList collectionSlug={collectionSlug} />
        <NoSnippetsAction collectionSlug={collectionSlug} />
      </HydrationBoundary>
    </div>
  )
}

export default CollectionSlugPage
