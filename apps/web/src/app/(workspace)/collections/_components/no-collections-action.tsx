"use client"

import { QueryKeyFactory } from "@/lib/keys"

import { fetchCollections } from "@/actions/fetch-collections"
import { useServerActionQuery } from "@/hooks/server-action-hooks"

import { CreateNewCollectionDrawer } from "./create-new-collection-drawer"
import { CreateNewCollectionModal } from "./create-new-collection-modal"

export const NoCollectionsAction = () => {
  const { data: collections } = useServerActionQuery(fetchCollections, {
    input: {},
    queryKey: QueryKeyFactory.fetchCollections(),
  })

  const noCollections = collections?.length === 0

  if (!noCollections) return null

  return (
    <div className="fixed inset-x-2/4 top-2/4 size-fit -translate-x-1/2 space-y-2 text-center">
      <span className="text-muted-foreground block min-w-max text-base">
        You don't have any collections yet
      </span>

      <CreateNewCollectionModal triggerClassName="hidden min-h-10 w-fit self-end md:inline-flex" />

      <CreateNewCollectionDrawer
        triggerClassName="md:hidden"
        triggerLabel="Create now"
      />
    </div>
  )
}
