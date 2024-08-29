"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { buttonVariants } from "@/components/ui/button"

import { ArrowLeft } from "lucide-react"

const SnippetSlugNotFoundPage = () => {
  const pathname = usePathname()

  const collectionSlug = pathname.split("/").at(2)

  return (
    <div className="flex h-full flex-col items-center justify-center gap-1">
      <span className="text-muted-foreground text-lg">
        This snippet does not exist
      </span>

      <Link
        href={`/collections/${collectionSlug}`}
        className={buttonVariants({
          variant: "link",
          className: "text-foreground",
        })}
      >
        <ArrowLeft className="mr-2 size-4" />
        Back to snippets
      </Link>
    </div>
  )
}

export default SnippetSlugNotFoundPage
