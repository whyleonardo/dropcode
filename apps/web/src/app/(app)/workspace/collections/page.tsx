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

  return (
    <div className="flex h-full flex-col gap-4">
      <ScrollArea className="h-full">
        <div
          className={cn(
            "flex w-full flex-1 flex-wrap justify-start gap-4 overflow-visible px-4",
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
                  This collection has {collection._count.snippets} snippets
                </CardDescription>
              </CardRoot>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

export default CollectionsPage
