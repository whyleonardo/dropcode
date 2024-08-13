import { Icons } from "@/components/icons"

import { env } from "@soli/env/web"

export const ScreenSizeIndicator = () => {
  if (env.NODE_ENV === "production") return null

  return (
    <div className="bg-foreground text-background fixed bottom-2 left-2 z-50 flex items-center justify-center gap-2 rounded-full p-3 font-mono text-xs font-bold transition">
      <div className="block sm:hidden">xs</div>
      <div className="hidden sm:block md:hidden">sm</div>
      <div className="hidden md:block lg:hidden">md</div>
      <div className="hidden lg:block xl:hidden">lg</div>
      <div className="hidden xl:block 2xl:hidden">xl</div>
      <div className="hidden 2xl:block">2xl</div>

      <Icons.tailwind className="fill-background size-4" />
    </div>
  )
}
