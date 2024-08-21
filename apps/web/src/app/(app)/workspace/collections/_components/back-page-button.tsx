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
      className="group flex items-center gap-1.5"
    >
      <ArrowLeft className="text-gray-10 group-hover size-4 transition-all group-hover:-translate-x-0.5" />
      <h2 className="font-mono text-lg font-medium">
        {isSnippetPathname ?? "Collections"}
      </h2>
    </button>
  )
}
