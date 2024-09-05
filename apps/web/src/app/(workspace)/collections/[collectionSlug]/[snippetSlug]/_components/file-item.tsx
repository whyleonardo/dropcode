"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import { DropFileTrigger } from "@/components/drop"
import { UpdateFileForm } from "@/components/forms/update-file-form"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import { langs } from "@/config/langs"

import type { File as FileDBType } from "@dropcode/db/types"

import { Pencil, Trash } from "lucide-react"

import { DeleteFileModal } from "./delete-file-modal"

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
  const [openDeleteFileModal, setOpenDeleteFileModal] = useState(false)
  const [openEditFileSheet, setOpenEditFileSheet] = useState(false)

  const Icon = langs[file.language].icon
  const pathname = usePathname()

  return (
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
        <ContextMenuItem
          onSelect={() => setOpenEditFileSheet((state) => !state)}
          className="cursor-pointer"
        >
          <Pencil className="mr-2 size-4" />
          Edit
        </ContextMenuItem>

        <ContextMenuItem
          onSelect={() => setOpenDeleteFileModal((state) => !state)}
          className="text-destructive hover:!text-destructive-11 cursor-pointer"
        >
          <Trash className="mr-2 size-4" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>

      <DeleteFileModal
        open={openDeleteFileModal}
        onOpenChange={setOpenDeleteFileModal}
        snippetSlug={snippetSlug}
        fileId={file.id}
      />

      <Sheet open={openEditFileSheet} onOpenChange={setOpenEditFileSheet}>
        <SheetContent>
          <SheetHeader className="mb-8 mt-1 flex items-center justify-between">
            <SheetTitle>Edit your file</SheetTitle>
          </SheetHeader>

          <UpdateFileForm
            initialData={file}
            onOpenChange={setOpenEditFileSheet}
            snippetSlug={snippetSlug}
          />
        </SheetContent>
      </Sheet>
    </ContextMenu>
  )
}

FileItem.Skeleton = () => {
  return <div className="bg-gray-3 h-10 w-full animate-pulse rounded-lg" />
}
