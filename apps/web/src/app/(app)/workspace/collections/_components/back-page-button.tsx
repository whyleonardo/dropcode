"use client"

import { usePathname, useRouter } from "next/navigation"

import { ArrowLeft } from "lucide-react"

export const BackPageButton = () => {
  const router = useRouter()

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="group flex items-center gap-1"
    >
      <ArrowLeft className="text-gray-10 group-hover size-4 transition-all group-hover:-translate-x-0.5" />
      <h2 className="font-mono text-lg font-medium">Collections</h2>
    </button>
  )
}
