import { ScrollArea } from "@/components/ui/scroll-area"

import { fetchCollections } from "@/actions/fetch-collections"

import { cn } from "@dropcode/tailwind/utils"

import { CollectionCard } from "./_components/collection-card"
import { CreateNewCollectionDrawer } from "./_components/create-new-collection-drawer"
import { CreateNewCollectionModal } from "./_components/create-new-collection-modal"

const CollectionsPage = async () => {
  const [collections] = await fetchCollections({})

  const collectionsIsEmpty = collections?.length === 0

  return (
    <div className="relative flex size-full flex-col gap-4">
      <span className="text-2xl font-semibold tracking-tight md:hidden">
        Collections
      </span>

      {!collectionsIsEmpty && (
        <CreateNewCollectionModal triggerClassName="hidden min-h-10 w-fit self-end md:inline-flex" />
      )}

      <CreateNewCollectionDrawer
        triggerClassName={cn(
          "fixed md:hidden z-50 bottom-4 right-4",
          collectionsIsEmpty && "hidden"
        )}
      />

      <ScrollArea
        className={cn(
          "flex h-[calc(100%-3rem)] md:h-[calc(100%-5rem)]",
          collectionsIsEmpty && "hidden"
        )}
      >
        <div className="flex flex-wrap justify-center gap-8 overflow-y-auto">
          {collections?.map((collection) => (
            <CollectionCard
              collection={collection}
              key={collection.id}
              snippetCount={collection._count.snippets}
            />
          ))}
        </div>
      </ScrollArea>

      {collectionsIsEmpty && (
        <div className="fixed inset-0 top-2/4 space-y-2 text-center">
          <span className="text-muted-foreground block text-base">
            You don't have any collections yet
          </span>

          <CreateNewCollectionModal triggerClassName="hidden min-h-10 w-fit self-end md:inline-flex" />

          <CreateNewCollectionDrawer
            triggerClassName="md:hidden"
            triggerLabel="New collection"
          />
        </div>
      )}
    </div>
  )
}

export default CollectionsPage
