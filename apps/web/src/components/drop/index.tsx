import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"

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
    <ResizablePanelGroup
      direction="horizontal"
      className={cn("size-full rounded-xl border", className)}
    >
      {children}
    </ResizablePanelGroup>
  )
}

const DropSidebar = ({ children, className }: DropSidebarProps) => {
  return (
    <ResizablePanel defaultSize={20} maxSize={20} className={cn(className)}>
      {children}
    </ResizablePanel>
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
        "dark:hover:bg-gray-3 hover:bg-gray-3 inline-flex h-10 w-full items-center gap-3 space-x-2 overflow-hidden truncate rounded-lg p-2 font-mono text-sm transition-colors duration-200",
        active && "dark:bg-gray-1 bg-gray-4",
        className
      )}
    >
      {children}
    </Comp>
  )
}

const DropContent = ({ children, className }: DropContentProps) => {
  return (
    <ResizablePanel defaultSize={80} maxSize={100} className={cn(className)}>
      {children}
    </ResizablePanel>
  )
}

export { Drop, DropContent, DropSidebar, DropFileTrigger }
