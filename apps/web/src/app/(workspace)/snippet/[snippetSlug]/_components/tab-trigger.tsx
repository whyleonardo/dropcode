"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useRef } from "react"

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
import { TabsTrigger } from "@/components/ui/tabs"

import { langs } from "@/config/langs"

import { deleteFileById } from "@/actions/delete-file-by-id"
import { useServerActionMutation } from "@/hooks/server-action-hooks"

import type { File } from "@dropcode/db/types"

import { Loader2, Pencil, Trash } from "lucide-react"

export const TabTrigger = ({ file }: { file: File }) => {
  const Icon = langs[file.language].icon
  const triggerRef = useRef<HTMLButtonElement>(null)
  const searchParams = useSearchParams()

  const { mutateAsync: executeFileDelete, isPending: isDeletingFile } =
    useServerActionMutation(deleteFileById, {
      onSuccess: ({ fileIdToRedirect }) => {
        if (fileIdToRedirect) {
          router.push(`${pathname}?tabFileId=${fileIdToRedirect}`)
        } else {
          const params = new URLSearchParams(searchParams.toString())

          params.delete("tabFileId")
          router.push(`${pathname}?${params.toString()}`)
        }
      },
    })

  const router = useRouter()
  const pathname = usePathname()

  return (
    <Dialog>
      <ContextMenu>
        <ContextMenuTrigger>
          <TabsTrigger
            key={file.id}
            value={file.id}
            ref={triggerRef}
            className="space-x-2 font-mono"
            onClick={() => router.push(`${pathname}?tabFileId=${file.id}`)}
          >
            <Icon className="size-3.5" />
            <span>
              {file.name}.{langs[file.language].extension}
            </span>
          </TabsTrigger>
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
            onClick={async () =>
              executeFileDelete({
                fileId: file.id,
                snippetId: file.snippetId,
              })
            }
          >
            {isDeletingFile && <Loader2 className="mr-2 size-4 animate-spin" />}
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
