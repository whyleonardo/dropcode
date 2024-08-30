import { notFound } from "next/navigation"

import { fetchCollectionsBySlug } from "@/actions/fetch-collection-by-slug"

import { cn } from "@dropcode/tailwind/utils"

import { CreateNewSnippetDrawer } from "./_components/create-new-snippet-drawer"
import { CreateNewSnippetModal } from "./_components/create-new-snippet-modal"
import { SnippetCard } from "./_components/snippet-card"

interface CollectionSlugPageProps {
  params: {
    collectionSlug: string
  }
}

const CollectionSlugPage = async ({
  params: { collectionSlug },
}: CollectionSlugPageProps) => {
  const [collection] = await fetchCollectionsBySlug({
    collectionSlug,
  })

  if (!collection) {
    notFound()
  }

  const noSnippets = collection.snippets.length === 0

  return (
    <div className="flex size-full flex-col gap-4">
      <span className="text-2xl font-semibold tracking-tight md:hidden">
        Snippets
      </span>

      {!noSnippets && (
        <CreateNewSnippetModal triggerClassName="hidden min-h-10 w-fit self-end md:inline-flex" />
      )}

      <CreateNewSnippetDrawer
        triggerClassName={cn(
          "fixed md:hidden z-50 bottom-4 right-4",
          noSnippets && "hidden"
        )}
      />

      <div className="flex flex-wrap justify-center gap-8 overflow-y-auto">
        {collection.snippets?.map((snippet) => (
          <SnippetCard
            key={snippet.id}
            collectionSlug={collectionSlug}
            snippet={snippet}
          />
        ))}
      </div>

      <div
        className={cn(
          "fixed inset-x-2/4 top-2/4 size-fit -translate-x-1/2 space-y-2 text-center",
          !noSnippets && "hidden"
        )}
      >
        <span className="text-muted-foreground block min-w-max text-base">
          You don't have any snippets yet
        </span>

        <CreateNewSnippetModal triggerClassName="hidden min-h-10 w-fit self-end md:inline-flex" />

        <CreateNewSnippetDrawer
          triggerClassName="md:hidden"
          triggerLabel="Create now"
        />
      </div>
    </div>
  )
}

export default CollectionSlugPage
