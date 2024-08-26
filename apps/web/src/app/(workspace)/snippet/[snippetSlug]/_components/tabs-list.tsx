"use client"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { DialogTrigger } from "@/components/ui/dialog"
import { TabsList as List } from "@/components/ui/tabs"

import type { FileWithSnippetInfo } from "@/@types/prisma"

import { FilePlus2 } from "lucide-react"

import { TabTrigger } from "./tab-trigger"

interface TabsListProps {
  files: FileWithSnippetInfo[]
}

export const TabsList = ({ files }: TabsListProps) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <List className="bg-gray-2 flex h-12 min-h-12 w-full justify-start gap-2 overflow-y-hidden rounded-none border-b p-2 px-4">
          {files.map((file) => (
            <TabTrigger key={file.id} file={file} />
          ))}
        </List>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <DialogTrigger asChild>
          <ContextMenuItem className="cursor-pointer">
            <FilePlus2 className="mr-2 size-4" />
            New file
          </ContextMenuItem>
        </DialogTrigger>
      </ContextMenuContent>
    </ContextMenu>
  )
}
