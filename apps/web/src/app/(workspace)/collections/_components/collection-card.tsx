import Link from "next/link"

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

import type { Collection } from "@dropcode/db/types"

import { Pencil, Trash } from "lucide-react"

import { DeleteCollectionModal } from "./delete-collection-modal"

interface CollectionCardProps {
  collection: Collection
  snippetCount: number
}

export const CollectionCard = ({
  collection,
  snippetCount,
}: CollectionCardProps) => {
  return (
    <Dialog key={collection.id}>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <Link
            href={`/collections/${collection.slug}`}
            className="group w-full max-w-96 cursor-pointer select-none outline-none md:max-w-80"
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
                {snippetCount > 0 ? (
                  <>
                    This collection have {snippetCount}
                    {snippetCount === 1 ? " snippet" : " snippets"}
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
  )
}
