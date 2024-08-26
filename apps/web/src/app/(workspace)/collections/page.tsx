import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import {
  CardDescription,
  CardHeader,
  CardRoot,
  CardTitle,
} from "@/components/ui/card"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

import { fetchCollections } from "@/actions/fetch-collections"

import { cn } from "@soli/tailwind/utils"

import { Pencil, PlusIcon, Trash } from "lucide-react"

import { DeleteCollectionModal } from "./_components/delete-collection-modal"

const CollectionsPage = async () => {
  const [collections] = await fetchCollections({})

  const collectionsIsEmpty = collections?.length === 0

  return (
    <div className="flex size-full flex-col gap-8">
      <Link
        href="/collections/create"
        className={cn(
          buttonVariants({
            variant: "neutral",
            className: "min-h-10 w-fit self-end",
            size: "sm",
          }),
          collectionsIsEmpty && "hidden"
        )}
      >
        Create collection
        <PlusIcon className="ml-2 size-4" />
      </Link>

      <ScrollArea className="flex flex-1">
        <div className="flex h-full flex-1 flex-wrap justify-center gap-8">
          {collections?.map((collection) => (
            <Dialog key={collection.id}>
              <ContextMenu>
                <ContextMenuTrigger asChild>
                  <Link
                    href={`/collections/${collection.slug}`}
                    className="group w-[21rem] cursor-pointer select-none outline-none"
                  >
                    <CardRoot className="hover:bg-gray-2 group-focus-visible:border-primary-10 transition-colors">
                      <CardHeader className="flex flex-col items-start">
                        <CardTitle>{collection.title}</CardTitle>
                        <CardDescription>
                          Updated on{" "}
                          {new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }).format(collection.createdAt)}
                        </CardDescription>
                      </CardHeader>

                      <CardDescription className="min-h-fit">
                        {collection._count.snippets > 0 ? (
                          <>
                            This collection have {collection._count.snippets}
                            {collection._count.snippets === 1
                              ? " snippet"
                              : " snippets"}
                          </>
                        ) : (
                          <>This collection is empty</>
                        )}
                      </CardDescription>
                    </CardRoot>
                  </Link>
                </ContextMenuTrigger>

                <ContextMenuContent>
                  <ContextMenuItem className="cursor-pointer" disabled>
                    <Pencil className="mr-2 size-4" />
                    Edit
                  </ContextMenuItem>

                  <DialogTrigger asChild>
                    <ContextMenuItem className="text-destructive hover:!text-destructive-11 cursor-pointer">
                      <Trash className="mr-2 size-4" />
                      Delete
                    </ContextMenuItem>
                  </DialogTrigger>
                </ContextMenuContent>
              </ContextMenu>

              <DeleteCollectionModal collectionId={collection.id} />
            </Dialog>
          ))}
        </div>
      </ScrollArea>

      {collectionsIsEmpty && (
        <div className="flex size-full items-center justify-center">
          <div className="space-y-2 text-center">
            <span className="text-muted-foreground block text-base">
              You don't have any collections yet
            </span>
            <Link
              href="/collections/create"
              className={cn(
                buttonVariants({
                  variant: "neutral",
                  className: "min-h-10 w-fit self-end",
                  size: "sm",
                }),
                !collectionsIsEmpty && "hidden"
              )}
            >
              Create now
              <PlusIcon className="ml-2 size-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default CollectionsPage
