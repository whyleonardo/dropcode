import { notFound } from "next/navigation"

import { buttonVariants } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

import { fetchCollectionsBySlug } from "@/actions/fetch-collection-by-slug"

import { cn } from "@dropcode/tailwind/utils"

import { PlusIcon } from "lucide-react"

import { CreateSnippetFormModal } from "./_components/create-snippet-form-modal"
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
    <div className="flex size-full flex-col gap-8">
      <Dialog>
        <DialogTrigger
          className={cn(
            buttonVariants({
              variant: "neutral",
              className: "min-h-10 w-fit self-end",
              size: "sm",
            }),
            noSnippets && "hidden"
          )}
        >
          Create snippet
          <PlusIcon className="ml-2 size-4" />
        </DialogTrigger>

        <ScrollArea className="flex flex-1">
          <div className="flex h-full flex-1 flex-wrap justify-center gap-8">
            {collection.snippets.map((snippet) => (
              <SnippetCard
                key={snippet.id}
                snippet={snippet}
                collectionSlug={collectionSlug}
              />
            ))}
          </div>
        </ScrollArea>

        {noSnippets && (
          <div className="flex size-full items-center justify-center">
            <div className="space-y-2 text-center">
              <span className="text-muted-foreground block text-base">
                You don't have any snippets yet
              </span>
              <DialogTrigger
                className={cn(
                  buttonVariants({
                    variant: "neutral",
                    className: "min-h-10 w-fit self-end",
                    size: "sm",
                  }),
                  !noSnippets && "hidden"
                )}
              >
                Create now
                <PlusIcon className="ml-2 size-4" />
              </DialogTrigger>
            </div>
          </div>
        )}

        <CreateSnippetFormModal />
      </Dialog>
    </div>
  )
}

export default CollectionSlugPage
