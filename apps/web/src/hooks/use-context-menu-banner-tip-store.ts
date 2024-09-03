import { create } from "zustand"
import { persist } from "zustand/middleware"

interface ContextMenuBannerTipState {
  hasSeenBanner: boolean
  setHasSeenBanner: (seen: boolean) => void
}

export const useContextMenuBannerTipStore = create<ContextMenuBannerTipState>()(
  persist(
    (set) => ({
      hasSeenBanner: false,
      setHasSeenBanner: (seen) => set({ hasSeenBanner: seen }),
    }),
    {
      name: "context-menu-banner-tip-storage",
    }
  )
)
