"use client"

import { usePathname, useRouter } from "next/navigation"

import { cn } from "@soli/tailwind/utils"

import { ArrowLeft } from "lucide-react"

export const BackPageButton = () => {
  const router = useRouter()
  const pathname = usePathname()

  const isWorkspaceHomePage = pathname === "/"

  return (
    <button
      type="button"
      onClick={() => router.back()}
      aria-label="Go back page button"
      className={cn(
        "group flex items-center gap-2",
        isWorkspaceHomePage && "pointer-events-none capitalize"
      )}
    >
      <ArrowLeft
        className={cn(
          "text-gray-10 group-hover:text-gray-8 size-6 transition-colors",
          isWorkspaceHomePage && "hidden"
        )}
      />
    </button>
  )
}
