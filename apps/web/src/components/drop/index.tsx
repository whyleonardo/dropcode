"use client"

import { cn } from "@dropcode/tailwind/utils"
import { Slot } from "@radix-ui/react-slot"

interface DropProps {
  children: React.ReactNode
  className?: string
}

interface DropContentProps {
  children: React.ReactNode
  className?: string
}

interface DropSidebarProps {
  children: React.ReactNode
  className?: string
}

interface DropFileTriggerProps {
  children: React.ReactNode
  className?: string
  asChild?: boolean
  active?: boolean
}

const Drop = ({ children, className }: DropProps) => {
  return (
    <div
      className={cn(
        "flex size-full overflow-hidden rounded-xl border",
        className
      )}
    >
      {children}
    </div>
  )
}

const DropSidebar = ({ children, className }: DropSidebarProps) => {
  return (
    <div className={cn("scrollbar-thin scrollbar hidden md:block", className)}>
      {children}
    </div>
  )
}

const DropFileTrigger = ({
  children,
  className,
  asChild,
  active,
}: DropFileTriggerProps) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(
        "hover:bg-gray-4 inline-flex h-10 w-full items-center gap-3 space-x-2 overflow-hidden truncate rounded-lg p-2 font-mono text-sm transition-colors duration-200 dark:hover:opacity-75",
        active && "dark:bg-gray-3 bg-gray-5",
        className
      )}
    >
      {children}
    </Comp>
  )
}

const DropContent = ({ children, className }: DropContentProps) => {
  return (
    <div className={cn(className, "w-full overflow-y-auto overflow-x-hidden")}>
      {children}
    </div>
  )
}

export { Drop, DropContent, DropSidebar, DropFileTrigger }
