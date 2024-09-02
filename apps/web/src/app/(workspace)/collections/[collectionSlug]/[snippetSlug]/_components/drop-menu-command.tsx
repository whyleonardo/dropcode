"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

import { langs } from "@/config/langs"

import { fetchFilesBySnippetSlug } from "@/actions/fetch-files-by-snippet-slug"
import {
  QueryKeyFactory,
  useServerActionQuery,
} from "@/hooks/server-action-hooks"

import { cn } from "@dropcode/tailwind/utils"

import { Clipboard, CommandIcon, Plus } from "lucide-react"
import { toast } from "sonner"

interface DropMenuCommandProps {
  snippetSlug: string
  collectionSlug: string
}

export const DropMenuCommand = ({
  snippetSlug,
  collectionSlug,
}: DropMenuCommandProps) => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const fileSlug = pathname.split("/").at(4)

  const { data: files } = useServerActionQuery(fetchFilesBySnippetSlug, {
    queryKey: QueryKeyFactory.fetchFilesBySnippetSlug({
      snippetSlug,
    }),
    input: {
      snippetSlug,
    },
  })

  const onCopyToClipboard = async (fileSlug: string) => {
    const code = files?.find((file) => file.slug === fileSlug)?.content

    if (!code) {
      toast.error("Error on copy the code to clipboard")

      return null
    }

    await navigator.clipboard.writeText(code)
    toast.info("Copied to clipboard!")
  }

  return (
    <>
      <Button
        size="icon"
        variant="neutral"
        className="rounded-full"
        onClick={() => setOpen((state) => !state)}
      >
        <CommandIcon className="size-4" />
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Commands">
            {fileSlug && (
              <CommandItem
                onSelect={() => {
                  onCopyToClipboard(fileSlug)
                }}
              >
                <Clipboard className="mr-2 !size-3.5" />
                Copy Content
              </CommandItem>
            )}

            <CommandItem>
              <Plus className="mr-2 !size-3.5" />
              New File
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Files">
            {files?.map((file) => {
              const Icon = langs[file.language].icon

              return (
                <CommandItem
                  onSelect={() => setOpen(false)}
                  key={file.id}
                  asChild
                >
                  <span className="flex items-center gap-2">
                    <Icon className="!size-3.5" />
                    <Link
                      href={`/collections/${collectionSlug}/${snippetSlug}/${file.slug}`}
                      className=""
                    >
                      {file.name}

                      <span
                        className={cn(
                          "text-muted-foreground bg-muted border-gray-5 absolute right-0 right-4 top-1/2 z-50 hidden -translate-y-1/2 rounded-full border px-2 py-0.5 text-xs",
                          fileSlug === file.slug && "block"
                        )}
                      >
                        Actual Viewing
                      </span>
                    </Link>
                  </span>
                </CommandItem>
              )
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
