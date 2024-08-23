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
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { langs } from "@/config/langs"

import { sleep } from "@/utils/sleep"

import { auth } from "@soli/auth"
import { db } from "@soli/db"
import { cn } from "@soli/tailwind/utils"

import { PlusIcon } from "lucide-react"

import { CreateSnippetFormModal } from "./_components/create-snippet-form-modal"

interface CollectionSlugPageProps {
  params: {
    collectionSlug: string
  }
}

const CollectionSlugPage = async ({
  params: { collectionSlug },
}: CollectionSlugPageProps) => {
  await sleep(1432)

  const userSession = await auth()

  const userId = userSession?.user?.id

  const snippets = await db.snippet.findMany({
    where: {
      userId,
      collection: {
        slug: collectionSlug,
      },
    },
    include: {
      tags: true,
      files: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  const snippetsIsEmpty = snippets?.length === 0

  return (
    <div className="flex size-full flex-col gap-8">
      <Dialog>
        <DialogTrigger
          className={cn(
            buttonVariants({
              variant: "neutral",
              className: "min-h-10 w-fit self-end",
              size: "sm",
            }),
            snippetsIsEmpty && "hidden"
          )}
        >
          Create snippet
          <PlusIcon className="ml-2 size-4" />
        </DialogTrigger>

        <ScrollArea className="flex flex-1">
          <div className="flex h-full flex-1 flex-wrap justify-center gap-8">
            {snippets.map((snippet) => (
              <Link
                key={snippet.id}
                href={`/snippet/${snippet.slug}`}
                className="group w-full max-w-[332px] cursor-pointer select-none outline-none"
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

                  <CardDescription>{snippet.description}</CardDescription>

                  <CardFooter>
                    {snippet.tags.map((tag) => (
                      <Tag key={tag.id}>{tag.slug}</Tag>
                    ))}
                  </CardFooter>
                </CardRoot>
              </Link>
            ))}
          </div>
        </ScrollArea>

        {snippetsIsEmpty && (
          <div className="flex size-full items-center justify-center">
            <div className="space-y-2 text-center">
              <span className="text-muted-foreground block text-base">
                You don't have any snippets yet
              </span>
              <DialogTrigger
                className={cn(
                  buttonVariants({
                    variant: "neutral",
                    className: "min-h-10 w-fit self-end",
                    size: "sm",
                  }),
                  !snippetsIsEmpty && "hidden"
                )}
              >
                Create now
                <PlusIcon className="ml-2 size-4" />
              </DialogTrigger>
            </div>
          </div>
        )}

        <CreateSnippetFormModal />
      </Dialog>
    </div>
  )
}

export default CollectionSlugPage
