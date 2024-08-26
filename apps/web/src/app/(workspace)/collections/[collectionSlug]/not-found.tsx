import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"

import { ArrowLeft } from "lucide-react"

const CollectionSlugNotFoundPage = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-1">
      <span className="text-muted-foreground text-lg">
        This collection does not exist
      </span>

      <Link
        href="/collections"
        className={buttonVariants({
          variant: "link",
          className: "text-foreground",
        })}
      >
        <ArrowLeft className="mr-2 size-4" />
        Back to collections
      </Link>
    </div>
  )
}

export default CollectionSlugNotFoundPage
