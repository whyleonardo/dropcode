"use client"

import { useSearchParams } from "next/navigation"

import { buttonVariants } from "@/components/ui/button"
import { DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Tabs } from "@/components/ui/tabs"

import type { FileWithSnippetInfo } from "@/@types/prisma"

import { PlusIcon } from "lucide-react"

import { TabsList } from "./tabs-list"

interface TabsRootProps {
  files: FileWithSnippetInfo[]
  children: React.ReactNode
}

export const TabsRoot = ({ files, children }: TabsRootProps) => {
  const searchParams = useSearchParams()

  const tabFileId = searchParams.get("tabFileId") as string

  const noFiles = files?.length === 0
  const defaultFile = tabFileId ?? (noFiles ? null : files[0].id)

  return (
    <Tabs
      defaultValue={defaultFile}
      value={tabFileId}
      className="bg-gray-1 group relative flex h-full w-full select-none flex-col overflow-hidden rounded-lg border"
    >
      <ScrollArea className="h-12 min-h-12 w-full">
        <TabsList files={files} />

        <ScrollBar orientation="horizontal" className="h-1.5" />
      </ScrollArea>

      {children}

      {noFiles && (
        <div className="flex h-2/4 w-full items-end justify-center">
          <div className="space-y-2 text-center">
            <span className="text-muted-foreground block text-base">
              You don't have any files yet
            </span>
            <DialogTrigger
              className={buttonVariants({
                variant: "neutral",
                className: "min-h-8 w-fit self-end",
                size: "sm",
              })}
            >
              Create now
              <PlusIcon className="ml-2 size-4" />
            </DialogTrigger>
          </div>
        </div>
      )}
    </Tabs>
  )
}
