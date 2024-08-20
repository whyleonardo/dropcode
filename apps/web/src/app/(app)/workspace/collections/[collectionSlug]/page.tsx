import Link from "next/link"

import { Tag } from "@/components/tag"
import {
  CardDescription,
  CardFooter,
  CardHeader,
  CardIcons,
  CardRoot,
  CardTitle,
} from "@/components/ui/card"
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

  if (snippets.length === 0)
    return (
      <div className="flex h-full flex-col gap-4">
        <div className="flex size-full h-auto flex-1 flex-wrap items-center justify-center gap-4 px-4">
          <p className="text-lg">No snippets created on this collection yet</p>
        </div>
      </div>
    )

  return (
    <div className="flex h-full flex-col gap-4">
      <ScrollArea>
        <div className="flex size-full h-auto flex-1 flex-wrap justify-start gap-4 px-4">
          {snippets.map((snippet) => (
            <Link
              key={snippet.id}
              href={`/workspace/snippet/${snippet.slug}`}
              className="group w-full max-w-[332px] cursor-pointer outline-none"
            >
              <CardRoot className="group-focus-visible:border-primary-10">
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
                                {file.language}
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
    </div>
  )
}

export default CollectionSlugPage
