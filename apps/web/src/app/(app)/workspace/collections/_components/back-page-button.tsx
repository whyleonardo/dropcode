"use client"

import { usePathname, useRouter } from "next/navigation"

import { ArrowLeft, Folder } from "lucide-react"

export const BackPageButton = () => {
  const router = useRouter()
  const pathname = usePathname()

  const isSnippetPathname = pathname.split("/").at(3)

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="group flex items-center gap-2"
    >
      <ArrowLeft className="text-gray-10 size-5 transition-all group-hover:-translate-x-0.5" />
      <span className="font-mono text-lg font-medium">
        {isSnippetPathname ?? "Collections"}
      </span>
    </button>
  )
}
