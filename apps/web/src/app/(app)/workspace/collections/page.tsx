import Link from "next/link"

import {
  CardDescription,
  CardHeader,
  CardRoot,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

import { sleep } from "@/utils/sleep"

import { auth } from "@soli/auth"
import { db } from "@soli/db"
import { cn } from "@soli/tailwind/utils"

const CollectionsPage = async () => {
  await sleep(1432)

  const userSession = await auth()

  const userId = userSession?.user?.id

  const collections = await db.collection.findMany({
    where: {
      userId,
    },
    include: {
      _count: true,
      snippets: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  if (collections.length === 0)
    return (
      <div className="flex size-full h-full flex-1 flex-wrap items-center justify-center gap-4">
        <p className="text-lg">No snippets created on this collection yet</p>
      </div>
    )

  return (
    <ScrollArea className="h-full">
      <div
        className={cn(
          "flex w-full flex-1 flex-wrap justify-start gap-4",
          collections.length > 3 && "justify-center"
        )}
      >
        {collections.map((collection) => (
          <Link
            key={collection.id}
            href={`/workspace/collections/${collection.slug}`}
            className="group w-full max-w-[332px] cursor-pointer outline-none"
          >
            <CardRoot className="hover:bg-gray-2 group-focus-visible:border-primary-10 transition-colors">
              <CardHeader className="flex flex-col items-start">
                <CardTitle>{collection.title}</CardTitle>
                <CardDescription>
                  Updated on{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }).format(collection.createdAt)}
                </CardDescription>
              </CardHeader>

              <CardDescription className="min-h-fit">
                {collection._count.snippets > 0 ? (
                  <>
                    This collection have {collection._count.snippets}
                    {collection._count.snippets === 1
                      ? " snippet"
                      : " snippets"}
                  </>
                ) : (
                  <>This collection is empty</>
                )}
              </CardDescription>
            </CardRoot>
          </Link>
        ))}
      </div>
    </ScrollArea>
  )
}

export default CollectionsPage
