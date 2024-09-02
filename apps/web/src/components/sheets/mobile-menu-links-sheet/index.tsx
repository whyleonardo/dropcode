"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { sidebarMenuLinks } from "@/config/sidebar-menu-links"

import { cn } from "@dropcode/tailwind/utils"

import { Menu } from "lucide-react"

import { SignOutButton } from "./sign-out-button"

interface MobileMenuLinksSheetProps {
  triggerClassName?: string
}

export const MobileMenuLinksSheet = ({
  triggerClassName,
}: MobileMenuLinksSheetProps) => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className={cn(
          "fixed left-4 top-6 z-[9999] md:hidden",
          triggerClassName
        )}
        asChild
      >
        <Button size="icon" variant="neutral" className="rounded-full">
          <Menu className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="h-screen w-full overflow-hidden">
        <SheetHeader className="flex items-center justify-between">
          <SheetTitle className="sr-only">Dropcode Sheet Menu</SheetTitle>

          <ThemeToggle />
        </SheetHeader>

        <div className="mt-8 w-full">
          <div className="bg-muted size-14 rounded-full" />

          <span className="mt-5 block text-lg font-medium leading-3">
            Christian Leonardo
          </span>
          <span className="text-muted-foreground text-sm">
            whyleonardo.dev@gmail.com
          </span>
        </div>

        <Separator className="my-8 w-full" />

        <div className="flex h-[calc(100vh-21.5rem)] w-full flex-col gap-4">
          {sidebarMenuLinks.map((link) => {
            const Icon = link.icon

            const activeLink =
              (pathname.includes(link.href) && link.href !== "/") ||
              link.href === pathname

            return (
              <button
                key={`${link.label}-${link.href}`}
                type="button"
                onClick={() => setOpen(false)}
              >
                <Link
                  href={link.href}
                  aria-disabled={link.isDisabled}
                  className="flex w-full items-center justify-start gap-2 p-2 text-lg font-medium"
                >
                  <Icon className="size-5" />

                  {link.label}

                  <div
                    className={cn(
                      activeLink &&
                        "bg-primary ml-2 size-1.5 animate-pulse rounded-full"
                    )}
                  />
                </Link>
              </button>
            )
          })}
        </div>
        <SignOutButton />
      </SheetContent>
    </Sheet>
  )
}
