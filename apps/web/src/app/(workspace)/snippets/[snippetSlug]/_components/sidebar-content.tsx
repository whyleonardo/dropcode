"use client"

import { useState } from "react"

import { CreateNewFileForm } from "@/components/forms/create-new-file-form"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"

import { QueryKeyFactory } from "@/lib/keys"

import { fetchFilesBySnippetSlug } from "@/data/fetch-files-by-snippet-slug"
import { useServerActionQuery } from "@/hooks/server-action-hooks"

import { FilePlus } from "lucide-react"

import { CreateNewFileSidebarButton } from "./create-new-file-sidebar-button"
import { FileItem } from "./file-item"

interface SidebarContentProps {
  snippetSlug: string
}

export const SidebarContent = ({ snippetSlug }: SidebarContentProps) => {
  const [open, setOpen] = useState(false)

  const { data: files, isLoading: isLoadingFiles } = useServerActionQuery(
    fetchFilesBySnippetSlug,
    {
      queryKey: QueryKeyFactory.fetchFilesBySnippetSlug({ snippetSlug }),
      input: {
        snippetSlug,
      },
    }
  )

  return (
    <div className="h-full w-[16rem] select-none">
      <Dialog open={open} onOpenChange={setOpen}>
        <ContextMenu>
          <ContextMenuTrigger className="size-full" asChild>
            <div className="flex size-full flex-col gap-3">
              <div className="flex w-full items-center justify-between">
                <span className="w-full truncate font-mono text-lg font-medium tracking-tighter">
                  Files
                </span>

                {isLoadingFiles ? (
                  <Skeleton className="dark:bg-gray-3 size-6 rounded-lg" />
                ) : (
                  <CreateNewFileSidebarButton />
                )}
              </div>

              {files?.map((file) => (
                <FileItem key={file.id} file={file} snippetSlug={snippetSlug} />
              ))}

              {isLoadingFiles && (
                <>
                  <FileItem.Skeleton />
                  <FileItem.Skeleton />
                  <FileItem.Skeleton />
                  <FileItem.Skeleton />
                </>
              )}
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
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

          <CreateNewFileForm onOpenChange={setOpen} snippetSlug={snippetSlug} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
