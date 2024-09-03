"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { useContextMenuBannerTipStore as store } from "@/hooks/use-context-menu-banner-tip-store"
import { useStore } from "@/hooks/use-store"

import { X } from "lucide-react"

export const ContextMenuBanner = () => {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)

  const useContextMenuBannerTipStore = useStore(store, (state) => state)

  const dismissBanner = () => {
    useContextMenuBannerTipStore?.setHasSeenBanner(true)
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  if (!pathname.includes("/collections")) return null

  if (useContextMenuBannerTipStore?.hasSeenBanner) return null

  return (
    <div className="text-blue-10 bg-blue-3 fixed inset-x-1/2 bottom-8 z-50 flex w-96 -translate-x-1/2 items-center justify-between rounded-lg p-4 shadow-lg">
      <p className="max-w-xs text-sm">
        <strong>Tip:</strong> Right-click or long-press in various areas to
        access context menus for quick actions.
      </p>

      <button
        type="button"
        onClick={dismissBanner}
        className="hover:text-blue-11 ml-4 rounded-full p-1 transition-colors"
        aria-label="Dismiss banner"
      >
        <X className="size-5" />
      </button>
    </div>
  )
}
