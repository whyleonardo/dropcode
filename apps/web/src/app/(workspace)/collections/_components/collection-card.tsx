"use client"

import Link from "next/link"
import { useState } from "react"

import { UpdateCollectionForm } from "@/components/forms/update-collection-form"
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
import { Dialog } from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

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
  const [openDeleteCollectionModal, setOpenDeleteCollectionModal] =
    useState(false)

  const [openEditCollectionSheet, setOpenEditCollectionSheet] = useState(false)
  const [openEditCollectionDrawer, setOpenEditCollectionDrawer] =
    useState(false)

  return (
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
        <ContextMenuItem
          onSelect={() => setOpenEditCollectionSheet((state) => !state)}
          className="hidden cursor-pointer md:flex"
        >
          <Pencil className="mr-2 size-4" />
          Edit
        </ContextMenuItem>

        <ContextMenuItem
          onSelect={() => setOpenEditCollectionDrawer((state) => !state)}
          className="cursor-pointer md:hidden"
        >
          <Pencil className="mr-2 size-4" />
          Edit
        </ContextMenuItem>

        <ContextMenuItem
          onSelect={() => setOpenDeleteCollectionModal((state) => !state)}
          className="text-destructive hover:!text-destructive-11 cursor-pointer"
        >
          <Trash className="mr-2 size-4" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>

      <Dialog
        open={openDeleteCollectionModal}
        onOpenChange={setOpenDeleteCollectionModal}
      >
        <DeleteCollectionModal collectionId={collection.id} />
      </Dialog>

      <Sheet
        open={openEditCollectionSheet}
        onOpenChange={setOpenEditCollectionSheet}
      >
        <SheetContent>
          <SheetHeader className="mb-8 mt-1 flex items-center justify-between">
            <SheetTitle>Edit your collection</SheetTitle>
          </SheetHeader>

          <UpdateCollectionForm
            initialData={collection}
            onOpenChange={setOpenEditCollectionSheet}
          />
        </SheetContent>
      </Sheet>

      <Drawer
        open={openEditCollectionDrawer}
        onOpenChange={setOpenEditCollectionDrawer}
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Edit your collection</DrawerTitle>
          </DrawerHeader>

          <DrawerFooter>
            <UpdateCollectionForm
              initialData={collection}
              onOpenChange={setOpenEditCollectionDrawer}
            />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </ContextMenu>
  )
}
