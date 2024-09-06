"use client"

import { cn } from "@dropcode/tailwind/utils"
import { Slot } from "@radix-ui/react-slot"

interface DropProps {
  children: React.ReactNode
  className?: string
}

interface DropHeaderProps {
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
        "from-gray-1 to-gray-2 ring-border flex size-full flex-col gap-4 overflow-hidden rounded-xl bg-gradient-to-tl p-6 shadow-sm ring-1 ring-inset dark:shadow-lg",
        className
      )}
    >
      {children}
    </div>
  )
}

const DropHeader = ({ children, className }: DropHeaderProps) => {
  return (
    <header className={cn("flex h-10 w-full items-center border", className)}>
      {children}
    </header>
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

const DropWrapper = ({ children, className }: DropContentProps) => {
  return <div className={cn("flex size-full gap-8", className)}>{children}</div>
}

const DropContent = ({ children, className }: DropContentProps) => {
  return (
    <div
      className={cn(
        "bg-gray-2 ring-gray-3 size-full overflow-y-auto overflow-x-hidden rounded-xl p-4 pb-0 shadow-sm ring-1 ring-inset dark:shadow-lg",
        className
      )}
    >
      {children}
    </div>
  )
}

export {
  Drop,
  DropHeader,
  DropContent,
  DropSidebar,
  DropFileTrigger,
  DropWrapper,
}
