"use client"

import { usePathname, useRouter } from "next/navigation"

import { cn } from "@soli/tailwind/utils"

import { ArrowLeft, Folder } from "lucide-react"

export const BackPageButton = () => {
  const router = useRouter()
  const pathname = usePathname()
  const isWorkspaceHomePage = pathname === "/workspace"

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className={cn(
        "group flex items-center gap-2",
        isWorkspaceHomePage && "pointer-events-none capitalize"
      )}
    >
      <ArrowLeft
        className={cn(
          "text-gray-10 size-5 transition-all group-hover:-translate-x-0.5",
          isWorkspaceHomePage && "hidden"
        )}
      />
      <span className="font-mono text-lg font-medium">
        {pathname.split("/").at(-1)}
      </span>
    </button>
  )
}
