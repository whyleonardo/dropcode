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

import { cn } from "@soli/tailwind/utils"

import { MoreHorizontal, Pencil, Trash } from "lucide-react"

import { DeleteSnippetButton } from "./delete-snippet-button"

interface SnippetCardProps {
  snippet: SnippetWithFilesAndTags
  collectionSlug: string
}

const MAX_ICONS_TO_SHOW = 2
const MAX_TAGS_TO_SHOW = 2

export const SnippetCard = ({ snippet, collectionSlug }: SnippetCardProps) => {
  const onlyNotDuplicatedFilesIcons = snippet.files.filter(
    (file, index, array) =>
      array.findIndex((file2) => file2.language === file.language) === index
  )

  return (
    <Dialog>
      <ContextMenu>
        <ContextMenuTrigger className="w-full max-w-[332px]">
          <Link
            key={snippet.id}
            href={`/snippet/${snippet.slug}`}
            className="group cursor-pointer select-none outline-none"
          >
            <CardRoot className="group-focus-visible:border-primary-10 min-h-40">
              <CardHeader>
                <CardTitle>{snippet.title}</CardTitle>

                <CardIcons>
                  {onlyNotDuplicatedFilesIcons.map((file, index) => {
                    const Icon = langs[file.language].icon

                    return (
                      <TooltipProvider key={file.id}>
                        <Tooltip delayDuration={30}>
                          <TooltipTrigger
                            className={cn(
                              index > MAX_ICONS_TO_SHOW && "hidden"
                            )}
                          >
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

                  {MAX_ICONS_TO_SHOW <
                    onlyNotDuplicatedFilesIcons.length - 1 && (
                    <TooltipProvider>
                      <Tooltip delayDuration={30}>
                        <TooltipTrigger>
                          <MoreHorizontal className="size-4" />
                        </TooltipTrigger>

                        <TooltipContent>
                          <span className="normal-case">
                            {onlyNotDuplicatedFilesIcons.length -
                              MAX_ICONS_TO_SHOW -
                              1}{" "}
                            more language(s)
                          </span>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </CardIcons>
              </CardHeader>

              <CardDescription className="text-start">
                {snippet.description}
              </CardDescription>

              <CardFooter>
                {snippet.tags.map((tag, index) => (
                  <Tag
                    className={cn(index > MAX_TAGS_TO_SHOW && "hidden")}
                    key={tag.id}
                  >
                    {tag.slug}
                  </Tag>
                ))}

                {MAX_TAGS_TO_SHOW < snippet.tags.length - 1 && (
                  <TooltipProvider>
                    <Tooltip delayDuration={30}>
                      <TooltipTrigger className="ml-auto">
                        <MoreHorizontal className="size-4" />
                      </TooltipTrigger>

                      <TooltipContent>
                        <span className="normal-case">
                          more {snippet.tags.length - MAX_TAGS_TO_SHOW - 1}{" "}
                          tag(s)
                        </span>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </CardFooter>
            </CardRoot>
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
