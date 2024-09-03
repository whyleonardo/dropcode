"use client"

import { useState } from "react"

import { CreateNewFileForm } from "@/components/forms/create-new-file-form"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

import { fetchFilesBySnippetSlug } from "@/actions/fetch-files-by-snippet-slug"
import { useServerActionQuery } from "@/hooks/server-action-hooks"

import { FilePlus, Plus } from "lucide-react"

import { FileItem } from "./file-item"

interface SidebarContentProps {
  snippetSlug: string
  collectionSlug: string
}

export const SidebarContent = ({
  collectionSlug,
  snippetSlug,
}: SidebarContentProps) => {
  const [open, setOpen] = useState(false)

  const {
    data: files,
    isLoading: isLoadingFiles,
    isFetching: isFetchingFiles,
  } = useServerActionQuery(fetchFilesBySnippetSlug, {
    queryKey: ["files-by-snippet-slug", snippetSlug],
    input: {
      snippetSlug,
    },
  })

  if (isLoadingFiles || isFetchingFiles) {
    return (
      <div className="bg-gray-2 size-full w-72 space-y-3 p-4">
        <span className="text-muted-foreground w-full truncate font-mono text-lg font-medium tracking-tight">
          Files
        </span>
        <Separator />

        <FileItem.Skeleton />
        <FileItem.Skeleton />
        <FileItem.Skeleton />
        <FileItem.Skeleton />
      </div>
    )
  }

  return (
    <div className="h-full w-72 select-none">
      <Dialog open={open} onOpenChange={setOpen}>
        <ContextMenu>
          <ContextMenuTrigger className="size-full" asChild>
            <div className="bg-gray-2 flex size-full flex-col gap-3 p-4">
              <div className="flex w-full items-center justify-between">
                <span className="text-muted-foreground w-full truncate font-mono text-lg font-medium tracking-tight">
                  Files
                </span>

                <DialogTrigger>
                  <Plus className="size-5" />
                </DialogTrigger>
              </div>

              <Separator />

              {files?.map((file) => (
                <FileItem
                  key={file.id}
                  file={file}
                  snippetSlug={snippetSlug}
                  collectionSlug={collectionSlug}
                />
              ))}
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuLabel>Menu</ContextMenuLabel>

            <DialogTrigger asChild>
              <ContextMenuItem className="cursor-pointer">
                <FilePlus className="mr-2 size-4" />
                New file
              </ContextMenuItem>
            </DialogTrigger>
          </ContextMenuContent>
        </ContextMenu>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new file</DialogTitle>
          </DialogHeader>

          <CreateNewFileForm onOpenChange={setOpen} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
