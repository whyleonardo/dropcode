"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useRef } from "react"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { TabsTrigger } from "@/components/ui/tabs"

import { langs } from "@/config/langs"

import { deleteFileById } from "@/actions/delete-file-by-id"
import { useServerActionMutation } from "@/hooks/server-action-hooks"

import type { File } from "@soli/db/types"

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
        <ContextMenuItem className="cursor-pointer">
          <Pencil className="mr-2 size-4" />
          Edit
        </ContextMenuItem>

        <ContextMenuItem
          className="text-destructive hover:!text-destructive-11 cursor-pointer"
          disabled={isDeletingFile}
          onClick={async () =>
            executeFileDelete({
              fileId: file.id,
              snippetId: file.snippetId,
            })
          }
        >
          {isDeletingFile ? (
            <Loader2 className="mr-2 size-4 animate-spin" />
          ) : (
            <Trash className="mr-2 size-4" />
          )}
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
