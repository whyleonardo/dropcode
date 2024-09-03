"use client"

import Link from "next/link"
import { useState } from "react"

import { UpdateSnippetForm } from "@/components/forms/update-snippet-form"
import { Tag } from "@/components/tag"
import {
  CardDescription,
  CardFooter,
  CardHeader,
  CardIcons,
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { langs } from "@/config/langs"

import type { SnippetWithFilesAndTags } from "@/@types/prisma"

import { cn } from "@dropcode/tailwind/utils"

import { MoreHorizontal, Pencil, Trash } from "lucide-react"

import { DeleteSnippetModal } from "./delete-snippet-modal"

interface SnippetCardProps {
  snippet: SnippetWithFilesAndTags
  collectionSlug: string
}

const MAX_ICONS_TO_SHOW = 2
const MAX_TAGS_TO_SHOW = 2

export const SnippetCard = ({ snippet, collectionSlug }: SnippetCardProps) => {
  const [openDeleteSnippetModal, setOpenDeleteSnippetModal] = useState(false)

  const [openEditSnippetSheet, setOpenEditSnippetSheet] = useState(false)

  const [openEditSnippetDrawer, setOpenEditSnippetDrawer] = useState(false)

  const onlyNotDuplicatedFilesIcons = snippet.files.filter(
    (file, index, array) =>
      array.findIndex((file2) => file2.language === file.language) === index
  )

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Link
          key={snippet.id}
          href={`${collectionSlug}/${snippet.slug}`}
          className="group w-full max-w-96 cursor-pointer select-none outline-none md:max-w-[332px]"
        >
          <CardRoot className="group-focus-visible:border-primary-10 min-h-40">
            <CardHeader>
              <CardTitle>{snippet.title}</CardTitle>

              <CardIcons>
                {onlyNotDuplicatedFilesIcons.map((file, index) => {
                  const Icon = langs[file.language].icon

                  return (
                    <TooltipProvider key={file.id}>
                      <Tooltip delayDuration={30}>
                        <TooltipTrigger
                          className={cn(index > MAX_ICONS_TO_SHOW && "hidden")}
                        >
                          <Icon className="size-4" />
                        </TooltipTrigger>

                        <TooltipContent>
                          <span className="normal-case">
                            {langs[file.language].name}
                          </span>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )
                })}

                {MAX_ICONS_TO_SHOW < onlyNotDuplicatedFilesIcons.length - 1 && (
                  <TooltipProvider>
                    <Tooltip delayDuration={30}>
                      <TooltipTrigger>
                        <MoreHorizontal className="size-4" />
                      </TooltipTrigger>

                      <TooltipContent>
                        <span className="normal-case">
                          {onlyNotDuplicatedFilesIcons.length -
                            MAX_ICONS_TO_SHOW -
                            1}{" "}
                          more language(s)
                        </span>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </CardIcons>
            </CardHeader>

            <CardDescription className="text-start">
              {snippet.description}
            </CardDescription>

            <CardFooter>
              {snippet.tags.map((tag, index) => (
                <Tag
                  className={cn(index > MAX_TAGS_TO_SHOW && "hidden")}
                  key={tag.id}
                >
                  {tag.slug}
                </Tag>
              ))}

              {MAX_TAGS_TO_SHOW < snippet.tags.length - 1 && (
                <TooltipProvider>
                  <Tooltip delayDuration={30}>
                    <TooltipTrigger className="ml-auto">
                      <MoreHorizontal className="size-4" />
                    </TooltipTrigger>

                    <TooltipContent>
                      <span className="normal-case">
                        more {snippet.tags.length - MAX_TAGS_TO_SHOW - 1} tag(s)
                      </span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </CardFooter>
          </CardRoot>
        </Link>
      </ContextMenuTrigger>

      <ContextMenuContent>
        <ContextMenuItem
          onSelect={() => setOpenEditSnippetSheet((state) => !state)}
          className="hidden cursor-pointer md:flex"
        >
          <Pencil className="mr-2 size-4" />
          Edit
        </ContextMenuItem>

        <ContextMenuItem
          onSelect={() => setOpenEditSnippetDrawer((state) => !state)}
          className="cursor-pointer md:hidden"
        >
          <Pencil className="mr-2 size-4" />
          Edit
        </ContextMenuItem>

        <ContextMenuItem
          onSelect={() => setOpenDeleteSnippetModal((state) => !state)}
          className="text-destructive hover:!text-destructive-11 cursor-pointer"
        >
          <Trash className="mr-2 size-4" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>

      <Dialog
        open={openDeleteSnippetModal}
        onOpenChange={setOpenDeleteSnippetModal}
      >
        <DeleteSnippetModal
          collectionSlug={collectionSlug}
          snippetId={snippet.id}
        />
      </Dialog>

      <Sheet open={openEditSnippetSheet} onOpenChange={setOpenEditSnippetSheet}>
        <SheetContent>
          <SheetHeader className="mb-8 mt-1 flex items-center justify-between">
            <SheetTitle>Edit your snippet</SheetTitle>
          </SheetHeader>

          <UpdateSnippetForm
            initialData={snippet}
            collectionSlug={collectionSlug}
            onOpenChange={setOpenEditSnippetSheet}
          />
        </SheetContent>
      </Sheet>

      <Drawer
        open={openEditSnippetDrawer}
        onOpenChange={setOpenEditSnippetDrawer}
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Edit your snippet</DrawerTitle>
          </DrawerHeader>

          <DrawerFooter>
            <UpdateSnippetForm
              initialData={snippet}
              collectionSlug={collectionSlug}
              onOpenChange={setOpenEditSnippetDrawer}
            />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </ContextMenu>
  )
}
