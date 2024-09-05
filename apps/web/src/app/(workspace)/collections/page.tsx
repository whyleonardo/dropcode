import { QueryKeyFactory } from "@/lib/keys"
import { prefetchQuery } from "@/lib/tanstack-query/server-actions-prefetch"

import { fetchCollections } from "@/actions/fetch-collections"

import { HydrationBoundary, dehydrate } from "@tanstack/react-query"

import { CollectionsList } from "./_components/collections-list"
import { CreateNewCollectionDrawer } from "./_components/create-new-collection-drawer"
import { CreateNewCollectionModal } from "./_components/create-new-collection-modal"
import { NoCollectionsAction } from "./_components/no-collections-action"

const CollectionsPage = async () => {
  const queryClient = await prefetchQuery(fetchCollections, {
    input: {},
    queryKey: QueryKeyFactory.fetchCollections(),
  })

  return (
    <div className="relative flex size-full flex-col gap-4">
      <span className="mt-10 text-2xl font-semibold tracking-tight md:mt-0 md:hidden">
        Collections
      </span>

      <CreateNewCollectionDrawer triggerClassName="fixed md:hidden z-50 bottom-4 right-4" />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <CreateNewCollectionModal
          triggerClassName="hidden min-h-10 w-fit self-end md:inline-flex"
          willHidden
        />

        <CollectionsList />

        <NoCollectionsAction />
      </HydrationBoundary>
    </div>
  )
}

export default CollectionsPage
