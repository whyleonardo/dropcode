import Link from "next/link"

import { Tag } from "@/components/tag"
import { buttonVariants } from "@/components/ui/button"
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { langs } from "@/config/langs"

import type { SnippetWithFilesAndTags } from "@/@types/prisma"

import { Trash } from "lucide-react"

import { DeleteSnippetButton } from "./delete-snippet-button"

interface SnippetCardProps {
  snippet: SnippetWithFilesAndTags
  collectionSlug: string
}

export const SnippetCard = ({ snippet, collectionSlug }: SnippetCardProps) => {
  return (
    <Dialog>
      <DialogTrigger className="w-full max-w-[332px]">
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <Link
              key={snippet.id}
              href={`/snippet/${snippet.slug}`}
              className="group cursor-pointer select-none outline-none"
            >
              <CardRoot className="group-focus-visible:border-primary-10 min-h-40">
                <CardHeader>
                  <CardTitle>{snippet.title}</CardTitle>

                  <CardIcons>
                    {snippet.files.map((file) => {
                      const Icon = langs[file.language].icon

                      return (
                        <TooltipProvider key={file.id}>
                          <Tooltip delayDuration={30}>
                            <TooltipTrigger>
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
                  </CardIcons>
                </CardHeader>

                <CardDescription className="text-start">
                  {snippet.description}
                </CardDescription>

                <CardFooter>
                  {snippet.tags.map((tag) => (
                    <Tag key={tag.id}>{tag.slug}</Tag>
                  ))}
                </CardFooter>
              </CardRoot>
            </Link>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem className="text-destructive hover:!text-destructive-11 cursor-pointer">
              <Trash className="mr-2 size-4" />
              Delete
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            snippet and remove it from your collection.
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

          <DeleteSnippetButton
            snippetId={snippet.id}
            collectionSlug={collectionSlug}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
