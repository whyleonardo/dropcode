"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { DropFileTrigger } from "@/components/drop"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { langs } from "@/config/langs"

import { deleteFileById } from "@/actions/delete-file-by-id"
import {
  QueryKeyFactory,
  useServerActionMutation,
} from "@/hooks/server-action-hooks"

import type { File as FileDBType } from "@dropcode/db/types"
import { useQueryClient } from "@tanstack/react-query"

import { Loader2, Pencil, Trash } from "lucide-react"

interface FileItemProps {
  file: FileDBType
  snippetSlug: string
  collectionSlug: string
}

export const FileItem = ({
  file,
  snippetSlug,
  collectionSlug,
}: FileItemProps) => {
  const Icon = langs[file.language].icon
  const queryClient = useQueryClient()
  const pathname = usePathname()

  const { mutateAsync: executeFileDelete, isPending: isDeletingFile } =
    useServerActionMutation(deleteFileById, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: QueryKeyFactory.fetchLinesCreatedInPeriod(),
        })

        queryClient.invalidateQueries({
          queryKey: QueryKeyFactory.fetchMostUsedLanguages(),
        })

        queryClient.invalidateQueries({
          queryKey: QueryKeyFactory.fetchFilesBySnippetSlug({ snippetSlug }),
        })
      },
    })

  const onExecute = async () =>
    await executeFileDelete({
      fileId: file.id,
      snippetId: file.snippetId,
    })

  return (
    <Dialog>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <Link
            href={`/collections/${collectionSlug}/${snippetSlug}/${file.slug}`}
          >
            <DropFileTrigger active={pathname.includes(file.slug)}>
              <Icon className="size-4" />
              {file.name}.{langs[file.language].extension}
            </DropFileTrigger>
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

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your file
            and remove it from your snippet.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-2">
          <DialogClose
            type="button"
            className={buttonVariants({
              size: "sm",
              variant: "ghost",
              className: "ml-auto min-w-24 border",
            })}
          >
            Cancel
          </DialogClose>

          <Button
            disabled={isDeletingFile}
            className="min-w-24"
            size="sm"
            variant="destructive"
            onClick={onExecute}
          >
            {isDeletingFile && <Loader2 className="mr-2 size-4 animate-spin" />}
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

FileItem.Skeleton = () => {
  return <div className="bg-gray-3 h-10 w-full rounded-lg" />
}
